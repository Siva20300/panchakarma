import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
    specialization: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      specialization: formData.specialization
    };

    // Auto-login after registration
    login(newUser);

    // Redirect based on role
    switch (formData.role) {
      case 'doctor':
        navigate('/doctor-dashboard');
        break;
      case 'therapist':
        navigate('/therapist-dashboard');
        break;
      case 'patient':
        navigate('/patient-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '700px',
        height: '90vh',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Fixed Header */}
        <div style={{
          padding: '2rem 2.5rem 1.5rem',
          borderBottom: '1px solid var(--gray-200)',
          backgroundColor: 'white',
          textAlign: 'center',
          flexShrink: 0
        }}>
          {/* Back to Home Link */}
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <Link 
              to="/"
              style={{
                color: 'var(--gray-500)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'color 0.15s ease'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--primary-600)'}
              onMouseOut={(e) => e.target.style.color = 'var(--gray-500)'}
            >
              Back to Home
            </Link>
          </div>
          
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'var(--primary-100)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem'
          }}>
            🧘‍♀️
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', margin: 0 }}>
            Join AyurSutra
          </h2>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.125rem', margin: 0 }}>
            Create your account to get started
          </p>
        </div>
        
        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem 2.5rem',
          backgroundColor: 'white'
        }}>
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="patient">Patient</option>
                <option value="therapist">Therapist</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {(formData.role === 'therapist' || formData.role === 'doctor') && (
              <div className="form-group">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  className="form-input"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  placeholder="Enter your specialization"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.875rem',
                background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                marginBottom: '1.5rem'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Create Account
            </button>
          </form>

          <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', margin: 0 }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: 'var(--primary-600)', 
                  fontWeight: '500',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
