const FoodDiet = require('../models/FoodDiet');
const Patient = require('../models/Patient');
const User = require('../models/User');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all food diets
// @route   GET /api/food-diets
// @access  Private (Admin, Doctor)
const getFoodDiets = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    patient,
    createdBy,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = {};
  
  if (status) query.status = status;
  if (patient) query.patient = patient;
  if (createdBy) query.createdBy = createdBy;

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const foodDiets = await FoodDiet.find(query)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone'
      }
    })
    .populate('createdBy', 'name specialization')
    .populate('treatment', 'treatmentType')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await FoodDiet.countDocuments(query);

  res.status(200).json({
    success: true,
    count: foodDiets.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: foodDiets
  });
});

// @desc    Get single food diet
// @route   GET /api/food-diets/:id
// @access  Private
const getFoodDiet = asyncHandler(async (req, res) => {
  const foodDiet = await FoodDiet.findById(req.params.id)
    .populate('patient')
    .populate({
      path: 'patient',
      populate: {
        path: 'user',
        select: 'name email phone age'
      }
    })
    .populate('createdBy', 'name specialization')
    .populate('treatment');

  if (!foodDiet) {
    throw createNotFoundError('Food diet not found');
  }

  // Check access permissions
  if (req.user.role === 'patient') {
    if (!foodDiet.patient || foodDiet.patient.user._id.toString() !== req.user._id.toString()) {
      throw createForbiddenError('Not authorized to access this diet plan');
    }
  }

  res.status(200).json({
    success: true,
    data: foodDiet
  });
});

// @desc    Create food diet
// @route   POST /api/food-diets
// @access  Private (Admin, Doctor)
const createFoodDiet = asyncHandler(async (req, res) => {
  const {
    patientId,
    treatmentId,
    title,
    description,
    validUntil,
    generalGuidelines,
    restrictions,
    mealPlan,
    weeklyPlan,
    nutritionalTargets,
    ayurvedicPrinciples,
    specialConsiderations,
    supplements
  } = req.body;

  // Validate patient
  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw createBadRequestError('Patient not found');
  }

  const foodDietData = {
    patient: patientId,
    createdBy: req.user._id,
    treatment: treatmentId,
    title,
    description,
    validUntil,
    generalGuidelines,
    restrictions,
    mealPlan,
    weeklyPlan,
    nutritionalTargets,
    ayurvedicPrinciples,
    specialConsiderations,
    supplements
  };

  const foodDiet = await FoodDiet.create(foodDietData);

  const populatedFoodDiet = await FoodDiet.findById(foodDiet._id)
    .populate('patient')
    .populate('createdBy', 'name specialization');

  res.status(201).json({
    success: true,
    message: 'Food diet created successfully',
    data: populatedFoodDiet
  });
});

// @desc    Update food diet
// @route   PUT /api/food-diets/:id
// @access  Private (Admin, Doctor)
const updateFoodDiet = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    validUntil: req.body.validUntil,
    generalGuidelines: req.body.generalGuidelines,
    restrictions: req.body.restrictions,
    mealPlan: req.body.mealPlan,
    weeklyPlan: req.body.weeklyPlan,
    nutritionalTargets: req.body.nutritionalTargets,
    ayurvedicPrinciples: req.body.ayurvedicPrinciples,
    specialConsiderations: req.body.specialConsiderations,
    supplements: req.body.supplements
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  // Add review entry if there are changes
  if (Object.keys(fieldsToUpdate).length > 0) {
    fieldsToUpdate.$push = {
      reviewHistory: {
        reviewedBy: req.user._id,
        reviewDate: new Date(),
        changes: `Updated: ${Object.keys(fieldsToUpdate).join(', ')}`,
        reason: req.body.updateReason || 'Diet plan modification'
      }
    };
  }

  const foodDiet = await FoodDiet.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    { new: true, runValidators: true }
  ).populate('patient')
   .populate('createdBy', 'name specialization');

  if (!foodDiet) {
    throw createNotFoundError('Food diet not found');
  }

  res.status(200).json({
    success: true,
    message: 'Food diet updated successfully',
    data: foodDiet
  });
});

// @desc    Delete food diet
// @route   DELETE /api/food-diets/:id
// @access  Private (Admin)
const deleteFoodDiet = asyncHandler(async (req, res) => {
  const foodDiet = await FoodDiet.findById(req.params.id);

  if (!foodDiet) {
    throw createNotFoundError('Food diet not found');
  }

  await foodDiet.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Food diet deleted successfully'
  });
});

// @desc    Get patient's current diet plan
// @route   GET /api/food-diets/my-diet
// @access  Private (Patient)
const getPatientDiet = asyncHandler(async (req, res) => {
  // Get patient record
  const patient = await Patient.findOne({ user: req.user._id });
  if (!patient) {
    throw createBadRequestError('Patient record not found');
  }

  // Find active diet plan
  const foodDiet = await FoodDiet.findOne({
    patient: patient._id,
    status: 'active',
    validFrom: { $lte: new Date() },
    validUntil: { $gte: new Date() }
  })
  .populate('createdBy', 'name specialization')
  .populate('treatment', 'treatmentType');

  if (!foodDiet) {
    return res.status(200).json({
      success: true,
      message: 'No active diet plan found',
      data: null
    });
  }

  res.status(200).json({
    success: true,
    data: foodDiet
  });
});

// @desc    Add adherence entry
// @route   POST /api/food-diets/my-diet/adherence
// @access  Private (Patient)
const addAdherenceEntry = asyncHandler(async (req, res) => {
  const {
    adherenceScore,
    missedMeals,
    extraFoods,
    patientFeedback,
    symptoms,
    energyLevel,
    digestion,
    notes
  } = req.body;

  // Get patient record
  const patient = await Patient.findOne({ user: req.user._id });
  if (!patient) {
    throw createBadRequestError('Patient record not found');
  }

  // Find active diet plan
  const foodDiet = await FoodDiet.findOne({
    patient: patient._id,
    status: 'active'
  });

  if (!foodDiet) {
    throw createNotFoundError('No active diet plan found');
  }

  const adherenceEntry = {
    date: new Date(),
    adherenceScore,
    missedMeals,
    extraFoods,
    patientFeedback,
    symptoms,
    energyLevel,
    digestion,
    notes
  };

  foodDiet.adherenceTracking.push(adherenceEntry);
  await foodDiet.save();

  res.status(201).json({
    success: true,
    message: 'Adherence entry added successfully',
    data: adherenceEntry
  });
});

// @desc    Get diet progress
// @route   GET /api/food-diets/my-diet/progress
// @access  Private (Patient)
const getDietProgress = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  // Get patient record
  const patient = await Patient.findOne({ user: req.user._id });
  if (!patient) {
    throw createBadRequestError('Patient record not found');
  }

  // Find active diet plan
  const foodDiet = await FoodDiet.findOne({
    patient: patient._id,
    status: 'active'
  });

  if (!foodDiet) {
    throw createNotFoundError('No active diet plan found');
  }

  let adherenceData = foodDiet.adherenceTracking;

  // Filter by date range if provided
  if (startDate || endDate) {
    adherenceData = adherenceData.filter(entry => {
      const entryDate = new Date(entry.date);
      if (startDate && entryDate < new Date(startDate)) return false;
      if (endDate && entryDate > new Date(endDate)) return false;
      return true;
    });
  }

  // Sort by date (newest first)
  adherenceData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate statistics
  const averageAdherence = foodDiet.getAverageAdherence(30);
  const currentAdherenceScore = foodDiet.currentAdherenceScore;

  res.status(200).json({
    success: true,
    count: adherenceData.length,
    data: {
      adherenceEntries: adherenceData,
      statistics: {
        averageAdherence,
        currentAdherenceScore,
        totalEntries: adherenceData.length
      }
    }
  });
});

// @desc    Add patient query
// @route   POST /api/food-diets/my-diet/query
// @access  Private (Patient)
const addPatientQuery = asyncHandler(async (req, res) => {
  const { query } = req.body;

  // Get patient record
  const patient = await Patient.findOne({ user: req.user._id });
  if (!patient) {
    throw createBadRequestError('Patient record not found');
  }

  // Find active diet plan
  const foodDiet = await FoodDiet.findOne({
    patient: patient._id,
    status: 'active'
  });

  if (!foodDiet) {
    throw createNotFoundError('No active diet plan found');
  }

  const patientQuery = {
    date: new Date(),
    query
  };

  foodDiet.patientQueries.push(patientQuery);
  await foodDiet.save();

  res.status(201).json({
    success: true,
    message: 'Query submitted successfully',
    data: patientQuery
  });
});

// @desc    Respond to patient query
// @route   PUT /api/food-diets/:id/queries/:queryId/respond
// @access  Private (Admin, Doctor)
const respondToQuery = asyncHandler(async (req, res) => {
  const { response } = req.body;

  const foodDiet = await FoodDiet.findById(req.params.id);

  if (!foodDiet) {
    throw createNotFoundError('Food diet not found');
  }

  const query = foodDiet.patientQueries.id(req.params.queryId);
  if (!query) {
    throw createNotFoundError('Query not found');
  }

  query.response = response;
  query.respondedBy = req.user._id;
  query.respondedAt = new Date();

  await foodDiet.save();

  res.status(200).json({
    success: true,
    message: 'Response added successfully',
    data: query
  });
});

module.exports = {
  getFoodDiets,
  getFoodDiet,
  createFoodDiet,
  updateFoodDiet,
  deleteFoodDiet,
  getPatientDiet,
  addAdherenceEntry,
  getDietProgress,
  addPatientQuery,
  respondToQuery
};
