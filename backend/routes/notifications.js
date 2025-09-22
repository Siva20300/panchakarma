const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getNotification,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  sendBulkNotification
} = require('../controllers/notifications');
const { protect, authorize } = require('../middleware/auth');
const {
  validateNotificationCreation,
  validateObjectId,
  validatePagination
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// User notification routes
router.get('/', validatePagination, getNotifications);
router.get('/unread-count', getUnreadCount);
router.put('/mark-all-read', markAllAsRead);

// Admin routes
router.post('/', authorize('admin', 'doctor'), validateNotificationCreation, createNotification);
router.post('/bulk', authorize('admin'), sendBulkNotification);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getNotification);
router.put('/:id/read', validateObjectId('id'), markAsRead);
router.delete('/:id', validateObjectId('id'), deleteNotification);

module.exports = router;
