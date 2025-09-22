const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const ScheduledTasks = require('../services/scheduledTasks');
const NotificationService = require('../services/notificationService');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get upcoming appointment statistics
// @route   GET /api/admin/appointment-stats
// @access  Private (Admin, Doctor)
router.get('/appointment-stats', protect, authorize('admin', 'doctor'), asyncHandler(async (req, res) => {
  const stats = await ScheduledTasks.getUpcomingAppointmentStats();
  
  res.status(200).json({
    success: true,
    data: stats
  });
}));

// @desc    Send urgent appointment reminders manually
// @route   POST /api/admin/send-urgent-reminders
// @access  Private (Admin, Doctor)
router.post('/send-urgent-reminders', protect, authorize('admin', 'doctor'), asyncHandler(async (req, res) => {
  const count = await ScheduledTasks.sendUrgentReminders();
  
  res.status(200).json({
    success: true,
    message: `Urgent reminders sent for ${count} appointments`,
    data: { remindersSent: count }
  });
}));

// @desc    Test notification system
// @route   POST /api/admin/test-notification
// @access  Private (Admin)
router.post('/test-notification', protect, authorize('admin'), asyncHandler(async (req, res) => {
  const { userId, type, title, message } = req.body;
  
  if (!userId || !type || !title || !message) {
    return res.status(400).json({
      success: false,
      message: 'userId, type, title, and message are required'
    });
  }

  const Notification = require('../models/Notification');
  
  await Notification.createNotification({
    recipient: userId,
    type: type,
    title: title,
    message: message,
    priority: 'medium',
    channels: [{ type: 'in-app' }],
    metadata: {
      isTest: true,
      sentBy: req.user._id
    }
  });
  
  res.status(200).json({
    success: true,
    message: 'Test notification sent successfully'
  });
}));

// @desc    Get notification system health
// @route   GET /api/admin/notification-health
// @access  Private (Admin, Doctor)
router.get('/notification-health', protect, authorize('admin', 'doctor'), asyncHandler(async (req, res) => {
  const Notification = require('../models/Notification');
  
  const totalNotifications = await Notification.countDocuments();
  const unreadNotifications = await Notification.countDocuments({ isRead: false });
  const todayNotifications = await Notification.countDocuments({
    createdAt: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999)
    }
  });
  
  const notificationsByType = await Notification.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalNotifications,
      unreadNotifications,
      todayNotifications,
      notificationsByType,
      systemStatus: 'healthy'
    }
  });
}));

module.exports = router;
