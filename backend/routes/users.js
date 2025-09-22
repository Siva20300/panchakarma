const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getUserStats,
  deactivateUser,
  activateUser
} = require('../controllers/users');
const { protect, authorize, hasPermission } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateUserUpdate,
  validateObjectId,
  validatePagination
} = require('../middleware/validation');

// All routes are protected and require authentication
router.use(protect);

// Routes accessible by admin and doctors
router.get('/', authorize('admin', 'doctor'), validatePagination, getUsers);
router.get('/stats', authorize('admin', 'doctor'), getUserStats);
router.post('/', authorize('admin'), validateUserRegistration, createUser);

// Routes with ID parameter
router.get('/:id', validateObjectId('id'), getUser);
router.put('/:id', validateObjectId('id'), validateUserUpdate, updateUser);
router.delete('/:id', authorize('admin'), validateObjectId('id'), deleteUser);
router.put('/:id/deactivate', authorize('admin'), validateObjectId('id'), deactivateUser);
router.put('/:id/activate', authorize('admin'), validateObjectId('id'), activateUser);
router.post('/:id/avatar', validateObjectId('id'), uploadAvatar);

module.exports = router;
