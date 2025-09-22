const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/foodDiets');
const { protect, authorize } = require('../middleware/auth');
const {
  validateFoodDietCreation,
  validateObjectId,
  validatePagination,
  validateDateRange
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Routes accessible by admin, doctors
router.get('/', authorize('admin', 'doctor'), validatePagination, getFoodDiets);
router.post('/', authorize('admin', 'doctor'), validateFoodDietCreation, createFoodDiet);

// Patient-specific routes
router.get('/my-diet', getPatientDiet);
router.post('/my-diet/adherence', addAdherenceEntry);
router.get('/my-diet/progress', validateDateRange, getDietProgress);
router.post('/my-diet/query', addPatientQuery);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getFoodDiet);
router.put('/:id', authorize('admin', 'doctor'), validateObjectId('id'), updateFoodDiet);
router.delete('/:id', authorize('admin'), validateObjectId('id'), deleteFoodDiet);

// Query management
router.put('/:id/queries/:queryId/respond', authorize('admin', 'doctor'), validateObjectId('id'), respondToQuery);

module.exports = router;
