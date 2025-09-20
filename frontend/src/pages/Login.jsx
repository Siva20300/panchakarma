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
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)'
    }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #64748b, #475569)',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
              fontWeight: 'bold',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              🧘‍♀️
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', margin: 0 }}>
              Welcome Back
            </h2>
            <p style={{ fontSize: '1.125rem', opacity: 0.85, margin: 0 }}>
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
          
          <div style={{ padding: '3rem 2.5rem' }}>
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                padding: '1rem',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                border: '1px solid #fecaca',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '0.5rem'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #cbd5e1',
                    borderRadius: '0.75rem',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                    color: '#334155'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#64748b';
                    e.target.style.backgroundColor = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '0.5rem'
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
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #cbd5e1',
                    borderRadius: '0.75rem',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                    color: '#334155'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#64748b';
                    e.target.style.backgroundColor = 'white';
                    e.target.style.boxShadow = '0 0 0 3px rgba(100, 116, 139, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cbd5e1';
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #64748b, #475569)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 4px 14px 0 rgba(100, 116, 139, 0.35)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px 0 rgba(100, 116, 139, 0.45)';
                  e.target.style.background = 'linear-gradient(135deg, #475569, #334155)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px 0 rgba(100, 116, 139, 0.35)';
                  e.target.style.background = 'linear-gradient(135deg, #64748b, #475569)';
                }}
              >
                Sign In to AyurSutra 🧘‍♀️
              </button>
            </form>

            <div style={{ 
              marginTop: '2rem', 
              textAlign: 'center',
              padding: '1rem 0',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Don't have an account?
              </p>
              <Link 
                to="/register" 
                style={{ 
                  color: '#64748b', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
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
