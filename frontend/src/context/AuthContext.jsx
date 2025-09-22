import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

// Demo user accounts (fallback for demo purposes)
const DEMO_USERS = {
  'doctor@ayursutra.com': {
    id: '1',
    email: 'doctor@ayursutra.com',
    name: 'Dr. Rajesh Kumar',
    role: 'doctor',
    specialization: 'Panchakarma Specialist',
    avatar: '👨‍⚕️'
  },
  'therapist@ayursutra.com': {
    id: '2',
    email: 'therapist@ayursutra.com',
    name: 'Priya Sharma',
    role: 'therapist',
    specialization: 'Abhyanga & Shirodhara',
    avatar: '👩‍⚕️'
  },
  'patient@ayursutra.com': {
    id: '3',
    email: 'patient@ayursutra.com',
    name: 'Amit Patel',
    role: 'patient',
    age: 35,
    avatar: '🧑‍💼'
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data and token
    const storedUser = localStorage.getItem('ayursutra_user');
    const storedToken = localStorage.getItem('ayursutra_token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        // Optionally verify token with backend
        verifyToken();
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('ayursutra_user');
        localStorage.removeItem('ayursutra_token');
      }
    }
    setLoading(false);
  }, []);

  const verifyToken = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem('ayursutra_user', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      // First try backend API
      const response = await authAPI.login(credentials);
      if (response.data.success) {
        const { user: userData, token } = response.data.data;
        setUser(userData);
        localStorage.setItem('ayursutra_user', JSON.stringify(userData));
        localStorage.setItem('ayursutra_token', token);
        return { success: true, user: userData };
      }
    } catch (error) {
      console.error('Backend login error:', error);
      
      // Fallback to demo users if backend is not available
      const { email, password } = credentials;
      const userData = DEMO_USERS[email.toLowerCase()];
      
      if (userData) {
        console.log('Using demo account fallback');
        setUser(userData);
        localStorage.setItem('ayursutra_user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      
      // If neither backend nor demo account works
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials or try a demo account.';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.data.success) {
        const { user: newUser, token } = response.data.data;
        setUser(newUser);
        localStorage.setItem('ayursutra_user', JSON.stringify(newUser));
        localStorage.setItem('ayursutra_token', token);
        return { success: true, user: newUser };
      }
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('ayursutra_user');
      localStorage.removeItem('ayursutra_token');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isDoctor: user?.role === 'doctor',
    isTherapist: user?.role === 'therapist',
    isPatient: user?.role === 'patient'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
