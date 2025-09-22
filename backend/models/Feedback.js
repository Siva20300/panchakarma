const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackId: {
    type: String,
    unique: true,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  },
  sessionDate: {
    type: Date,
    required: true
  },
  // Patient feedback about therapist/session
  patientFeedback: {
    overallRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    therapistRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    facilityRating: {
      type: Number,
      min: 1,
      max: 5
    },
    treatmentEffectiveness: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comments: {
      type: String,
      maxlength: 1000
    },
    // Specific aspects
    aspects: {
      punctuality: {
        type: Number,
        min: 1,
        max: 5
      },
      professionalism: {
        type: Number,
        min: 1,
        max: 5
      },
      communication: {
        type: Number,
        min: 1,
        max: 5
      },
      technique: {
        type: Number,
        min: 1,
        max: 5
      },
      environment: {
        type: Number,
        min: 1,
        max: 5
      }
    },
    // Symptom improvement
    symptomImprovement: {
      painLevel: {
        before: {
          type: Number,
          min: 0,
          max: 10
        },
        after: {
          type: Number,
          min: 0,
          max: 10
        }
      },
      stressLevel: {
        before: {
          type: Number,
          min: 0,
          max: 10
        },
        after: {
          type: Number,
          min: 0,
          max: 10
        }
      },
      energyLevel: {
        before: {
          type: Number,
          min: 0,
          max: 10
        },
        after: {
          type: Number,
          min: 0,
          max: 10
        }
      },
      sleepQuality: {
        before: {
          type: Number,
          min: 0,
          max: 10
        },
        after: {
          type: Number,
          min: 0,
          max: 10
        }
      }
    },
    // Recommendations
    wouldRecommend: {
      type: Boolean,
      required: true
    },
    wouldReturn: {
      type: Boolean,
      required: true
    },
    // Suggestions
    suggestions: {
      type: String,
      maxlength: 500
    }
  },
  // Therapist feedback about patient/session
  therapistFeedback: {
    patientCooperation: {
      type: Number,
      min: 1,
      max: 5
    },
    patientResponse: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      required: true
    },
    sessionNotes: {
      type: String,
      required: true,
      maxlength: 1000
    },
    treatmentGiven: {
      type: String,
      required: true
    },
    patientCondition: {
      before: {
        type: String,
        required: true
      },
      after: {
        type: String,
        required: true
      }
    },
    // Observations
    observations: {
      physicalResponse: String,
      emotionalResponse: String,
      energyLevel: String,
      tolerance: String
    },
    // Recommendations for future sessions
    recommendations: {
      nextSession: String,
      modifications: String,
      precautions: String,
      homecare: String
    },
    // Progress assessment
    progressAssessment: {
      improvement: {
        type: String,
        enum: ['significant', 'moderate', 'slight', 'none', 'worsened']
      },
      complianceLevel: {
        type: Number,
        min: 1,
        max: 5
      },
      notes: String
    }
  },
  // Mutual feedback (if both parties rate each other)
  mutualRatings: {
    communicationQuality: {
      type: Number,
      min: 1,
      max: 5
    },
    sessionFlow: {
      type: Number,
      min: 1,
      max: 5
    },
    overallExperience: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  // Feedback status
  status: {
    type: String,
    enum: ['pending', 'patient_submitted', 'therapist_submitted', 'completed', 'overdue'],
    default: 'pending'
  },
  // Submission tracking
  submissionDetails: {
    patientSubmittedAt: Date,
    therapistSubmittedAt: Date,
    remindersSent: {
      type: Number,
      default: 0
    },
    lastReminderSent: Date
  },
  // Follow-up actions
  followUpActions: [{
    action: {
      type: String,
      enum: ['schedule_next_session', 'modify_treatment', 'consult_doctor', 'change_therapist', 'additional_tests']
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent']
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    notes: String
  }],
  // Quality assurance
  qualityReview: {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    qualityScore: {
      type: Number,
      min: 1,
      max: 5
    },
    reviewNotes: String,
    flagged: {
      type: Boolean,
      default: false
    },
    flagReason: String
  },
  // Analytics tags
  tags: [String],
  // Visibility settings
  isPublic: {
    type: Boolean,
    default: false
  },
  // Response to feedback (from management)
  managementResponse: {
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date,
    response: String,
    actionsTaken: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
// Note: feedbackId index is already created by unique: true in schema
feedbackSchema.index({ patient: 1 });
feedbackSchema.index({ therapist: 1 });
feedbackSchema.index({ sessionDate: -1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ 'patientFeedback.overallRating': 1 });
feedbackSchema.index({ createdAt: -1 });

// Compound indexes
feedbackSchema.index({ therapist: 1, sessionDate: -1 });
feedbackSchema.index({ patient: 1, status: 1 });

// Virtual for average patient rating
feedbackSchema.virtual('averagePatientRating').get(function() {
  if (!this.patientFeedback) return 0;
  
  const ratings = [
    this.patientFeedback.overallRating,
    this.patientFeedback.therapistRating,
    this.patientFeedback.treatmentEffectiveness
  ].filter(rating => rating != null);
  
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
});

// Virtual for improvement percentage
feedbackSchema.virtual('improvementPercentage').get(function() {
  if (!this.patientFeedback?.symptomImprovement) return 0;
  
  const improvements = [];
  const symptoms = this.patientFeedback.symptomImprovement;
  
  Object.keys(symptoms).forEach(symptom => {
    const before = symptoms[symptom].before;
    const after = symptoms[symptom].after;
    
    if (before != null && after != null && before > 0) {
      const improvement = ((before - after) / before) * 100;
      improvements.push(improvement);
    }
  });
  
  if (improvements.length === 0) return 0;
  
  const avgImprovement = improvements.reduce((sum, imp) => sum + imp, 0) / improvements.length;
  return Math.round(avgImprovement);
});

// Generate unique feedback ID
feedbackSchema.pre('save', async function(next) {
  if (!this.feedbackId) {
    const count = await this.constructor.countDocuments();
    this.feedbackId = `FB${String(count + 1).padStart(8, '0')}`;
  }
  next();
});

// Update status based on submissions
feedbackSchema.pre('save', function(next) {
  const hasPatientFeedback = this.patientFeedback && this.patientFeedback.overallRating;
  const hasTherapistFeedback = this.therapistFeedback && this.therapistFeedback.patientResponse;
  
  if (hasPatientFeedback && hasTherapistFeedback) {
    this.status = 'completed';
  } else if (hasPatientFeedback) {
    this.status = 'patient_submitted';
  } else if (hasTherapistFeedback) {
    this.status = 'therapist_submitted';
  }
  
  // Update submission timestamps
  if (hasPatientFeedback && !this.submissionDetails.patientSubmittedAt) {
    this.submissionDetails.patientSubmittedAt = new Date();
  }
  if (hasTherapistFeedback && !this.submissionDetails.therapistSubmittedAt) {
    this.submissionDetails.therapistSubmittedAt = new Date();
  }
  
  next();
});

// Method to check if feedback is overdue
feedbackSchema.methods.isOverdue = function() {
  const daysSinceSession = (new Date() - this.sessionDate) / (1000 * 60 * 60 * 24);
  return daysSinceSession > 7 && this.status === 'pending'; // Overdue after 7 days
};

// Method to calculate therapist performance score
feedbackSchema.methods.getTherapistPerformanceScore = function() {
  if (!this.patientFeedback?.aspects) return 0;
  
  const aspects = this.patientFeedback.aspects;
  const scores = Object.values(aspects).filter(score => score != null);
  
  if (scores.length === 0) return 0;
  
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return Math.round(average * 10) / 10;
};

// Static method to get therapist average rating
feedbackSchema.statics.getTherapistAverageRating = async function(therapistId, days = 90) {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  
  const feedbacks = await this.find({
    therapist: therapistId,
    sessionDate: { $gte: cutoffDate },
    'patientFeedback.overallRating': { $exists: true }
  });
  
  if (feedbacks.length === 0) return { average: 0, count: 0 };
  
  const totalRating = feedbacks.reduce((sum, feedback) => 
    sum + feedback.patientFeedback.overallRating, 0
  );
  
  return {
    average: Math.round((totalRating / feedbacks.length) * 10) / 10,
    count: feedbacks.length
  };
};

// Static method to get feedback analytics
feedbackSchema.statics.getFeedbackAnalytics = async function(filters = {}) {
  const matchStage = { status: 'completed' };
  
  if (filters.therapist) matchStage.therapist = filters.therapist;
  if (filters.startDate && filters.endDate) {
    matchStage.sessionDate = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate)
    };
  }
  
  const analytics = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalFeedbacks: { $sum: 1 },
        averageRating: { $avg: '$patientFeedback.overallRating' },
        averageTherapistRating: { $avg: '$patientFeedback.therapistRating' },
        averageTreatmentEffectiveness: { $avg: '$patientFeedback.treatmentEffectiveness' },
        recommendationRate: {
          $avg: {
            $cond: ['$patientFeedback.wouldRecommend', 1, 0]
          }
        },
        returnRate: {
          $avg: {
            $cond: ['$patientFeedback.wouldReturn', 1, 0]
          }
        }
      }
    }
  ]);
  
  return analytics[0] || {
    totalFeedbacks: 0,
    averageRating: 0,
    averageTherapistRating: 0,
    averageTreatmentEffectiveness: 0,
    recommendationRate: 0,
    returnRate: 0
  };
};

module.exports = mongoose.model('Feedback', feedbackSchema);
