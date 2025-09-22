const Treatment = require('../models/Treatment');
const Patient = require('../models/Patient');
const User = require('../models/User');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all treatments
// @route   GET /api/treatments
// @access  Private (Admin, Doctor, Therapist)
const getTreatments = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    doctor,
    therapist,
    patient,
    treatmentType,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = {};
  
  if (status) query.status = status;
  if (doctor) query.doctor = doctor;
  if (therapist) query.therapist = therapist;
  if (patient) query.patient = patient;
  if (treatmentType) query.treatmentType = treatmentType;

  // For therapists, only show their treatments
  if (req.user.role === 'therapist') {
    query.therapist = req.user._id;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const treatments = await Treatment.find(query)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone'
      }
    })
    .populate('doctor', 'name specialization')
    .populate('therapist', 'name specialization')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Treatment.countDocuments(query);

  res.status(200).json({
    success: true,
    count: treatments.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: treatments
  });
});

// @desc    Get single treatment
// @route   GET /api/treatments/:id
// @access  Private
const getTreatment = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone age'
      }
    })
    .populate('doctor', 'name specialization experience')
    .populate('therapist', 'name specialization experience')
    .populate('dietPlan');

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  // Check access permissions
  if (req.user.role === 'patient') {
    if (!treatment.patient || treatment.patient.user._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this treatment');
    }
  }

  if (req.user.role === 'therapist') {
    if (!treatment.therapist || treatment.therapist._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this treatment');
    }
  }

  res.status(200).json({
    success: true,
    data: treatment
  });
});

// @desc    Create treatment
// @route   POST /api/treatments
// @access  Private (Admin, Doctor)
const createTreatment = asyncHandler(async (req, res) => {
  const {
    patientId,
    therapistId,
    treatmentType,
    therapyTypes,
    description,
    objectives,
    duration,
    startDate,
    expectedEndDate,
    protocols,
    medications,
    specialInstructions,
    contraindications
  } = req.body;

  // Validate patient
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw createBadRequestError('Patient not found');
  }

  // Validate therapist if provided
  let therapist = null;
  if (therapistId) {
    therapist = await User.findById(therapistId);
    if (!therapist || therapist.role !== 'therapist') {
      throw createBadRequestError('Invalid therapist ID');
    }
  }

  const treatmentData = {
    patient: patientId,
    doctor: req.user._id,
    therapist: therapistId,
    treatmentType,
    therapyTypes,
    description,
    objectives,
    duration,
    startDate,
    expectedEndDate,
    protocols,
    medications,
    specialInstructions,
    contraindications,
    cost: {
      totalAmount: req.body.totalAmount || 0,
      currency: req.body.currency || 'INR'
    }
  };

  const treatment = await Treatment.create(treatmentData);

  // Update patient's treatment plan reference
  patient.treatmentPlan = treatment._id;
  patient.status = 'ongoing';
  await patient.save();

  const populatedTreatment = await Treatment.findById(treatment._id)
    .populate('patient')
    .populate('doctor', 'name specialization')
    .populate('therapist', 'name specialization');

  res.status(201).json({
    success: true,
    message: 'Treatment created successfully',
    data: populatedTreatment
  });
});

// @desc    Update treatment
// @route   PUT /api/treatments/:id
// @access  Private (Admin, Doctor)
const updateTreatment = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    treatmentType: req.body.treatmentType,
    therapyTypes: req.body.therapyTypes,
    description: req.body.description,
    objectives: req.body.objectives,
    status: req.body.status,
    therapist: req.body.therapistId,
    expectedEndDate: req.body.expectedEndDate,
    actualEndDate: req.body.actualEndDate,
    protocols: req.body.protocols,
    medications: req.body.medications,
    specialInstructions: req.body.specialInstructions,
    contraindications: req.body.contraindications,
    outcome: req.body.outcome
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const treatment = await Treatment.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    { new: true, runValidators: true }
  ).populate('patient')
   .populate('doctor', 'name specialization')
   .populate('therapist', 'name specialization');

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  res.status(200).json({
    success: true,
    message: 'Treatment updated successfully',
    data: treatment
  });
});

// @desc    Delete treatment
// @route   DELETE /api/treatments/:id
// @access  Private (Admin)
const deleteTreatment = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id);

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  await treatment.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Treatment deleted successfully'
  });
});

// @desc    Add session to treatment
// @route   POST /api/treatments/:id/sessions
// @access  Private (Admin, Doctor, Therapist)
const addSession = asyncHandler(async (req, res) => {
  const {
    scheduledDate,
    therapyType,
    duration,
    preSessionNotes
  } = req.body;

  const treatment = await Treatment.findById(req.params.id);

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  // Check permissions
  if (req.user.role === 'therapist' && 
      (!treatment.therapist || treatment.therapist.toString() !== req.user._id.toString())) {
    throw createForbiddenError('Not authorized to add sessions to this treatment');
  }

  const sessionNumber = treatment.sessions.length + 1;

  const newSession = {
    sessionNumber,
    scheduledDate,
    therapist: treatment.therapist || req.user._id,
    therapyType,
    duration: duration || 60,
    preSessionNotes,
    status: 'scheduled'
  };

  treatment.sessions.push(newSession);
  await treatment.save();

  res.status(201).json({
    success: true,
    message: 'Session added successfully',
    data: newSession
  });
});

// @desc    Update session
// @route   PUT /api/treatments/:id/sessions/:sessionId
// @access  Private (Admin, Doctor, Therapist)
const updateSession = asyncHandler(async (req, res) => {
  const treatment = await Treatment.findById(req.params.id);

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  const session = treatment.sessions.id(req.params.sessionId);
  if (!session) {
    throw createNotFoundError('Session not found');
  }

  // Check permissions
  if (req.user.role === 'therapist' && 
      (!treatment.therapist || treatment.therapist.toString() !== req.user._id.toString())) {
    throw createForbiddenError('Not authorized to update this session');
  }

  // Update session fields
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== undefined) {
      session[key] = req.body[key];
    }
  });

  await treatment.save();

  res.status(200).json({
    success: true,
    message: 'Session updated successfully',
    data: session
  });
});

// @desc    Complete session
// @route   PUT /api/treatments/:id/sessions/:sessionId/complete
// @access  Private (Admin, Doctor, Therapist)
const completeSession = asyncHandler(async (req, res) => {
  const {
    postSessionNotes,
    patientFeedback,
    therapistObservations,
    vitals
  } = req.body;

  const treatment = await Treatment.findById(req.params.id);

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  const session = treatment.sessions.id(req.params.sessionId);
  if (!session) {
    throw createNotFoundError('Session not found');
  }

  // Check permissions
  if (req.user.role === 'therapist' && 
      (!treatment.therapist || treatment.therapist.toString() !== req.user._id.toString())) {
    throw createForbiddenError('Not authorized to complete this session');
  }

  // Update session
  session.status = 'completed';
  session.actualDate = new Date();
  session.completedAt = new Date();
  session.postSessionNotes = postSessionNotes;
  session.patientFeedback = patientFeedback;
  session.therapistObservations = therapistObservations;
  session.vitals = vitals;

  await treatment.save();

  res.status(200).json({
    success: true,
    message: 'Session completed successfully',
    data: session
  });
});

// @desc    Add medication to treatment
// @route   POST /api/treatments/:id/medications
// @access  Private (Admin, Doctor)
const addMedication = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    dosage,
    frequency,
    duration,
    instructions,
    startDate,
    endDate
  } = req.body;

  const treatment = await Treatment.findById(req.params.id);

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  const medication = {
    name,
    type,
    dosage,
    frequency,
    duration,
    instructions,
    startDate,
    endDate,
    prescribedBy: req.user._id
  };

  treatment.medications.push(medication);
  await treatment.save();

  res.status(201).json({
    success: true,
    message: 'Medication added successfully',
    data: medication
  });
});

// @desc    Update treatment progress
// @route   POST /api/treatments/:id/progress
// @access  Private (Admin, Doctor, Therapist)
const updateProgress = asyncHandler(async (req, res) => {
  const {
    overallProgress,
    symptomsImprovement,
    qualityOfLife,
    doctorAssessment,
    nextSteps
  } = req.body;

  const treatment = await Treatment.findById(req.params.id);

  if (!treatment) {
    throw createNotFoundError('Treatment not found');
  }

  const progressMetric = {
    date: new Date(),
    overallProgress,
    symptomsImprovement,
    qualityOfLife,
    doctorAssessment,
    nextSteps
  };

  treatment.progressMetrics.push(progressMetric);
  await treatment.save();

  res.status(201).json({
    success: true,
    message: 'Progress updated successfully',
    data: progressMetric
  });
});

// @desc    Get treatment statistics
// @route   GET /api/treatments/stats
// @access  Private (Admin, Doctor)
const getTreatmentStats = asyncHandler(async (req, res) => {
  const stats = await Treatment.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalTreatments = await Treatment.countDocuments();
  const activeTreatments = await Treatment.countDocuments({ status: 'ongoing' });
  const completedTreatments = await Treatment.countDocuments({ status: 'completed' });

  const thisMonthTreatments = await Treatment.countDocuments({
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });

  res.status(200).json({
    success: true,
    data: {
      totalTreatments,
      activeTreatments,
      completedTreatments,
      thisMonthTreatments,
      statusStats: stats
    }
  });
});

module.exports = {
  getTreatments,
  getTreatment,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  addSession,
  updateSession,
  completeSession,
  addMedication,
  updateProgress,
  getTreatmentStats
};
