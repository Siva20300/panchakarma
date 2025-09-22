const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// In-memory user storage (for testing)
const users = [];
let userIdCounter = 1;

// Helper function to generate simple JWT-like token
const generateToken = (userId) => {
  return `token_${userId}_${Date.now()}`;
};

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, age, specialization, experience } = req.body;
    
    console.log('Registration attempt:', { name, email, role });
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = {
      _id: userIdCounter++,
      name,
      email,
      password: hashedPassword,
      role: role || 'patient',
      phone,
      age: role === 'patient' ? age : undefined,
      specialization: (role === 'doctor' || role === 'therapist') ? specialization : undefined,
      experience: (role === 'doctor' || role === 'therapist') ? experience : undefined,
      isActive: true,
      createdAt: new Date()
    };
    
    users.push(user);
    
    // Generate token
    const token = generateToken(user._id);
    
    // Remove password from response
    const { password: _, ...userResponse } = user;
    
    console.log('User registered successfully:', userResponse);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', email);
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    // Remove password from response
    const { password: _, ...userResponse } = user;
    
    console.log('User logged in successfully:', userResponse);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get current user endpoint
app.get('/api/auth/me', (req, res) => {
  // Simple token validation (in production, use proper JWT)
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  // Extract user ID from token (simplified)
  const userId = parseInt(token.split('_')[1]);
  const user = users.find(u => u._id === userId);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  const { password: _, ...userResponse } = user;
  
  res.status(200).json({
    success: true,
    data: userResponse
  });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    users: users.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints available at /api/auth/*`);
});
