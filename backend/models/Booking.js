const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  therapyType: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format']
  },
  duration: {
    type: Number,
    default: 60, // in minutes
    min: 15,
    max: 240
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'],
    default: 'pending'
  },
  bookingType: {
    type: String,
    enum: ['consultation', 'therapy', 'follow-up', 'emergency'],
    default: 'therapy'
  },
  meetingMode: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  // Online meeting details
  meetingLink: {
    type: String,
    validate: {
      validator: function(v) {
        return this.meetingMode === 'offline' || (v && v.length > 0);
      },
      message: 'Meeting link is required for online appointments'
    }
  },
  meetingId: String,
  meetingPassword: String,
  // Location details for offline meetings
  location: {
    room: String,
    floor: String,
    building: String,
    address: String,
    instructions: String
  },
  // Booking details
  reasonForVisit: {
    type: String,
    required: true
  },
  symptoms: [String],
  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  // Patient preferences
  preferences: {
    language: String,
    specialRequests: String,
    accessibility: [String]
  },
  // Booking history
  bookingHistory: [{
    action: {
      type: String,
      enum: ['created', 'confirmed', 'rescheduled', 'cancelled', 'completed']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    previousValues: mongoose.Schema.Types.Mixed
  }],
  // Rescheduling information
  originalDate: Date,
  originalTime: String,
  rescheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rescheduledAt: Date,
  rescheduleReason: String,
  // Cancellation information
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date,
  cancellationReason: String,
  refundStatus: {
    type: String,
    enum: ['not-applicable', 'pending', 'processed', 'denied'],
    default: 'not-applicable'
  },
  // Payment information
  payment: {
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentMethod: String,
    transactionId: String,
    paidAt: Date
  },
  // Reminder settings
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'push'],
      required: true
    },
    timing: {
      type: Number, // minutes before appointment
      required: true
    },
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date
  }],
  // Session notes (filled after appointment)
  sessionNotes: {
    therapistNotes: String,
    patientCondition: String,
    treatmentGiven: String,
    patientResponse: String,
    nextSteps: String,
    followUpRequired: Boolean,
    followUpDate: Date
  },
  // Feedback
  feedback: {
    patientRating: {
      type: Number,
      min: 1,
      max: 5
    },
    patientComments: String,
    therapistRating: {
      type: Number,
      min: 1,
      max: 5
    },
    therapistComments: String,
    submittedAt: Date
  },
  // Attendance tracking
  checkIn: {
    time: Date,
    method: {
      type: String,
      enum: ['manual', 'qr-code', 'biometric']
    }
  },
  checkOut: {
    time: Date,
    method: {
      type: String,
      enum: ['manual', 'qr-code', 'biometric']
    }
  },
  // Special instructions
  specialInstructions: String,
  internalNotes: String // For staff use only
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
// Note: bookingId index is already created by unique: true in schema
bookingSchema.index({ patient: 1 });
bookingSchema.index({ therapist: 1 });
bookingSchema.index({ doctor: 1 });
bookingSchema.index({ appointmentDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingType: 1 });
bookingSchema.index({ createdAt: -1 });

// Compound indexes
bookingSchema.index({ therapist: 1, appointmentDate: 1, status: 1 });
bookingSchema.index({ patient: 1, appointmentDate: -1 });

// Virtual for appointment datetime
bookingSchema.virtual('appointmentDateTime').get(function() {
  if (this.appointmentDate && this.appointmentTime) {
    const [hours, minutes] = this.appointmentTime.split(':');
    const datetime = new Date(this.appointmentDate);
    datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return datetime;
  }
  return null;
});

// Virtual for duration in hours
bookingSchema.virtual('durationInHours').get(function() {
  return this.duration / 60;
});

// Generate unique booking ID
bookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const count = await this.constructor.countDocuments();
    this.bookingId = `BKG${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Add to booking history before save
bookingSchema.pre('save', function(next) {
  if (this.isNew) {
    this.bookingHistory.push({
      action: 'created',
      timestamp: new Date(),
      performedBy: this.patient
    });
  } else if (this.isModified('status')) {
    this.bookingHistory.push({
      action: this.status,
      timestamp: new Date(),
      previousValues: { status: this.getUpdate().$set?.status }
    });
  }
  next();
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);
  
  return this.status === 'confirmed' && hoursUntilAppointment >= 2; // Can cancel if more than 2 hours before
};

// Method to check if booking can be rescheduled
bookingSchema.methods.canBeRescheduled = function() {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);
  
  return ['pending', 'confirmed'].includes(this.status) && hoursUntilAppointment >= 4; // Can reschedule if more than 4 hours before
};

// Method to get time until appointment
bookingSchema.methods.getTimeUntilAppointment = function() {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  return appointmentDateTime - now; // Returns milliseconds
};

// Method to check if reminder should be sent
bookingSchema.methods.shouldSendReminder = function(reminderType, minutesBefore) {
  const now = new Date();
  const appointmentDateTime = this.appointmentDateTime;
  const minutesUntilAppointment = (appointmentDateTime - now) / (1000 * 60);
  
  const reminder = this.reminders.find(r => r.type === reminderType && r.timing === minutesBefore);
  
  return reminder && !reminder.sent && minutesUntilAppointment <= minutesBefore && minutesUntilAppointment > 0;
};

module.exports = mongoose.model('Booking', bookingSchema);
