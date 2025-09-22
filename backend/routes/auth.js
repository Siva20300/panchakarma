const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/auth');
const { protect, verifyRefreshToken } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validatePasswordChange
} = require('../middleware/validation');

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/refresh-token', verifyRefreshToken, refreshToken);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, validateUserUpdate, updateProfile);
router.put('/change-password', protect, validatePasswordChange, changePassword);

module.exports = router;
