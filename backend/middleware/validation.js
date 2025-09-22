const { body, param, query, validationResult } = require('express-validator');
const { createValidationError } = require('./errorHandler');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  
  next();
};

// User validation rules
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('role')
    .isIn(['patient', 'therapist', 'doctor', 'admin'])
    .withMessage('Invalid role'),
  
  body('phone')
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits'),
  
  body('age')
    .if(body('role').equals('patient'))
    .optional()
    .isInt({ min: 1, max: 150 })
    .withMessage('Age must be between 1 and 150'),
  
  body('specialization')
    .if(body('role').isIn(['doctor', 'therapist']))
    .optional()
    .notEmpty()
    .withMessage('Specialization is required for doctors and therapists'),
  
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('age')
    .optional()
    .isInt({ min: 1, max: 150 })
    .withMessage('Age must be between 1 and 150'),
  
  handleValidationErrors
];

// Patient validation rules
const validatePatientCreation = [
  body('problems')
    .isArray({ min: 1 })
    .withMessage('At least one problem must be specified'),
  
  body('problems.*')
    .trim()
    .notEmpty()
    .withMessage('Problem cannot be empty'),
  
  body('primaryProblem')
    .trim()
    .notEmpty()
    .withMessage('Primary problem is required'),
  
  body('meetingPreference')
    .optional()
    .isIn(['online', 'offline', 'both'])
    .withMessage('Invalid meeting preference'),
  
  handleValidationErrors
];

// Booking validation rules
const validateBookingCreation = [
  body('therapyType')
    .trim()
    .notEmpty()
    .withMessage('Therapy type is required'),
  
  body('appointmentDate')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value < new Date()) {
        throw new Error('Appointment date cannot be in the past');
      }
      return true;
    }),
  
  body('appointmentTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide time in HH:MM format'),
  
  body('duration')
    .optional()
    .isInt({ min: 15, max: 240 })
    .withMessage('Duration must be between 15 and 240 minutes'),
  
  body('reasonForVisit')
    .trim()
    .notEmpty()
    .withMessage('Reason for visit is required'),
  
  body('meetingMode')
    .isIn(['online', 'offline'])
    .withMessage('Invalid meeting mode'),
  
  body('urgencyLevel')
    .optional()
    .isIn(['low', 'medium', 'high', 'emergency'])
    .withMessage('Invalid urgency level'),
  
  handleValidationErrors
];

// Treatment validation rules
const validateTreatmentCreation = [
  body('treatmentType')
    .trim()
    .notEmpty()
    .withMessage('Treatment type is required'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('duration.weeks')
    .isInt({ min: 1 })
    .withMessage('Duration in weeks must be at least 1'),
  
  body('duration.sessionsPerWeek')
    .isInt({ min: 1, max: 7 })
    .withMessage('Sessions per week must be between 1 and 7'),
  
  body('duration.totalSessions')
    .isInt({ min: 1 })
    .withMessage('Total sessions must be at least 1'),
  
  body('startDate')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid start date'),
  
  body('expectedEndDate')
    .isISO8601()
    .toDate()
    .custom((value, { req }) => {
      if (value <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Food Diet validation rules
const validateFoodDietCreation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('validUntil')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Valid until date must be in the future');
      }
      return true;
    }),
  
  body('generalGuidelines')
    .isArray({ min: 1 })
    .withMessage('At least one general guideline is required'),
  
  handleValidationErrors
];

// Feedback validation rules
const validateFeedbackCreation = [
  body('sessionDate')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid session date'),
  
  body('patientFeedback.overallRating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Overall rating must be between 1 and 5'),
  
  body('patientFeedback.therapistRating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Therapist rating must be between 1 and 5'),
  
  body('patientFeedback.treatmentEffectiveness')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Treatment effectiveness rating must be between 1 and 5'),
  
  body('patientFeedback.comments')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Comments cannot exceed 1000 characters'),
  
  body('therapistFeedback.patientResponse')
    .optional()
    .isIn(['excellent', 'good', 'fair', 'poor'])
    .withMessage('Invalid patient response value'),
  
  body('therapistFeedback.sessionNotes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Session notes cannot exceed 1000 characters'),
  
  handleValidationErrors
];

// Notification validation rules
const validateNotificationCreation = [
  body('type')
    .isIn([
      'booking_confirmed', 'booking_cancelled', 'booking_rescheduled',
      'appointment_reminder', 'treatment_assigned', 'session_completed',
      'diet_plan_updated', 'medication_reminder', 'payment_due',
      'payment_received', 'feedback_request', 'progress_update',
      'system_announcement', 'emergency_alert', 'therapist_message',
      'doctor_message'
    ])
    .withMessage('Invalid notification type'),
  
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority level'),
  
  handleValidationErrors
];

// Common validation rules
const validateObjectId = (field) => [
  param(field)
    .isMongoId()
    .withMessage(`Invalid ${field} ID`),
  
  handleValidationErrors
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort')
    .optional()
    .isIn(['createdAt', '-createdAt', 'name', '-name', 'date', '-date'])
    .withMessage('Invalid sort parameter'),
  
  handleValidationErrors
];

const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid start date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .custom((value, { req }) => {
      if (req.query.startDate && value <= new Date(req.query.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Password validation
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    }),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validatePatientCreation,
  validateBookingCreation,
  validateTreatmentCreation,
  validateFoodDietCreation,
  validateFeedbackCreation,
  validateNotificationCreation,
  validateObjectId,
  validatePagination,
  validateDateRange,
  validatePasswordChange
};
