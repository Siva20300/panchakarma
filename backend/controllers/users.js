const User = require('../models/User');
const Patient = require('../models/Patient');
const { asyncHandler, createNotFoundError, createBadRequestError, createForbiddenError } = require('../middleware/errorHandler');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin, Doctor)
const getUsers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    role,
    isActive,
    search,
    sort = '-createdAt'
  } = req.query;

  // Build query
  const query = {};
  
  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === 'true';
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query
  const users = await User.find(query)
    .select('-password')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: users.length,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    },
    data: users
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw createNotFoundError('User not found');
  }

  // Check if user can access this profile
  if (req.user.role !== 'admin' && 
      req.user.role !== 'doctor' && 
      req.user._id.toString() !== req.params.id) {
    throw createForbiddenError('Not authorized to access this profile');
  }

  // If user is a patient, get patient details
  let patientDetails = null;
  if (user.role === 'patient') {
    patientDetails = await Patient.findOne({ user: user._id })
      .populate('assignedDoctor', 'name specialization')
      .populate('assignedTherapist', 'name specialization');
  }

  res.status(200).json({
    success: true,
    data: {
      user,
      patientDetails
    }
  });
});

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin)
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, age, specialization, experience } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createBadRequestError('User already exists with this email');
  }

  // Create user data
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
    await Patient.create({
      user: user._id,
      problems: [],
      primaryProblem: 'General wellness'
    });
  }

  // Remove password from response
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Check if user can update this profile
  if (req.user.role !== 'admin' && 
      req.user.role !== 'doctor' && 
      req.user._id.toString() !== req.params.id) {
    throw createForbiddenError('Not authorized to update this profile');
  }

  const fieldsToUpdate = {
    name: req.body.name,
    phone: req.body.phone,
    age: req.body.age,
    specialization: req.body.specialization,
    experience: req.body.experience,
    avatar: req.body.avatar,
    address: req.body.address,
    emergencyContact: req.body.emergencyContact,
    medicalHistory: req.body.medicalHistory,
    allergies: req.body.allergies,
    currentMedications: req.body.currentMedications
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  // Only admin can update role and isActive
  if (req.user.role === 'admin') {
    if (req.body.role !== undefined) fieldsToUpdate.role = req.body.role;
    if (req.body.isActive !== undefined) fieldsToUpdate.isActive = req.body.isActive;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!user) {
    throw createNotFoundError('User not found');
  }

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createNotFoundError('User not found');
  }

  // Don't allow deletion of admin users
  if (user.role === 'admin') {
    throw createBadRequestError('Cannot delete admin users');
  }

  // If user is a patient, delete patient record too
  if (user.role === 'patient') {
    await Patient.findOneAndDelete({ user: user._id });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Upload user avatar
// @route   POST /api/users/:id/avatar
// @access  Private
const uploadAvatar = asyncHandler(async (req, res) => {
  // Check if user can update this profile
  if (req.user.role !== 'admin' && 
      req.user._id.toString() !== req.params.id) {
    throw createForbiddenError('Not authorized to update this profile');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw createNotFoundError('User not found');
  }

  // In a real application, you would handle file upload here
  // For now, we'll just update the avatar URL
  const { avatarUrl } = req.body;

  if (!avatarUrl) {
    throw createBadRequestError('Avatar URL is required');
  }

  user.avatar = avatarUrl;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Avatar updated successfully',
    data: {
      avatar: user.avatar
    }
  });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private (Admin, Doctor)
const getUserStats = asyncHandler(async (req, res) => {
  const stats = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        active: {
          $sum: {
            $cond: ['$isActive', 1, 0]
          }
        }
      }
    }
  ]);

  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const newUsersThisMonth = await User.countDocuments({
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    }
  });

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      roleStats: stats
    }
  });
});

// @desc    Deactivate user
// @route   PUT /api/users/:id/deactivate
// @access  Private (Admin)
const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createNotFoundError('User not found');
  }

  if (user.role === 'admin') {
    throw createBadRequestError('Cannot deactivate admin users');
  }

  user.isActive = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User deactivated successfully',
    data: user
  });
});

// @desc    Activate user
// @route   PUT /api/users/:id/activate
// @access  Private (Admin)
const activateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createNotFoundError('User not found');
  }

  user.isActive = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User activated successfully',
    data: user
  });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getUserStats,
  deactivateUser,
  activateUser
};
