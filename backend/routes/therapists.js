const express = require('express');
const router = express.Router();
const {
  getTherapists,
  getTherapist,
  getTherapistSchedule,
  updateSchedule,
  getTherapistStats,
  getTherapistPatients,
  getTherapistFeedback
} = require('../controllers/therapists');
const { protect, authorize } = require('../middleware/auth');
const {
  validateObjectId,
  validatePagination,
  validateDateRange
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Public routes (accessible by all authenticated users)
router.get('/', validatePagination, getTherapists);
router.get('/:id', validateObjectId('id'), getTherapist);
router.get('/:id/schedule', validateObjectId('id'), validateDateRange, getTherapistSchedule);

// Therapist-specific routes
router.put('/:id/schedule', authorize('admin', 'therapist'), validateObjectId('id'), updateSchedule);
router.get('/:id/patients', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), getTherapistPatients);
router.get('/:id/feedback', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), getTherapistFeedback);

// Admin/Doctor routes
router.get('/:id/stats', authorize('admin', 'doctor'), validateObjectId('id'), getTherapistStats);

module.exports = router;
