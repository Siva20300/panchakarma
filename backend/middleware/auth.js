const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found'
        });
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

// Optional auth - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token is invalid, but we continue without user
      req.user = null;
    }
  }

  next();
};

// Check if user owns the resource or has admin privileges
const checkOwnership = (resourceUserField = 'user') => {
  return async (req, res, next) => {
    try {
      // Admin and doctor can access any resource
      if (['admin', 'doctor'].includes(req.user.role)) {
        return next();
      }

      // For other roles, check ownership
      const resourceId = req.params.id;
      
      // This is a generic ownership check - specific implementations
      // should be done in individual route handlers
      req.checkOwnership = {
        userId: req.user._id,
        userRole: req.user.role,
        resourceUserField
      };

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking ownership'
      });
    }
  };
};

// Rate limiting per user
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user._id.toString();
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get user's request history
    let userRequests = requests.get(userId) || [];
    
    // Filter out old requests
    userRequests = userRequests.filter(timestamp => timestamp > windowStart);

    // Check if limit exceeded
    if (userRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }

    // Add current request
    userRequests.push(now);
    requests.set(userId, userRequests);

    next();
  };
};

// Validate API key for external integrations
const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key required'
    });
  }

  // In a real application, you would validate against a database
  // For now, we'll use environment variable
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key'
    });
  }

  next();
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Verify refresh token
const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token required'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

// Check if user has specific permission
const hasPermission = (permission) => {
  return (req, res, next) => {
    // Define role-based permissions
    const rolePermissions = {
      admin: ['*'], // Admin has all permissions
      doctor: [
        'read:patients',
        'write:patients',
        'read:treatments',
        'write:treatments',
        'read:bookings',
        'write:bookings',
        'read:feedback',
        'read:notifications',
        'write:notifications',
        'read:food-diets',
        'write:food-diets'
      ],
      therapist: [
        'read:patients',
        'read:treatments',
        'read:bookings',
        'write:bookings',
        'read:feedback',
        'write:feedback',
        'read:notifications',
        'write:notifications'
      ],
      patient: [
        'read:own-profile',
        'write:own-profile',
        'read:own-bookings',
        'write:own-bookings',
        'read:own-treatments',
        'read:own-feedback',
        'write:own-feedback',
        'read:own-notifications'
      ]
    };

    const userPermissions = rolePermissions[req.user.role] || [];

    // Check if user has the required permission or admin access
    if (userPermissions.includes('*') || userPermissions.includes(permission)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Insufficient permissions'
    });
  };
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  checkOwnership,
  userRateLimit,
  validateApiKey,
  generateToken,
  verifyRefreshToken,
  hasPermission
};
