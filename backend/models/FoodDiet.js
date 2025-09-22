const mongoose = require('mongoose');

const foodDietSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  },
  dietPlanId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  // Diet plan status
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed', 'modified'],
    default: 'active'
  },
  // Validity period
  validFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  // General dietary guidelines
  generalGuidelines: [{
    guideline: {
      type: String,
      required: true
    },
    importance: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    explanation: String
  }],
  // Food restrictions and allergies
  restrictions: [{
    item: {
      type: String,
      required: true
    },
    reason: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe', 'critical'],
      default: 'moderate'
    },
    alternatives: [String]
  }],
  // Detailed meal plan
  mealPlan: {
    // Early morning (5-7 AM)
    earlyMorning: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Breakfast (7-9 AM)
    breakfast: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Mid-morning (10-11 AM)
    midMorning: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Lunch (12-2 PM)
    lunch: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Afternoon (3-4 PM)
    afternoon: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Evening (5-7 PM)
    evening: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Dinner (7-9 PM)
    dinner: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    },
    // Before bed (9-10 PM)
    beforeBed: {
      recommended: [{
        food: String,
        quantity: String,
        benefits: String,
        preparation: String
      }],
      avoid: [String],
      timing: String,
      notes: String
    }
  },
  // Weekly meal variations
  weeklyPlan: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true
    },
    specialInstructions: String,
    modifications: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    }
  }],
  // Nutritional targets
  nutritionalTargets: {
    calories: {
      target: Number,
      unit: {
        type: String,
        default: 'kcal'
      }
    },
    protein: {
      target: Number,
      unit: {
        type: String,
        default: 'g'
      }
    },
    carbohydrates: {
      target: Number,
      unit: {
        type: String,
        default: 'g'
      }
    },
    fats: {
      target: Number,
      unit: {
        type: String,
        default: 'g'
      }
    },
    fiber: {
      target: Number,
      unit: {
        type: String,
        default: 'g'
      }
    },
    water: {
      target: Number,
      unit: {
        type: String,
        default: 'liters'
      }
    }
  },
  // Ayurvedic dietary principles
  ayurvedicPrinciples: {
    dosha: {
      type: String,
      enum: ['vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'tridosha']
    },
    tastes: {
      increase: [{
        taste: {
          type: String,
          enum: ['sweet', 'sour', 'salty', 'bitter', 'pungent', 'astringent']
        },
        reason: String
      }],
      decrease: [{
        taste: {
          type: String,
          enum: ['sweet', 'sour', 'salty', 'bitter', 'pungent', 'astringent']
        },
        reason: String
      }]
    },
    foodQualities: {
      increase: [String], // e.g., 'warm', 'moist', 'heavy'
      decrease: [String]  // e.g., 'cold', 'dry', 'light'
    }
  },
  // Special dietary considerations
  specialConsiderations: {
    medicalConditions: [String],
    allergies: [String],
    intolerances: [String],
    culturalPreferences: [String],
    religiousRestrictions: [String]
  },
  // Supplements and herbs
  supplements: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['herb', 'mineral', 'vitamin', 'ayurvedic_medicine', 'other']
    },
    dosage: String,
    timing: String,
    duration: String,
    purpose: String,
    instructions: String
  }],
  // Progress tracking
  adherenceTracking: [{
    date: {
      type: Date,
      default: Date.now
    },
    adherenceScore: {
      type: Number,
      min: 0,
      max: 100
    },
    missedMeals: [String],
    extraFoods: [String],
    patientFeedback: String,
    symptoms: [String],
    energyLevel: {
      type: Number,
      min: 1,
      max: 10
    },
    digestion: {
      type: String,
      enum: ['poor', 'fair', 'good', 'excellent']
    },
    notes: String
  }],
  // Doctor's notes and modifications
  doctorNotes: [{
    date: {
      type: Date,
      default: Date.now
    },
    note: String,
    modifications: String,
    nextReview: Date
  }],
  // Patient feedback and queries
  patientQueries: [{
    date: {
      type: Date,
      default: Date.now
    },
    query: String,
    response: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }],
  // Review and update history
  reviewHistory: [{
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reviewDate: {
      type: Date,
      default: Date.now
    },
    changes: String,
    reason: String,
    nextReviewDate: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
// Note: dietPlanId index is already created by unique: true in schema
foodDietSchema.index({ patient: 1 });
foodDietSchema.index({ createdBy: 1 });
foodDietSchema.index({ status: 1 });
foodDietSchema.index({ validFrom: 1, validUntil: 1 });

// Virtual for current adherence score
foodDietSchema.virtual('currentAdherenceScore').get(function() {
  if (this.adherenceTracking && this.adherenceTracking.length > 0) {
    const recent = this.adherenceTracking
      .filter(entry => entry.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Last 7 days
      .reduce((sum, entry) => sum + entry.adherenceScore, 0);
    
    const count = this.adherenceTracking.length;
    return count > 0 ? Math.round(recent / count) : 0;
  }
  return 0;
});

// Virtual for days remaining
foodDietSchema.virtual('daysRemaining').get(function() {
  const now = new Date();
  const validUntil = new Date(this.validUntil);
  const diffTime = validUntil - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Generate unique diet plan ID
foodDietSchema.pre('save', async function(next) {
  if (!this.dietPlanId) {
    const count = await this.constructor.countDocuments();
    this.dietPlanId = `DIET${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Method to check if diet plan is currently valid
foodDietSchema.methods.isCurrentlyValid = function() {
  const now = new Date();
  return this.status === 'active' && 
         this.validFrom <= now && 
         this.validUntil >= now;
};

// Method to get today's meal plan
foodDietSchema.methods.getTodaysMealPlan = function() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const weeklyModification = this.weeklyPlan.find(plan => plan.day === today);
  
  let todaysPlan = { ...this.mealPlan };
  
  if (weeklyModification && weeklyModification.modifications) {
    // Apply weekly modifications
    Object.keys(weeklyModification.modifications).forEach(meal => {
      if (todaysPlan[meal] && weeklyModification.modifications[meal].length > 0) {
        todaysPlan[meal].specialToday = weeklyModification.modifications[meal];
      }
    });
  }
  
  return todaysPlan;
};

// Method to calculate average adherence score
foodDietSchema.methods.getAverageAdherence = function(days = 30) {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const recentEntries = this.adherenceTracking.filter(entry => entry.date >= cutoffDate);
  
  if (recentEntries.length === 0) return 0;
  
  const totalScore = recentEntries.reduce((sum, entry) => sum + entry.adherenceScore, 0);
  return Math.round(totalScore / recentEntries.length);
};

module.exports = mongoose.model('FoodDiet', foodDietSchema);
