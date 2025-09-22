const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientId: {
    type: String,
    unique: true,
    required: true
  },
  problems: [{
    type: String,
    required: true
  }],
  primaryProblem: {
    type: String,
    required: true
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTherapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  treatmentPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'cancelled'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date
  },
  nextAppointment: {
    type: Date
  },
  meetingPreference: {
    type: String,
    enum: ['online', 'offline', 'both'],
    default: 'offline'
  },
  // Medical Information
  height: {
    value: Number,
    unit: {
      type: String,
      enum: ['cm', 'ft'],
      default: 'cm'
    }
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  },
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
    recordedAt: Date
  },
  pulse: {
    rate: Number,
    recordedAt: Date
  },
  // Ayurvedic Assessment
  prakriti: {
    type: String,
    enum: ['vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'tridosha']
  },
  vikriti: {
    type: String,
    enum: ['vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'tridosha']
  },
  // Lifestyle Information
  lifestyle: {
    occupation: String,
    workingHours: String,
    sleepPattern: String,
    exerciseRoutine: String,
    stressLevel: {
      type: Number,
      min: 1,
      max: 10
    },
    smokingStatus: {
      type: String,
      enum: ['never', 'former', 'current']
    },
    alcoholConsumption: {
      type: String,
      enum: ['never', 'occasional', 'regular', 'heavy']
    }
  },
  // Dietary Information
  dietaryPreferences: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'jain']
  },
  foodAllergies: [String],
  dietaryRestrictions: [String],
  // Treatment History
  previousTreatments: [{
    treatmentName: String,
    provider: String,
    startDate: Date,
    endDate: Date,
    outcome: String
  }],
  // Insurance Information
  insurance: {
    provider: String,
    policyNumber: String,
    validUntil: Date
  },
  // Notes and Comments
  doctorNotes: [String],
  therapistNotes: [String],
  // Consent and Agreements
  consentForms: [{
    formType: String,
    signedAt: Date,
    documentUrl: String
  }],
  // Progress Tracking
  progressMetrics: [{
    date: Date,
    painLevel: {
      type: Number,
      min: 0,
      max: 10
    },
    energyLevel: {
      type: Number,
      min: 0,
      max: 10
    },
    sleepQuality: {
      type: Number,
      min: 0,
      max: 10
    },
    overallWellbeing: {
      type: Number,
      min: 0,
      max: 10
    },
    notes: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
// Note: patientId index is already created by unique: true in schema
patientSchema.index({ user: 1 });
patientSchema.index({ assignedDoctor: 1 });
patientSchema.index({ assignedTherapist: 1 });
patientSchema.index({ status: 1 });
patientSchema.index({ registrationDate: -1 });

// Virtual populate for user details
patientSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

// Virtual populate for doctor details
patientSchema.virtual('doctorDetails', {
  ref: 'User',
  localField: 'assignedDoctor',
  foreignField: '_id',
  justOne: true
});

// Virtual populate for therapist details
patientSchema.virtual('therapistDetails', {
  ref: 'User',
  localField: 'assignedTherapist',
  foreignField: '_id',
  justOne: true
});

// Generate unique patient ID
patientSchema.pre('save', async function(next) {
  if (!this.patientId) {
    try {
      const count = await this.constructor.countDocuments();
      this.patientId = `PAT${String(count + 1).padStart(6, '0')}`;
    } catch (error) {
      console.error('Error generating patient ID:', error);
      // Fallback to timestamp-based ID if count fails
      this.patientId = `PAT${Date.now().toString().slice(-6)}`;
    }
  }
  next();
});

// Method to calculate BMI
patientSchema.methods.calculateBMI = function() {
  if (this.height?.value && this.weight?.value) {
    let heightInMeters = this.height.value;
    let weightInKg = this.weight.value;
    
    // Convert height to meters if in feet
    if (this.height.unit === 'ft') {
      heightInMeters = this.height.value * 0.3048;
    } else {
      heightInMeters = this.height.value / 100;
    }
    
    // Convert weight to kg if in lbs
    if (this.weight.unit === 'lbs') {
      weightInKg = this.weight.value * 0.453592;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
  }
  return null;
};

// Method to get latest progress
patientSchema.methods.getLatestProgress = function() {
  if (this.progressMetrics && this.progressMetrics.length > 0) {
    return this.progressMetrics[this.progressMetrics.length - 1];
  }
  return null;
};

module.exports = mongoose.model('Patient', patientSchema);
