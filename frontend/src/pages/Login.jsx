import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dummyUsers } from '../data/dummyData';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Find user in dummy data
    const user = dummyUsers.find(u => u.email === formData.email);
    
    if (user) {
      login(user);
      // Redirect based on role
      switch (user.role) {
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
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f0fff0 0%, #e6ffe6 25%, #d4f5d4 50%, #c8f7c5 75%, #90ee90 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }} className="login-container-responsive">
      <div style={{ 
        width: '100%', 
        maxWidth: '420px',
        animation: 'fadeInUp 0.8s ease-out'
      }} className="login-form-responsive">
        <style>
          {`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .input-focus {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(144, 238, 144, 0.3) !important;
            }
            .button-hover {
              transform: translateY(-3px);
              box-shadow: 0 12px 30px rgba(144, 238, 144, 0.4);
            }
          `}
        </style>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(144, 238, 144, 0.15)',
          border: '1px solid rgba(144, 238, 144, 0.2)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease'
        }}>
          {/* Header Section */}
          <div style={{
            background: 'linear-gradient(135deg, #90ee90, #32cd32, #98fb98)',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            color: 'white',
            position: 'relative'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
              fontWeight: 'bold',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              animation: 'pulse 2s infinite',
              cursor: 'pointer'
            }}>
              🧘
            </div>
            <h2 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '700', 
              marginBottom: '0.5rem', 
              margin: 0,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Welcome Back
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              opacity: 0.9, 
              margin: 0,
              fontWeight: '400'
            }}>
              Sign in to your AyurSutra account
            </p>
            
            {/* Back to Home Link */}
            <div style={{ marginTop: '1.5rem' }}>
              <Link 
                to="/"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.15s ease'
                }}
                onMouseOver={(e) => e.target.style.color = 'white'}
                onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                Back to Home
              </Link>
            </div>
          </div>
          
          {/* Form Content */}
          <div style={{ padding: '2.5rem 2rem' }}>
            {error && (
              <div style={{
                backgroundColor: '#fef7ed',
                color: '#ea580c',
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                border: '1px solid #fed7aa',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                animation: 'fadeInUp 0.5s ease-out'
              }}>
                <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              {/* Email Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#2e7d32',
                  marginBottom: '0.75rem',
                  textAlign: 'left'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    fontSize: '1rem',
                    border: '2px solid #c8e6c9',
                    borderRadius: '16px',
                    backgroundColor: '#f1f8e9',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    color: '#2e7d32',
                    boxShadow: '0 2px 8px rgba(144, 238, 144, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#66bb6a';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.boxShadow = '0 8px 25px rgba(144, 238, 144, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#c8e6c9';
                    e.target.style.backgroundColor = '#f1f8e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(144, 238, 144, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#2e7d32',
                  marginBottom: '0.75rem',
                  textAlign: 'left'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    fontSize: '1rem',
                    border: '2px solid #c8e6c9',
                    borderRadius: '16px',
                    backgroundColor: '#f1f8e9',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    color: '#2e7d32',
                    boxShadow: '0 2px 8px rgba(144, 238, 144, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#66bb6a';
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.boxShadow = '0 8px 25px rgba(144, 238, 144, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#c8e6c9';
                    e.target.style.backgroundColor = '#f1f8e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(144, 238, 144, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '56px',
                  padding: '0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: isLoading 
                    ? 'linear-gradient(135deg, #81c784, #a5d6a7)' 
                    : 'linear-gradient(135deg, #66bb6a, #4caf50)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(144, 238, 144, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                  textTransform: 'none',
                  opacity: isLoading ? 0.8 : 1
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 30px rgba(144, 238, 144, 0.4)';
                    e.target.style.background = 'linear-gradient(135deg, #4caf50, #388e3c)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(144, 238, 144, 0.3)';
                    e.target.style.background = 'linear-gradient(135deg, #66bb6a, #4caf50)';
                  }
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in to AyurSutra 🧘‍♂️'
                )}
              </button>
            </form>

            {/* Register Link */}
            <div style={{ 
              marginTop: '2rem', 
              textAlign: 'center',
              padding: '1.5rem 0 0.5rem',
              borderTop: '1px solid rgba(144, 238, 144, 0.2)'
            }}>
              <p style={{ 
                color: '#8b4513', 
                fontSize: '0.9rem', 
                marginBottom: '0.75rem',
                opacity: 0.8
              }}>
                Don't have an account?
              </p>
              <Link 
                to="/register" 
                style={{ 
                  color: '#66bb6a', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(144, 238, 144, 0.1)';
                  e.target.style.color = '#4caf50';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#66bb6a';
                }}
              >
                Create your account here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

