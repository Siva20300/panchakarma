const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/treatments');
const { protect, authorize } = require('../middleware/auth');
const {
  validateTreatmentCreation,
  validateObjectId,
  validatePagination
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Routes accessible by admin, doctors, and therapists
router.get('/', authorize('admin', 'doctor', 'therapist'), validatePagination, getTreatments);
router.get('/stats', authorize('admin', 'doctor'), getTreatmentStats);
router.post('/', authorize('admin', 'doctor'), validateTreatmentCreation, createTreatment);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getTreatment);
router.put('/:id', authorize('admin', 'doctor'), validateObjectId('id'), updateTreatment);
router.delete('/:id', authorize('admin'), validateObjectId('id'), deleteTreatment);

// Session management
router.post('/:id/sessions', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), addSession);
router.put('/:id/sessions/:sessionId', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), updateSession);
router.put('/:id/sessions/:sessionId/complete', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), completeSession);

// Medication management
router.post('/:id/medications', authorize('admin', 'doctor'), validateObjectId('id'), addMedication);

// Progress tracking
router.post('/:id/progress', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), updateProgress);

module.exports = router;
