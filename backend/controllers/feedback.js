const Feedback = require('../models/Feedback');
const Patient = require('../models/Patient');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all feedbacks
// @route   GET /api/feedback
// @access  Private (Admin, Doctor, Therapist)
const getFeedbacks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    therapist,
    patient,
    status,
    sessionDate,
    sort = '-sessionDate'
  } = req.query;

  // Build query
  const query = {};
  
  if (therapist) query.therapist = therapist;
  if (patient) query.patient = patient;
  if (status) query.status = status;
  
  if (sessionDate) {
    const startDate = new Date(sessionDate);
    const endDate = new Date(sessionDate);
    endDate.setDate(endDate.getDate() + 1);
    query.sessionDate = {
      $gte: startDate,
      $lt: endDate
    };
  }

  // For therapists, only show their feedback
  if (req.user.role === 'therapist') {
    query.therapist = req.user._id;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const feedbacks = await Feedback.find(query)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone'
      }
    })
    .populate('therapist', 'name specialization')
    .populate('booking', 'appointmentDate appointmentTime')
    .populate('treatment', 'treatmentType')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Feedback.countDocuments(query);

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

// @desc    Get single feedback
// @route   GET /api/feedback/:id
// @access  Private
const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone age'
      }
    })
    .populate('therapist', 'name specialization experience')
    .populate('booking')
    .populate('treatment');

  if (!feedback) {
    throw createNotFoundError('Feedback not found');
  }

  // Check access permissions
  if (req.user.role === 'patient') {
    if (!feedback.patient || feedback.patient.user._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this feedback');
    }
  }

  if (req.user.role === 'therapist') {
    if (!feedback.therapist || feedback.therapist._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this feedback');
    }
  }

  res.status(200).json({
    success: true,
    data: feedback
  });
});

// @desc    Create feedback
// @route   POST /api/feedback
// @access  Private
const createFeedback = asyncHandler(async (req, res) => {
  const {
    patientId,
    therapistId,
    bookingId,
    treatmentId,
    sessionDate
  } = req.body;

  // Validate patient
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw createBadRequestError('Patient not found');
  }

  // Validate therapist
  const therapist = await User.findById(therapistId);
  if (!therapist || therapist.role !== 'therapist') {
    throw createBadRequestError('Invalid therapist ID');
  }

  // Validate booking if provided
  if (bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw createBadRequestError('Booking not found');
    }
  }

  const feedbackData = {
    patient: patientId,
    therapist: therapistId,
    booking: bookingId,
    treatment: treatmentId,
    sessionDate: sessionDate || new Date(),
    status: 'pending'
  };

  const feedback = await Feedback.create(feedbackData);

  const populatedFeedback = await Feedback.findById(feedback._id)
    .populate('patient')
    .populate('therapist', 'name specialization')
    .populate('booking');

  res.status(201).json({
    success: true,
    message: 'Feedback record created successfully',
    data: populatedFeedback
  });
});

// @desc    Update feedback
// @route   PUT /api/feedback/:id
// @access  Private (Admin, Doctor)
const updateFeedback = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    status: req.body.status,
    tags: req.body.tags,
    isPublic: req.body.isPublic,
    qualityReview: req.body.qualityReview,
    managementResponse: req.body.managementResponse
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    { new: true, runValidators: true }
  ).populate('patient')
   .populate('therapist', 'name specialization');

  if (!feedback) {
    throw createNotFoundError('Feedback not found');
  }

  res.status(200).json({
    success: true,
    message: 'Feedback updated successfully',
    data: feedback
  });
});

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private (Admin)
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    throw createNotFoundError('Feedback not found');
  }

  await feedback.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Feedback deleted successfully'
  });
});

// @desc    Submit patient feedback
// @route   PUT /api/feedback/:id/patient-feedback
// @access  Private (Patient)
const submitPatientFeedback = asyncHandler(async (req, res) => {
  const {
    overallRating,
    therapistRating,
    facilityRating,
    treatmentEffectiveness,
    comments,
    aspects,
    symptomImprovement,
    wouldRecommend,
    wouldReturn,
    suggestions
  } = req.body;

  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    throw createNotFoundError('Feedback not found');
  }

  // Check if user is the patient for this feedback
  const patient = await Patient.findById(feedback.patient).populate('user');
  if (!patient || patient.user._id.toString() !== req.user._id.toString()) {
    throw createForbiddenError('Not authorized to submit feedback for this session');
  }

  feedback.patientFeedback = {
    overallRating,
    therapistRating,
    facilityRating,
    treatmentEffectiveness,
    comments,
    aspects,
    symptomImprovement,
    wouldRecommend,
    wouldReturn,
    suggestions
  };

  await feedback.save();

  res.status(200).json({
    success: true,
    message: 'Patient feedback submitted successfully',
    data: feedback
  });
});

// @desc    Submit therapist feedback
// @route   PUT /api/feedback/:id/therapist-feedback
// @access  Private (Therapist, Admin)
const submitTherapistFeedback = asyncHandler(async (req, res) => {
  const {
    patientCooperation,
    patientResponse,
    sessionNotes,
    treatmentGiven,
    patientCondition,
    observations,
    recommendations,
    progressAssessment
  } = req.body;

  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    throw createNotFoundError('Feedback not found');
  }

  // Check if user is the therapist for this feedback
  if (req.user.role === 'therapist' && feedback.therapist.toString() !== req.user._id.toString()) {
    throw createForbiddenError('Not authorized to submit feedback for this session');
  }

  feedback.therapistFeedback = {
    patientCooperation,
    patientResponse,
    sessionNotes,
    treatmentGiven,
    patientCondition,
    observations,
    recommendations,
    progressAssessment
  };

  await feedback.save();

  res.status(200).json({
    success: true,
    message: 'Therapist feedback submitted successfully',
    data: feedback
  });
});

// @desc    Get feedback analytics
// @route   GET /api/feedback/analytics
// @access  Private (Admin, Doctor)
const getFeedbackAnalytics = asyncHandler(async (req, res) => {
  const { startDate, endDate, therapist } = req.query;

  const filters = {};
  if (startDate && endDate) {
    filters.startDate = startDate;
    filters.endDate = endDate;
  }
  if (therapist) {
    filters.therapist = therapist;
  }

  const analytics = await Feedback.getFeedbackAnalytics(filters);

  // Get rating distribution
  const ratingDistribution = await Feedback.aggregate([
    {
      $match: {
        'patientFeedback.overallRating': { $exists: true },
        ...(filters.therapist && { therapist: mongoose.Types.ObjectId(filters.therapist) }),
        ...(filters.startDate && filters.endDate && {
          sessionDate: {
            $gte: new Date(filters.startDate),
            $lte: new Date(filters.endDate)
          }
        })
      }
    },
    {
      $group: {
        _id: '$patientFeedback.overallRating',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    success: true,
    data: {
      ...analytics,
      ratingDistribution
    }
  });
});

// @desc    Get my feedbacks (for patients and therapists)
// @route   GET /api/feedback/my-feedbacks
// @access  Private
const getMyFeedbacks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  let query = {};

  if (req.user.role === 'patient') {
    // Get patient record
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      throw createBadRequestError('Patient record not found');
    }
    query.patient = patient._id;
  } else if (req.user.role === 'therapist') {
    query.therapist = req.user._id;
  } else {
    throw createForbiddenError('Not authorized to access feedbacks');
  }

  if (status) query.status = status;

  const skip = (page - 1) * limit;

  const feedbacks = await Feedback.find(query)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name'
      }
    })
    .populate('therapist', 'name specialization')
    .populate('booking', 'appointmentDate appointmentTime')
    .sort({ sessionDate: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Feedback.countDocuments(query);

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

module.exports = {
  getFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  submitPatientFeedback,
  submitTherapistFeedback,
  getFeedbackAnalytics,
  getMyFeedbacks
};
