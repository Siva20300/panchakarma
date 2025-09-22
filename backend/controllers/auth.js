const crypto = require('crypto');
const User = require('../models/User');
const Patient = require('../models/Patient');
const { generateToken } = require('../middleware/auth');
const { asyncHandler, createNotFoundError, createUnauthorizedError, createBadRequestError } = require('../middleware/errorHandler');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, age, specialization, experience } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createBadRequestError('User already exists with this email');
  }

  // Create user
  const userData = {
    name,
    email,
    password,
    role,
    phone
  };

  // Add role-specific fields
  if (role === 'patient') {
    userData.age = age;
  } else if (role === 'doctor' || role === 'therapist') {
    userData.specialization = specialization;
    userData.experience = experience;
  }

  const user = await User.create(userData);

  // Create patient record if user is a patient
  if (role === 'patient') {
    try {
      await Patient.create({
        user: user._id,
        problems: ['General wellness'], // Default problem
        primaryProblem: 'General wellness' // Default
      });
    } catch (patientError) {
      console.error('Error creating patient record:', patientError);
      // Delete the user if patient creation fails to maintain data consistency
      await User.findByIdAndDelete(user._id);
      throw createBadRequestError('Failed to create patient record');
    }
  }

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      token
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    throw createUnauthorizedError('Invalid credentials');
  }

  // Check if user is active
  if (!user.isActive) {
    throw createUnauthorizedError('Account is deactivated');
  }

  // Update last login
  await user.updateLastLogin();

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user,
      token
    }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logout = asyncHandler(async (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just send a success response
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    phone: req.body.phone,
    age: req.body.age,
    avatar: req.body.avatar,
    address: req.body.address,
    emergencyContact: req.body.emergencyContact
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(currentPassword))) {
    throw createUnauthorizedError('Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createNotFoundError('User not found with this email');
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

  // In a real application, you would send an email here
  // For now, we'll just return the reset URL
  res.status(200).json({
    success: true,
    message: 'Password reset token generated',
    resetUrl // Remove this in production
  });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    throw createBadRequestError('Invalid or expired reset token');
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
    data: {
      token
    }
  });
});

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public (but requires valid refresh token)
const refreshToken = asyncHandler(async (req, res) => {
  // User is already set by verifyRefreshToken middleware
  const token = generateToken(req.user._id);

  res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      token
    }
  });
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  // In a real application, you would verify the email token
  // For now, we'll just mark the user as verified
  const { token } = req.params;

  // This is a simplified implementation
  // In production, you would decode the token and verify the user
  res.status(200).json({
    success: true,
    message: 'Email verified successfully'
  });
});

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createNotFoundError('User not found with this email');
  }

  if (user.emailVerified) {
    throw createBadRequestError('Email is already verified');
  }

  // In a real application, you would send a verification email here
  res.status(200).json({
    success: true,
    message: 'Verification email sent'
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
  verifyEmail,
  resendVerification
};
