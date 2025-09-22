const User = require('../models/User');
const Patient = require('../models/Patient');
const Booking = require('../models/Booking');
const Feedback = require('../models/Feedback');
const { asyncHandler, createNotFoundError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all therapists
// @route   GET /api/therapists
// @access  Private
const getTherapists = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    specialization,
    isActive,
    search,
    sort = 'name'
  } = req.query;

  // Build query
  const query = { role: 'therapist' };
  
  if (specialization) query.specialization = { $regex: specialization, $options: 'i' };
  if (isActive !== undefined) query.isActive = isActive === 'true';
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { specialization: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const therapists = await User.find(query)
    .select('-password')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: therapists.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: therapists
  });
});

// @desc    Get single therapist
// @route   GET /api/therapists/:id
// @access  Private
const getTherapist = asyncHandler(async (req, res) => {
  const therapist = await User.findById(req.params.id).select('-password');

  if (!therapist || therapist.role !== 'therapist') {
    throw createNotFoundError('Therapist not found');
  }

  // Get therapist's patient count
  const patientCount = await Patient.countDocuments({ assignedTherapist: therapist._id });

  // Get average rating
  const ratingData = await Feedback.getTherapistAverageRating(therapist._id);

  res.status(200).json({
    success: true,
    data: {
      ...therapist.toObject(),
      patientCount,
      averageRating: ratingData.average,
      totalFeedbacks: ratingData.count
    }
  });
});

// @desc    Get therapist schedule
// @route   GET /api/therapists/:id/schedule
// @access  Private
const getTherapistSchedule = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const therapist = await User.findById(req.params.id);
  if (!therapist || therapist.role !== 'therapist') {
    throw createNotFoundError('Therapist not found');
  }

  // Build date range query
  const dateQuery = {};
  if (startDate || endDate) {
    dateQuery.appointmentDate = {};
    if (startDate) dateQuery.appointmentDate.$gte = new Date(startDate);
    if (endDate) dateQuery.appointmentDate.$lte = new Date(endDate);
  } else {
    // Default to next 7 days
    dateQuery.appointmentDate = {
      $gte: new Date(),
      $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
  }

  const bookings = await Booking.find({
    therapist: req.params.id,
    ...dateQuery,
    status: { $in: ['confirmed', 'in-progress'] }
  })
  .populate('patient')
  .populate({
    path: 'patient',
    populate: {
      path: 'user',
      select: 'name phone'
    }
  })
  .sort({ appointmentDate: 1, appointmentTime: 1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Update therapist schedule
// @route   PUT /api/therapists/:id/schedule
// @access  Private (Admin, Therapist)
const updateSchedule = asyncHandler(async (req, res) => {
  const therapist = await User.findById(req.params.id);
  if (!therapist || therapist.role !== 'therapist') {
    throw createNotFoundError('Therapist not found');
  }

  // Check permissions
  if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
    throw createForbiddenError('Not authorized to update this schedule');
  }

  // In a real application, you would update the therapist's availability schedule
  // For now, we'll just return a success message
  res.status(200).json({
    success: true,
    message: 'Schedule updated successfully'
  });
});

// @desc    Get therapist patients
// @route   GET /api/therapists/:id/patients
// @access  Private (Admin, Doctor, Therapist)
const getTherapistPatients = asyncHandler(async (req, res) => {
  const therapist = await User.findById(req.params.id);
  if (!therapist || therapist.role !== 'therapist') {
    throw createNotFoundError('Therapist not found');
  }

  // Check permissions
  if (req.user.role === 'therapist' && req.user._id.toString() !== req.params.id) {
    throw createForbiddenError('Not authorized to view these patients');
  }

  const patients = await Patient.find({ assignedTherapist: req.params.id })
    .populate('user', 'name email phone age')
    .populate('assignedDoctor', 'name specialization')
    .sort({ registrationDate: -1 });

  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients
  });
});

// @desc    Get therapist feedback
// @route   GET /api/therapists/:id/feedback
// @access  Private (Admin, Doctor, Therapist)
const getTherapistFeedback = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const therapist = await User.findById(req.params.id);
  if (!therapist || therapist.role !== 'therapist') {
    throw createNotFoundError('Therapist not found');
  }

  // Check permissions
  if (req.user.role === 'therapist' && req.user._id.toString() !== req.params.id) {
    throw createForbiddenError('Not authorized to view this feedback');
  }

  const skip = (page - 1) * limit;

  const feedbacks = await Feedback.find({ therapist: req.params.id })
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name'
      }
    })
    .sort({ sessionDate: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Feedback.countDocuments({ therapist: req.params.id });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: feedbacks
  });
});

// @desc    Get therapist statistics
// @route   GET /api/therapists/:id/stats
// @access  Private (Admin, Doctor)
const getTherapistStats = asyncHandler(async (req, res) => {
  const therapist = await User.findById(req.params.id);
  if (!therapist || therapist.role !== 'therapist') {
    throw createNotFoundError('Therapist not found');
  }

  const totalPatients = await Patient.countDocuments({ assignedTherapist: req.params.id });
  const activePatients = await Patient.countDocuments({ 
    assignedTherapist: req.params.id,
    status: 'ongoing'
  });

  const totalBookings = await Booking.countDocuments({ therapist: req.params.id });
  const completedBookings = await Booking.countDocuments({ 
    therapist: req.params.id,
    status: 'completed'
  });

  const thisMonthBookings = await Booking.countDocuments({
    therapist: req.params.id,
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });

  const averageRating = await Feedback.getTherapistAverageRating(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      totalPatients,
      activePatients,
      totalBookings,
      completedBookings,
      thisMonthBookings,
      averageRating: averageRating.average,
      totalFeedbacks: averageRating.count
    }
  });
});

module.exports = {
  getTherapists,
  getTherapist,
  getTherapistSchedule,
  updateSchedule,
  getTherapistPatients,
  getTherapistFeedback,
  getTherapistStats
};
