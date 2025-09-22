const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    unique: true,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'booking_confirmed',
      'booking_cancelled',
      'booking_rescheduled',
      'appointment_reminder',
      'treatment_assigned',
      'session_completed',
      'diet_plan_updated',
      'medication_reminder',
      'payment_due',
      'payment_received',
      'feedback_request',
      'progress_update',
      'system_announcement',
      'emergency_alert',
      'therapist_message',
      'doctor_message'
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  // Priority level
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  // Read status
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  // Delivery channels
  channels: [{
    type: {
      type: String,
      enum: ['in-app', 'email', 'sms', 'push'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'delivered', 'failed'],
      default: 'pending'
    },
    sentAt: Date,
    deliveredAt: Date,
    errorMessage: String
  }],
  // Related entities
  relatedEntities: {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment'
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    },
    foodDiet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodDiet'
    }
  },
  // Action buttons/links
  actions: [{
    label: String,
    type: {
      type: String,
      enum: ['link', 'button', 'modal']
    },
    url: String,
    action: String, // JavaScript action or API endpoint
    style: {
      type: String,
      enum: ['primary', 'secondary', 'success', 'warning', 'danger'],
      default: 'primary'
    }
  }],
  // Scheduling
  scheduledFor: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  },
  // Metadata
  metadata: {
    deviceInfo: String,
    userAgent: String,
    ipAddress: String,
    location: String
  },
  // Batch information (for bulk notifications)
  batchId: String,
  // Template information
  template: {
    name: String,
    version: String,
    variables: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
// Note: notificationId index is already created by unique: true in schema
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ priority: 1 });
notificationSchema.index({ scheduledFor: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired notifications

// Compound indexes
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, type: 1, isRead: 1 });

// Virtual for time since creation
notificationSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffMs = now - this.createdAt;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return this.createdAt.toLocaleDateString();
});

// Virtual for delivery status
notificationSchema.virtual('deliveryStatus').get(function() {
  if (!this.channels || this.channels.length === 0) return 'not-sent';
  
  const statuses = this.channels.map(channel => channel.status);
  
  if (statuses.every(status => status === 'delivered')) return 'delivered';
  if (statuses.some(status => status === 'delivered')) return 'partially-delivered';
  if (statuses.some(status => status === 'sent')) return 'sent';
  if (statuses.some(status => status === 'failed')) return 'failed';
  
  return 'pending';
});

// Generate unique notification ID
notificationSchema.pre('save', async function(next) {
  if (!this.notificationId) {
    const count = await this.constructor.countDocuments();
    this.notificationId = `NOTIF${String(count + 1).padStart(8, '0')}`;
  }
  next();
});

// Update readAt when isRead is set to true
notificationSchema.pre('save', function(next) {
  if (this.isModified('isRead') && this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  next();
});

// Static method to create notification
notificationSchema.statics.createNotification = async function(data) {
  const notification = new this(data);
  
  // Set default expiry if not provided
  if (!notification.expiresAt) {
    const expiryDays = {
      'urgent': 7,
      'high': 14,
      'medium': 30,
      'low': 60
    };
    
    const days = expiryDays[notification.priority] || 30;
    notification.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
  
  return await notification.save();
};

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Method to check if notification is expired
notificationSchema.methods.isExpired = function() {
  return this.expiresAt && new Date() > this.expiresAt;
};

// Method to update delivery status for a channel
notificationSchema.methods.updateChannelStatus = function(channelType, status, errorMessage = null) {
  const channel = this.channels.find(ch => ch.type === channelType);
  if (channel) {
    channel.status = status;
    if (status === 'sent') {
      channel.sentAt = new Date();
    } else if (status === 'delivered') {
      channel.deliveredAt = new Date();
    } else if (status === 'failed' && errorMessage) {
      channel.errorMessage = errorMessage;
    }
  }
  return this.save();
};

// Static method to get unread count for user
notificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({
    recipient: userId,
    isRead: false,
    scheduledFor: { $lte: new Date() },
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  });
};

// Static method to get notifications for user with pagination
notificationSchema.statics.getNotificationsForUser = async function(userId, options = {}) {
  const {
    page = 1,
    limit = 20,
    type = null,
    isRead = null,
    priority = null
  } = options;

  const query = {
    recipient: userId,
    scheduledFor: { $lte: new Date() },
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  };

  if (type) query.type = type;
  if (isRead !== null) query.isRead = isRead;
  if (priority) query.priority = priority;

  const skip = (page - 1) * limit;

  const notifications = await this.find(query)
    .populate('sender', 'name avatar role')
    .populate('relatedEntities.booking')
    .populate('relatedEntities.treatment')
    .populate('relatedEntities.patient')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await this.countDocuments(query);

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = mongoose.model('Notification', notificationSchema);
