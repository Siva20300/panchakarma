const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  rescheduleBooking,
  confirmBooking,
  completeBooking,
  checkIn,
  checkOut,
  getAvailableSlots,
  getBookingStats,
  getMyBookings
} = require('../controllers/bookings');
const { protect, authorize } = require('../middleware/auth');
const {
  validateBookingCreation,
  validateObjectId,
  validatePagination,
  validateDateRange
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Public booking routes (for patients)
router.get('/my-bookings', getMyBookings);
router.get('/available-slots', getAvailableSlots);
router.post('/', validateBookingCreation, createBooking);

// Admin and staff routes
router.get('/', authorize('admin', 'doctor', 'therapist'), validatePagination, getBookings);
router.get('/stats', authorize('admin', 'doctor'), getBookingStats);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getBooking);
router.put('/:id', validateObjectId('id'), updateBooking);
router.put('/:id/cancel', validateObjectId('id'), cancelBooking);
router.put('/:id/reschedule', validateObjectId('id'), rescheduleBooking);
router.put('/:id/confirm', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), confirmBooking);
router.put('/:id/complete', authorize('admin', 'doctor', 'therapist'), validateObjectId('id'), completeBooking);
router.post('/:id/check-in', validateObjectId('id'), checkIn);
router.post('/:id/check-out', validateObjectId('id'), checkOut);

module.exports = router;
