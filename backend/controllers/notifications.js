const Notification = require('../models/Notification');
const User = require('../models/User');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    type,
    isRead,
    priority
  } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    type,
    isRead: isRead !== undefined ? isRead === 'true' : null,
    priority
  };

  const result = await Notification.getNotificationsForUser(req.user._id, options);

  res.status(200).json({
    success: true,
    count: result.notifications.length,
    pagination: result.pagination,
    data: result.notifications
  });
});

// @desc    Get single notification
// @route   GET /api/notifications/:id
// @access  Private
const getNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)
    .populate('sender', 'name avatar role')
    .populate('relatedEntities.booking')
    .populate('relatedEntities.treatment')
    .populate('relatedEntities.patient');

  if (!notification) {
    throw createNotFoundError('Notification not found');
  }

  // Check if user owns this notification
  if (notification.recipient.toString() !== req.user._id.toString()) {
    throw createForbiddenError('Not authorized to access this notification');
  }

  res.status(200).json({
    success: true,
    data: notification
  });
});

// @desc    Create notification
// @route   POST /api/notifications
// @access  Private (Admin, Doctor)
const createNotification = asyncHandler(async (req, res) => {
  const {
    recipientId,
    type,
    title,
    message,
    priority,
    channels,
    relatedEntities,
    actions,
    scheduledFor,
    expiresAt
  } = req.body;

  // Validate recipient
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    throw createBadRequestError('Recipient not found');
  }

  const notificationData = {
    recipient: recipientId,
    sender: req.user._id,
    type,
    title,
    message,
    priority: priority || 'medium',
    channels: channels || [{ type: 'in-app' }],
    relatedEntities,
    actions,
    scheduledFor: scheduledFor || new Date(),
    expiresAt
  };

  const notification = await Notification.createNotification(notificationData);

  res.status(201).json({
    success: true,
    message: 'Notification created successfully',
    data: notification
  });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw createNotFoundError('Notification not found');
  }

  // Check if user owns this notification
  if (notification.recipient.toString() !== req.user._id.toString()) {
    throw createForbiddenError('Not authorized to update this notification');
  }

  await notification.markAsRead();

  res.status(200).json({
    success: true,
    message: 'Notification marked as read',
    data: notification
  });
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/mark-all-read
// @access  Private
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      recipient: req.user._id,
      isRead: false
    },
    {
      isRead: true,
      readAt: new Date()
    }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw createNotFoundError('Notification not found');
  }

  // Check if user owns this notification or is admin
  if (notification.recipient.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw createForbiddenError('Not authorized to delete this notification');
  }

  await notification.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Notification deleted successfully'
  });
});

// @desc    Get unread notification count
// @route   GET /api/notifications/unread-count
// @access  Private
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.getUnreadCount(req.user._id);

  res.status(200).json({
    success: true,
    data: {
      unreadCount: count
    }
  });
});

// @desc    Send bulk notification
// @route   POST /api/notifications/bulk
// @access  Private (Admin)
const sendBulkNotification = asyncHandler(async (req, res) => {
  const {
    recipientIds,
    recipientRole,
    type,
    title,
    message,
    priority,
    channels
  } = req.body;

  let recipients = [];

  if (recipientIds && recipientIds.length > 0) {
    // Send to specific users
    recipients = await User.find({ _id: { $in: recipientIds } });
  } else if (recipientRole) {
    // Send to all users with specific role
    recipients = await User.find({ role: recipientRole, isActive: true });
  } else {
    throw createBadRequestError('Either recipientIds or recipientRole must be provided');
  }

  if (recipients.length === 0) {
    throw createBadRequestError('No valid recipients found');
  }

  // Generate batch ID
  const batchId = `BATCH_${Date.now()}`;

  // Create notifications for all recipients
  const notifications = recipients.map(recipient => ({
    recipient: recipient._id,
    sender: req.user._id,
    type,
    title,
    message,
    priority: priority || 'medium',
    channels: channels || [{ type: 'in-app' }],
    batchId
  }));

  const createdNotifications = await Notification.insertMany(notifications);

  res.status(201).json({
    success: true,
    message: `Bulk notification sent to ${recipients.length} recipients`,
    data: {
      batchId,
      recipientCount: recipients.length,
      notificationIds: createdNotifications.map(n => n._id)
    }
  });
});

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  sendBulkNotification
};
