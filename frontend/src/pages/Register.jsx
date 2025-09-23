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
    specialization: '',
    experience: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare registration data
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone
      };

      // Add role-specific fields
      if (formData.role === 'doctor' || formData.role === 'therapist') {
        registrationData.specialization = formData.specialization || 'General Practice';
        registrationData.experience = formData.experience || '1 year';
      } else if (formData.role === 'patient') {
        registrationData.age = parseInt(formData.age) || 25;
      }

      const result = await register(registrationData);

      if (result.success) {
        // Redirect based on role
        switch (result.user.role) {
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
        setError(result.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
    }

    setIsLoading(false);
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
      <style>
        {`
          /* ===== REGISTER PAGE RESPONSIVE STYLES ===== */
          
          /* DESKTOP (Default) */
          .register-container {
            padding: 2rem;
            min-height: 100vh;
          }
          
          .register-card {
            width: 100%;
            max-width: 700px;
            height: 90vh;
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          
          .register-form-container {
            padding: 2rem;
            overflow-y: auto;
          }
          
          /* TABLET (768px - 1024px) */
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            .register-container {
              padding: 1.5rem;
            }
            
            .register-card {
              max-width: 600px;
              height: 95vh;
            }
            
            .register-form-container {
              padding: 1.5rem;
            }
            
            .register-form-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
          }
          
          /* MOBILE (0px - 767px) */
          @media screen and (max-width: 767px) {
            .register-container {
              padding: 1rem !important;
              align-items: flex-start !important;
              padding-top: 2rem !important;
            }
            
            .register-card {
              max-width: 100% !important;
              width: 100% !important;
              height: auto !important;
              min-height: calc(100vh - 4rem) !important;
              border-radius: 0.75rem !important;
              margin: 0 !important;
            }
            
            .register-form-container {
              padding: 1.5rem !important;
              overflow-y: visible !important;
            }
            
            .register-header {
              text-align: center !important;
              margin-bottom: 1.5rem !important;
            }
            
            .register-title {
              font-size: 1.75rem !important;
            }
            
            .register-subtitle {
              font-size: 0.9rem !important;
            }
            
            .register-form-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .register-input {
              padding: 1rem !important;
              font-size: 1rem !important;
              margin-bottom: 0.5rem !important;
            }
            
            .register-select {
              padding: 1rem !important;
              font-size: 1rem !important;
            }
            
            .register-button {
              padding: 1rem !important;
              font-size: 1rem !important;
              margin-top: 1rem !important;
            }
            
            .register-links {
              text-align: center !important;
              font-size: 0.9rem !important;
              margin-top: 1rem !important;
            }
          }
          
          /* SMALL MOBILE (320px - 480px) */
          @media screen and (max-width: 480px) {
            .register-container {
              padding: 0.5rem !important;
              padding-top: 1rem !important;
            }
            
            .register-card {
              border-radius: 0.5rem !important;
              min-height: calc(100vh - 2rem) !important;
            }
            
            .register-form-container {
              padding: 1rem !important;
            }
            
            .register-title {
              font-size: 1.5rem !important;
            }
            
            .register-input,
            .register-select,
            .register-button {
              padding: 0.875rem !important;
            }
          }
        `}
      </style>
      
      <div className="register-card" style={{ 
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
        <div className="register-header" style={{
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
          <h2 className="register-title" style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', margin: 0 }}>
            Join AyurSutra
          </h2>
          <p className="register-subtitle" style={{ color: 'var(--gray-600)', fontSize: '1.125rem', margin: 0 }}>
            Create your account to get started
          </p>
        </div>
        
        {/* Scrollable Content */}
        <div className="register-form-container" style={{
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  style={{ paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#6b7280',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#4f46e5'}
                  onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  style={{ paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#6b7280',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#4f46e5'}
                  onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
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
