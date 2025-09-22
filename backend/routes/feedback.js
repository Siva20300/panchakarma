const express = require('express');
const router = express.Router();
const {
  getFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  submitPatientFeedback,
  submitTherapistFeedback,
  getFeedbackAnalytics,
  getMyFeedbacks
} = require('../controllers/feedback');
const { protect, authorize } = require('../middleware/auth');
const {
  validateFeedbackCreation,
  validateObjectId,
  validatePagination,
  validateDateRange
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// User-specific routes
router.get('/my-feedbacks', getMyFeedbacks);

// Routes accessible by admin, doctors, therapists
router.get('/', authorize('admin', 'doctor', 'therapist'), validatePagination, getFeedbacks);
router.get('/analytics', authorize('admin', 'doctor'), validateDateRange, getFeedbackAnalytics);
router.post('/', validateFeedbackCreation, createFeedback);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getFeedback);
router.put('/:id', authorize('admin', 'doctor'), validateObjectId('id'), updateFeedback);
router.delete('/:id', authorize('admin'), validateObjectId('id'), deleteFeedback);

// Feedback submission routes
router.put('/:id/patient-feedback', validateObjectId('id'), submitPatientFeedback);
router.put('/:id/therapist-feedback', authorize('therapist', 'admin'), validateObjectId('id'), submitTherapistFeedback);

module.exports = router;
