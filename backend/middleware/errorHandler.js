const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      message,
      statusCode: 404
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    
    // Extract field name from error
    const field = Object.keys(err.keyValue)[0];
    if (field) {
      message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }
    
    error = {
      message,
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = {
      message,
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = {
      message,
      statusCode: 401
    };
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error = {
      message,
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected field in file upload';
    error = {
      message,
      statusCode: 400
    };
  }

  // Rate limiting error
  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = {
      message,
      statusCode: 429
    };
  }

  // Database connection errors
  if (err.name === 'MongoNetworkError') {
    const message = 'Database connection error';
    error = {
      message,
      statusCode: 503
    };
  }

  // Default error response
  const statusCode = error.statusCode || err.statusCode || 500;
  const message = error.message || 'Server Error';

  // Prepare error response
  const errorResponse = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err
    })
  };

  // Add request ID if available
  if (req.requestId) {
    errorResponse.requestId = req.requestId;
  }

  // Log error details in production
  if (process.env.NODE_ENV === 'production') {
    console.error(`Error ${statusCode}: ${message}`, {
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
  }

  res.status(statusCode).json(errorResponse);
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error helper
const createValidationError = (field, message) => {
  const error = new AppError(`Validation Error: ${message}`, 400);
  error.field = field;
  return error;
};

// Not found error helper
const createNotFoundError = (resource = 'Resource') => {
  return new AppError(`${resource} not found`, 404);
};

// Unauthorized error helper
const createUnauthorizedError = (message = 'Not authorized') => {
  return new AppError(message, 401);
};

// Forbidden error helper
const createForbiddenError = (message = 'Access forbidden') => {
  return new AppError(message, 403);
};

// Conflict error helper
const createConflictError = (message = 'Resource conflict') => {
  return new AppError(message, 409);
};

// Bad request error helper
const createBadRequestError = (message = 'Bad request') => {
  return new AppError(message, 400);
};

// Internal server error helper
const createServerError = (message = 'Internal server error') => {
  return new AppError(message, 500);
};

module.exports = {
  errorHandler,
  asyncHandler,
  AppError,
  createValidationError,
  createNotFoundError,
  createUnauthorizedError,
  createForbiddenError,
  createConflictError,
  createBadRequestError,
  createServerError
};
