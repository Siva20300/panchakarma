const Patient = require('../models/Patient');
const User = require('../models/User');
const Treatment = require('../models/Treatment');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin, Doctor, Therapist)
const getPatients = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    assignedDoctor,
    assignedTherapist,
    search,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = {};
  
  if (status) query.status = status;
  if (assignedDoctor) query.assignedDoctor = assignedDoctor;
  if (assignedTherapist) query.assignedTherapist = assignedTherapist;

  // For therapists, only show their assigned patients
  if (req.user.role === 'therapist') {
    query.assignedTherapist = req.user._id;
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Build aggregation pipeline
  let pipeline = [
    { $match: query },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    { $unwind: '$userDetails' },
    {
      $lookup: {
        from: 'users',
        localField: 'assignedDoctor',
        foreignField: '_id',
        as: 'doctorDetails'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'assignedTherapist',
        foreignField: '_id',
        as: 'therapistDetails'
      }
    }
  ];

  // Add search functionality
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { 'userDetails.name': { $regex: search, $options: 'i' } },
          { 'userDetails.email': { $regex: search, $options: 'i' } },
          { patientId: { $regex: search, $options: 'i' } },
          { primaryProblem: { $regex: search, $options: 'i' } }
        ]
      }
    });
  }

  // Add sorting
  const sortObj = {};
  if (sort.startsWith('-')) {
    sortObj[sort.substring(1)] = -1;
  } else {
    sortObj[sort] = 1;
  }
  pipeline.push({ $sort: sortObj });

  // Add pagination
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: parseInt(limit) });

  // Execute aggregation
  const patients = await Patient.aggregate(pipeline);

  // Get total count
  const totalPipeline = [...pipeline.slice(0, -2)]; // Remove skip and limit
  totalPipeline.push({ $count: 'total' });
  const totalResult = await Patient.aggregate(totalPipeline);
  const total = totalResult.length > 0 ? totalResult[0].total : 0;

  res.status(200).json({
    success: true,
    count: patients.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: patients
  });
});

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
const getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id)
    .populate('user', '-password')
    .populate('assignedDoctor', 'name specialization experience')
    .populate('assignedTherapist', 'name specialization experience')
    .populate('treatmentPlan');

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  // Check access permissions
  if (req.user.role === 'patient' && patient.user._id.toString() !== req.user._id.toString()) {
    throw createForbiddenError('Not authorized to access this patient record');
  }

  if (req.user.role === 'therapist' && 
      (!patient.assignedTherapist || patient.assignedTherapist._id.toString() !== req.user._id.toString())) {
    throw createForbiddenError('Not authorized to access this patient record');
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Create patient
// @route   POST /api/patients
// @access  Private (Admin, Doctor)
const createPatient = asyncHandler(async (req, res) => {
  const { userId, problems, primaryProblem, meetingPreference } = req.body;

  // Check if user exists and is a patient
  const user = await User.findById(userId);
  if (!user || user.role !== 'patient') {
    throw createBadRequestError('Invalid user ID or user is not a patient');
  }

  // Check if patient record already exists
  const existingPatient = await Patient.findOne({ user: userId });
  if (existingPatient) {
    throw createBadRequestError('Patient record already exists for this user');
  }

  const patientData = {
    user: userId,
    problems,
    primaryProblem,
    meetingPreference,
    assignedDoctor: req.user.role === 'doctor' ? req.user._id : undefined
  };

  const patient = await Patient.create(patientData);

  const populatedPatient = await Patient.findById(patient._id)
    .populate('user', '-password')
    .populate('assignedDoctor', 'name specialization');

  res.status(201).json({
    success: true,
    message: 'Patient created successfully',
    data: populatedPatient
  });
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private (Admin, Doctor)
const updatePatient = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    problems: req.body.problems,
    primaryProblem: req.body.primaryProblem,
    meetingPreference: req.body.meetingPreference,
    status: req.body.status,
    nextAppointment: req.body.nextAppointment,
    height: req.body.height,
    weight: req.body.weight,
    bloodPressure: req.body.bloodPressure,
    pulse: req.body.pulse,
    prakriti: req.body.prakriti,
    vikriti: req.body.vikriti,
    lifestyle: req.body.lifestyle,
    dietaryPreferences: req.body.dietaryPreferences,
    foodAllergies: req.body.foodAllergies,
    dietaryRestrictions: req.body.dietaryRestrictions,
    doctorNotes: req.body.doctorNotes,
    therapistNotes: req.body.therapistNotes
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', '-password')
   .populate('assignedDoctor', 'name specialization')
   .populate('assignedTherapist', 'name specialization');

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  res.status(200).json({
    success: true,
    message: 'Patient updated successfully',
    data: patient
  });
});

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private (Admin)
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  await patient.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Patient deleted successfully'
  });
});

// @desc    Assign doctor to patient
// @route   PUT /api/patients/:id/assign-doctor
// @access  Private (Admin, Doctor)
const assignDoctor = asyncHandler(async (req, res) => {
  const { doctorId } = req.body;

  // Validate doctor
  const doctor = await User.findById(doctorId);
  if (!doctor || doctor.role !== 'doctor') {
    throw createBadRequestError('Invalid doctor ID');
  }

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { assignedDoctor: doctorId },
    { new: true }
  ).populate('assignedDoctor', 'name specialization');

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  res.status(200).json({
    success: true,
    message: 'Doctor assigned successfully',
    data: patient
  });
});

// @desc    Assign therapist to patient
// @route   PUT /api/patients/:id/assign-therapist
// @access  Private (Admin, Doctor)
const assignTherapist = asyncHandler(async (req, res) => {
  const { therapistId } = req.body;

  // Validate therapist
  const therapist = await User.findById(therapistId);
  if (!therapist || therapist.role !== 'therapist') {
    throw createBadRequestError('Invalid therapist ID');
  }

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { assignedTherapist: therapistId },
    { new: true }
  ).populate('assignedTherapist', 'name specialization');

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  res.status(200).json({
    success: true,
    message: 'Therapist assigned successfully',
    data: patient
  });
});

// @desc    Update medical history
// @route   PUT /api/patients/:id/medical-history
// @access  Private (Admin, Doctor)
const updateMedicalHistory = asyncHandler(async (req, res) => {
  const { medicalHistory, allergies, currentMedications } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  // Update user's medical information
  await User.findByIdAndUpdate(patient.user, {
    medicalHistory,
    allergies,
    currentMedications
  });

  res.status(200).json({
    success: true,
    message: 'Medical history updated successfully'
  });
});

// @desc    Add progress metric
// @route   POST /api/patients/:id/progress
// @access  Private (Admin, Doctor, Therapist)
const addProgressMetric = asyncHandler(async (req, res) => {
  const { painLevel, energyLevel, sleepQuality, overallWellbeing, notes } = req.body;

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  // Check access permissions
  if (req.user.role === 'therapist' && 
      (!patient.assignedTherapist || patient.assignedTherapist.toString() !== req.user._id.toString())) {
    throw createForbiddenError('Not authorized to add progress for this patient');
  }

  const progressMetric = {
    date: new Date(),
    painLevel,
    energyLevel,
    sleepQuality,
    overallWellbeing,
    notes
  };

  patient.progressMetrics.push(progressMetric);
  await patient.save();

  res.status(201).json({
    success: true,
    message: 'Progress metric added successfully',
    data: progressMetric
  });
});

// @desc    Get patient progress
// @route   GET /api/patients/:id/progress
// @access  Private
const getPatientProgress = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    throw createNotFoundError('Patient not found');
  }

  // Check access permissions
  if (req.user.role === 'patient' && patient.user.toString() !== req.user._id.toString()) {
    throw createForbiddenError('Not authorized to access this patient\'s progress');
  }

  if (req.user.role === 'therapist' && 
      (!patient.assignedTherapist || patient.assignedTherapist.toString() !== req.user._id.toString())) {
    throw createForbiddenError('Not authorized to access this patient\'s progress');
  }

  let progressMetrics = patient.progressMetrics;

  // Filter by date range if provided
  if (startDate || endDate) {
    progressMetrics = progressMetrics.filter(metric => {
      const metricDate = new Date(metric.date);
      if (startDate && metricDate < new Date(startDate)) return false;
      if (endDate && metricDate > new Date(endDate)) return false;
      return true;
    });
  }

  // Sort by date (newest first)
  progressMetrics.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.status(200).json({
    success: true,
    count: progressMetrics.length,
    data: progressMetrics
  });
});

// @desc    Get patient statistics
// @route   GET /api/patients/stats
// @access  Private (Admin, Doctor)
const getPatientStats = asyncHandler(async (req, res) => {
  const stats = await Patient.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalPatients = await Patient.countDocuments();
  const newPatientsThisMonth = await Patient.countDocuments({
    registrationDate: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });

  const assignedPatients = await Patient.countDocuments({
    assignedTherapist: { $exists: true, $ne: null }
  });

  res.status(200).json({
    success: true,
    data: {
      totalPatients,
      newPatientsThisMonth,
      assignedPatients,
      statusStats: stats
    }
  });
});

// @desc    Search patients
// @route   GET /api/patients/search
// @access  Private (Admin, Doctor, Therapist)
const searchPatients = asyncHandler(async (req, res) => {
  const { q, limit = 10 } = req.query;

  if (!q) {
    throw createBadRequestError('Search query is required');
  }

  const query = {
    $or: [
      { patientId: { $regex: q, $options: 'i' } },
      { primaryProblem: { $regex: q, $options: 'i' } },
      { problems: { $in: [new RegExp(q, 'i')] } }
    ]
  };

  // For therapists, only search their assigned patients
  if (req.user.role === 'therapist') {
    query.assignedTherapist = req.user._id;
  }

  const patients = await Patient.find(query)
    .populate('user', 'name email phone')
    .limit(parseInt(limit))
    .sort({ registrationDate: -1 });

  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients
  });
});

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  assignDoctor,
  assignTherapist,
  updateMedicalHistory,
  addProgressMetric,
  getPatientProgress,
  getPatientStats,
  searchPatients
};
