const Booking = require('../models/Booking');
const Patient = require('../models/Patient');
const User = require('../models/User');
const Notification = require('../models/Notification');
const NotificationService = require('../services/notificationService');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin, Doctor, Therapist)
const getBookings = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    therapist,
    doctor,
    date,
    therapyType,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = {};
  
  if (status) query.status = status;
  if (therapist) query.therapist = therapist;
  if (doctor) query.doctor = doctor;
  if (therapyType) query.therapyType = therapyType;
  
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    query.appointmentDate = {
      $gte: startDate,
      $lt: endDate
    };
  }

  // For therapists, only show their bookings
  if (req.user.role === 'therapist') {
    query.therapist = req.user._id;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const bookings = await Booking.find(query)
    .populate('patient', 'patientId')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone'
      }
    })
    .populate('therapist', 'name specialization')
    .populate('doctor', 'name specialization')
    .populate('treatment', 'treatmentType')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Booking.countDocuments(query);

  res.status(200).json({
    success: true,
    count: bookings.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone age'
      }
    })
    .populate('therapist', 'name specialization experience')
    .populate('doctor', 'name specialization')
    .populate('treatment');

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  // Check access permissions
  if (req.user.role === 'patient') {
    if (!booking.patient || booking.patient.user._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this booking');
    }
  }

  if (req.user.role === 'therapist') {
    if (!booking.therapist || booking.therapist._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this booking');
    }
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const {
    therapyType,
    appointmentDate,
    appointmentTime,
    duration,
    reasonForVisit,
    symptoms,
    urgencyLevel,
    meetingMode,
    preferences,
    therapistId,
    doctorId
  } = req.body;

  // Get patient record
  let patient;
  if (req.user.role === 'patient') {
    patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      throw createBadRequestError('Patient record not found');
    }
  } else {
    // For admin/doctor creating booking for patient
    const { patientId } = req.body;
    patient = await Patient.findById(patientId);
    if (!patient) {
      throw createBadRequestError('Patient not found');
    }
  }

  // Validate therapist if provided
  let therapist = null;
  if (therapistId) {
    therapist = await User.findById(therapistId);
    if (!therapist || therapist.role !== 'therapist') {
      throw createBadRequestError('Invalid therapist ID');
    }
  }

  // Validate doctor if provided
  let doctor = null;
  if (doctorId) {
    doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      throw createBadRequestError('Invalid doctor ID');
    }
  }

  // Check for conflicting appointments
  const appointmentDateTime = new Date(appointmentDate);
  const [hours, minutes] = appointmentTime.split(':');
  appointmentDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  const endTime = new Date(appointmentDateTime.getTime() + (duration || 60) * 60000);

  const conflictingBooking = await Booking.findOne({
    therapist: therapistId,
    appointmentDate: {
      $gte: new Date(appointmentDate).setHours(0, 0, 0, 0),
      $lt: new Date(appointmentDate).setHours(23, 59, 59, 999)
    },
    status: { $in: ['confirmed', 'in-progress'] },
    $or: [
      {
        $and: [
          { appointmentTime: { $lte: appointmentTime } },
          { 
            $expr: {
              $gte: [
                { $add: [
                  { $dateFromParts: {
                    year: { $year: '$appointmentDate' },
                    month: { $month: '$appointmentDate' },
                    day: { $dayOfMonth: '$appointmentDate' },
                    hour: { $toInt: { $substr: ['$appointmentTime', 0, 2] } },
                    minute: { $toInt: { $substr: ['$appointmentTime', 3, 2] } }
                  }},
                  { $multiply: ['$duration', 60000] }
                ]},
                appointmentDateTime
              ]
            }
          }
        ]
      }
    ]
  });

  if (conflictingBooking) {
    throw createBadRequestError('Time slot is not available');
  }

  const bookingData = {
    patient: patient._id,
    therapyType,
    appointmentDate,
    appointmentTime,
    duration: duration || 60,
    reasonForVisit,
    symptoms,
    urgencyLevel: urgencyLevel || 'medium',
    meetingMode: meetingMode || 'offline',
    preferences,
    therapist: therapistId,
    doctor: doctorId || patient.assignedDoctor
  };

  const booking = await Booking.create(bookingData);

  const populatedBooking = await Booking.findById(booking._id)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone age'
      }
    })
    .populate('therapist', 'name specialization')
    .populate('doctor', 'name specialization');

  // Send comprehensive notifications
  try {
    // Send booking confirmation to patient
    await NotificationService.sendBookingConfirmationToPatient(populatedBooking, patient);

    // Send notification to assigned therapist
    if (therapist) {
      await NotificationService.sendNewBookingNotificationToTherapist(populatedBooking, patient, therapist);
    }

    // Send notification to assigned doctor
    if (doctor) {
      await NotificationService.sendNewBookingNotificationToDoctor(populatedBooking, patient, doctor);
    }

    console.log(`📅 Booking created and notifications sent for booking ID: ${booking._id}`);
  } catch (notificationError) {
    console.error('Error sending booking notifications:', notificationError);
    // Don't fail the booking creation if notifications fail
  }

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: populatedBooking
  });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  // Check permissions
  if (req.user.role === 'patient') {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient || booking.patient.toString() !== patient._id.toString()) {
      throw createForbiddenError('Not authorized to update this booking');
    }
  }

  const fieldsToUpdate = {
    reasonForVisit: req.body.reasonForVisit,
    symptoms: req.body.symptoms,
    urgencyLevel: req.body.urgencyLevel,
    preferences: req.body.preferences,
    specialInstructions: req.body.specialInstructions
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    { new: true, runValidators: true }
  ).populate('patient')
   .populate('therapist', 'name specialization')
   .populate('doctor', 'name specialization');

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: updatedBooking
  });
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  // Check if booking can be cancelled
  if (!booking.canBeCancelled()) {
    throw createBadRequestError('Booking cannot be cancelled at this time');
  }

  // Check permissions
  if (req.user.role === 'patient') {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient || booking.patient.toString() !== patient._id.toString()) {
      throw createForbiddenError('Not authorized to cancel this booking');
    }
  }

  booking.status = 'cancelled';
  booking.cancelledBy = req.user._id;
  booking.cancelledAt = new Date();
  booking.cancellationReason = reason;

  await booking.save();

  // Send comprehensive cancellation notifications
  try {
    await NotificationService.sendBookingCancellationNotifications(booking, req.user._id);
    console.log(`❌ Booking cancelled and notifications sent for booking ID: ${booking._id}`);
  } catch (notificationError) {
    console.error('Error sending cancellation notifications:', notificationError);
  }

  res.status(200).json({
    success: true,
    message: 'Booking cancelled successfully',
    data: booking
  });
});

// @desc    Reschedule booking
// @route   PUT /api/bookings/:id/reschedule
// @access  Private
const rescheduleBooking = asyncHandler(async (req, res) => {
  const { newDate, newTime, reason } = req.body;
  
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  // Check if booking can be rescheduled
  if (!booking.canBeRescheduled()) {
    throw createBadRequestError('Booking cannot be rescheduled at this time');
  }

  // Store original values
  booking.originalDate = booking.appointmentDate;
  booking.originalTime = booking.appointmentTime;
  booking.rescheduledBy = req.user._id;
  booking.rescheduledAt = new Date();
  booking.rescheduleReason = reason;

  // Update with new values
  booking.appointmentDate = newDate;
  booking.appointmentTime = newTime;
  booking.status = 'rescheduled';

  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Booking rescheduled successfully',
    data: booking
  });
});

// @desc    Confirm booking
// @route   PUT /api/bookings/:id/confirm
// @access  Private (Admin, Doctor, Therapist)
const confirmBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  booking.status = 'confirmed';
  await booking.save();

  // Create confirmation notification for patient
  const patient = await Patient.findById(booking.patient).populate('user');
  if (patient) {
    await Notification.createNotification({
      recipient: patient.user._id,
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: `Your ${booking.therapyType} appointment has been confirmed for ${booking.appointmentDate} at ${booking.appointmentTime}`,
      relatedEntities: {
        booking: booking._id
      },
      channels: [{ type: 'in-app' }]
    });
  }

  res.status(200).json({
    success: true,
    message: 'Booking confirmed successfully',
    data: booking
  });
});

// @desc    Complete booking
// @route   PUT /api/bookings/:id/complete
// @access  Private (Admin, Doctor, Therapist)
const completeBooking = asyncHandler(async (req, res) => {
  const { sessionNotes } = req.body;
  
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  booking.status = 'completed';
  booking.sessionNotes = sessionNotes;
  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Booking completed successfully',
    data: booking
  });
});

// @desc    Check in for appointment
// @route   POST /api/bookings/:id/check-in
// @access  Private
const checkIn = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  booking.checkIn = {
    time: new Date(),
    method: 'manual'
  };
  booking.status = 'in-progress';

  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Checked in successfully',
    data: booking
  });
});

// @desc    Check out from appointment
// @route   POST /api/bookings/:id/check-out
// @access  Private
const checkOut = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createNotFoundError('Booking not found');
  }

  booking.checkOut = {
    time: new Date(),
    method: 'manual'
  };

  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Checked out successfully',
    data: booking
  });
});

// @desc    Get available time slots
// @route   GET /api/bookings/available-slots
// @access  Private
const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date, therapistId, duration = 60 } = req.query;

  if (!date || !therapistId) {
    throw createBadRequestError('Date and therapist ID are required');
  }

  // Get existing bookings for the date
  const existingBookings = await Booking.find({
    therapist: therapistId,
    appointmentDate: {
      $gte: new Date(date).setHours(0, 0, 0, 0),
      $lt: new Date(date).setHours(23, 59, 59, 999)
    },
    status: { $in: ['confirmed', 'in-progress'] }
  });

  // Generate available slots (9 AM to 6 PM, 1-hour slots)
  const availableSlots = [];
  for (let hour = 9; hour < 18; hour++) {
    const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
    
    // Check if slot is available
    const isAvailable = !existingBookings.some(booking => {
      const bookingStart = booking.appointmentTime;
      const [bookingHour, bookingMinute] = bookingStart.split(':').map(Number);
      const bookingStartMinutes = bookingHour * 60 + bookingMinute;
      const bookingEndMinutes = bookingStartMinutes + booking.duration;
      
      const slotStartMinutes = hour * 60;
      const slotEndMinutes = slotStartMinutes + parseInt(duration);
      
      return (slotStartMinutes < bookingEndMinutes && slotEndMinutes > bookingStartMinutes);
    });

    if (isAvailable) {
      availableSlots.push(timeSlot);
    }
  }

  res.status(200).json({
    success: true,
    data: {
      date,
      therapistId,
      availableSlots
    }
  });
});

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private (Admin, Doctor)
const getBookingStats = asyncHandler(async (req, res) => {
  const stats = await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalBookings = await Booking.countDocuments();
  const todayBookings = await Booking.countDocuments({
    appointmentDate: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999)
    }
  });

  const thisMonthBookings = await Booking.countDocuments({
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });

  res.status(200).json({
    success: true,
    data: {
      totalBookings,
      todayBookings,
      thisMonthBookings,
      statusStats: stats
    }
  });
});

// @desc    Get my bookings (for patients)
// @route   GET /api/bookings/my-bookings
// @access  Private (Patient)
const getMyBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  // Get patient record
  const patient = await Patient.findOne({ user: req.user._id });
  if (!patient) {
    throw createBadRequestError('Patient record not found');
  }

  const query = { patient: patient._id };
  if (status) query.status = status;

  const skip = (page - 1) * limit;

  const bookings = await Booking.find(query)
    .populate('therapist', 'name specialization')
    .populate('doctor', 'name specialization')
    .populate('treatment', 'treatmentType')
    .sort({ appointmentDate: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Booking.countDocuments(query);

  res.status(200).json({
    success: true,
    count: bookings.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: bookings
  });
});

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  rescheduleBooking,
  confirmBooking,
  completeBooking,
  checkIn,
  checkOut,
  getAvailableSlots,
  getBookingStats,
  getMyBookings
};
