const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  treatmentId: {
    type: String,
    unique: true,
    required: true
  },
  treatmentType: {
    type: String,
    required: true,
    enum: [
      'Abhyanga',
      'Shirodhara',
      'Pizhichil',
      'Njavarakizhi',
      'Virechana',
      'Basti',
      'Nasya',
      'Raktamokshana',
      'Udvartana',
      'Abhyanga + Shirodhara',
      'Pizhichil + Njavarakizhi',
      'Panchakarma Detox',
      'Stress Relief Program',
      'Pain Management',
      'Wellness Package'
    ]
  },
  therapyTypes: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  objectives: [String],
  duration: {
    weeks: {
      type: Number,
      required: true,
      min: 1
    },
    sessionsPerWeek: {
      type: Number,
      required: true,
      min: 1,
      max: 7
    },
    totalSessions: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed', 'paused', 'cancelled'],
    default: 'planned'
  },
  startDate: {
    type: Date,
    required: true
  },
  expectedEndDate: {
    type: Date,
    required: true
  },
  actualEndDate: {
    type: Date
  },
  // Session Management
  sessions: [{
    sessionNumber: {
      type: Number,
      required: true
    },
    scheduledDate: {
      type: Date,
      required: true
    },
    actualDate: Date,
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    therapyType: String,
    duration: Number, // in minutes
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'missed', 'cancelled', 'rescheduled'],
      default: 'scheduled'
    },
    preSessionNotes: String,
    postSessionNotes: String,
    patientFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: String,
      painLevel: {
        type: Number,
        min: 0,
        max: 10
      },
      energyLevel: {
        type: Number,
        min: 0,
        max: 10
      }
    },
    therapistObservations: {
      patientResponse: String,
      improvements: String,
      concerns: String,
      recommendations: String
    },
    vitals: {
      bloodPressure: {
        systolic: Number,
        diastolic: Number
      },
      pulse: Number,
      temperature: Number,
      weight: Number
    },
    completedAt: Date
  }],
  // Treatment Protocols
  protocols: [{
    name: String,
    description: String,
    steps: [String],
    duration: Number,
    frequency: String,
    materials: [String],
    precautions: [String]
  }],
  // Medications and Supplements
  medications: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['herbal', 'ayurvedic', 'allopathic', 'supplement'],
      required: true
    },
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    startDate: Date,
    endDate: Date,
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  // Diet Plan Reference
  dietPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodDiet'
  },
  // Progress Tracking
  progressMetrics: [{
    date: {
      type: Date,
      default: Date.now
    },
    overallProgress: {
      type: Number,
      min: 0,
      max: 100
    },
    symptomsImprovement: {
      type: Number,
      min: 0,
      max: 100
    },
    qualityOfLife: {
      type: Number,
      min: 1,
      max: 10
    },
    doctorAssessment: String,
    nextSteps: String
  }],
  // Financial Information
  cost: {
    totalAmount: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'refunded'],
      default: 'pending'
    }
  },
  // Special Instructions
  specialInstructions: [String],
  contraindications: [String],
  emergencyProtocol: String,
  // Treatment Outcome
  outcome: {
    status: {
      type: String,
      enum: ['successful', 'partially_successful', 'unsuccessful', 'discontinued']
    },
    improvements: [String],
    remainingIssues: [String],
    recommendations: [String],
    followUpRequired: Boolean,
    followUpDate: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
// Note: treatmentId index is already created by unique: true in schema
treatmentSchema.index({ patient: 1 });
treatmentSchema.index({ doctor: 1 });
treatmentSchema.index({ therapist: 1 });
treatmentSchema.index({ status: 1 });
treatmentSchema.index({ startDate: 1 });
treatmentSchema.index({ 'sessions.scheduledDate': 1 });

// Virtual for completed sessions count
treatmentSchema.virtual('completedSessionsCount').get(function() {
  return this.sessions.filter(session => session.status === 'completed').length;
});

// Virtual for progress percentage
treatmentSchema.virtual('progressPercentage').get(function() {
  if (this.duration.totalSessions === 0) return 0;
  return Math.round((this.completedSessionsCount / this.duration.totalSessions) * 100);
});

// Virtual for remaining sessions
treatmentSchema.virtual('remainingSessions').get(function() {
  return this.duration.totalSessions - this.completedSessionsCount;
});

// Generate unique treatment ID
treatmentSchema.pre('save', async function(next) {
  if (!this.treatmentId) {
    const count = await this.constructor.countDocuments();
    this.treatmentId = `TRT${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Method to get next scheduled session
treatmentSchema.methods.getNextSession = function() {
  const upcomingSessions = this.sessions
    .filter(session => session.status === 'scheduled' && session.scheduledDate > new Date())
    .sort((a, b) => a.scheduledDate - b.scheduledDate);
  
  return upcomingSessions.length > 0 ? upcomingSessions[0] : null;
};

// Method to calculate treatment duration in days
treatmentSchema.methods.getTreatmentDuration = function() {
  if (this.actualEndDate) {
    return Math.ceil((this.actualEndDate - this.startDate) / (1000 * 60 * 60 * 24));
  } else if (this.expectedEndDate) {
    return Math.ceil((this.expectedEndDate - this.startDate) / (1000 * 60 * 60 * 24));
  }
  return 0;
};

// Method to get average session rating
treatmentSchema.methods.getAverageRating = function() {
  const ratingsessions = this.sessions.filter(session => 
    session.patientFeedback && session.patientFeedback.rating
  );
  
  if (ratingsessions.length === 0) return 0;
  
  const totalRating = ratingsessions.reduce((sum, session) => 
    sum + session.patientFeedback.rating, 0
  );
  
  return Math.round((totalRating / ratingsessions.length) * 10) / 10;
};

module.exports = mongoose.model('Treatment', treatmentSchema);
