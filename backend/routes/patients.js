const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/patients');
const { protect, authorize } = require('../middleware/auth');
const {
  validatePatientCreation,
  validateObjectId,
  validatePagination,
  validateDateRange
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Routes accessible by admin, doctors, and therapists
router.get('/', authorize('admin', 'doctor', 'therapist'), validatePagination, getPatients);
router.get('/search', authorize('admin', 'doctor', 'therapist'), searchPatients);
router.get('/stats', authorize('admin', 'doctor'), getPatientStats);
router.post('/', authorize('admin', 'doctor'), validatePatientCreation, createPatient);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getPatient);
router.put('/:id', authorize('admin', 'doctor'), validateObjectId('id'), updatePatient);
router.delete('/:id', authorize('admin'), validateObjectId('id'), deletePatient);

// Assignment routes
router.put('/:id/assign-doctor', authorize('admin', 'doctor'), validateObjectId('id'), assignDoctor);
router.put('/:id/assign-therapist', authorize('admin', 'doctor'), validateObjectId('id'), assignTherapist);

// Medical history and progress
router.put('/:id/medical-history', authorize('admin', 'doctor'), validateObjectId('id'), updateMedicalHistory);
router.post('/:id/progress', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), addProgressMetric);
router.get('/:id/progress', validateObjectId('id'), validateDateRange, getPatientProgress);

module.exports = router;
