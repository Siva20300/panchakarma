import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'doctor': return '/doctor-dashboard';
      case 'therapist': return '/therapist-dashboard';
      case 'patient': return '/patient-dashboard';
      default: return '/';
    }
  };

  return (
    <nav style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--gray-200)'
    }}>
      <div className="container">
        <div className="flex justify-between items-center" style={{ padding: '1.25rem 0' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="flex items-center" style={{ gap: '0.875rem' }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.375rem',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)'
              }}>
                A
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '1.625rem', 
                  fontWeight: '700', 
                  color: 'var(--gray-900)',
                  margin: 0,
                  letterSpacing: '-0.025em'
                }}>
                  AyurSutra
                </h1>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--gray-500)',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Panchakarma Management
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center" style={{ 
            display: window.innerWidth > 768 ? 'flex' : 'none',
            gap: '3rem'
          }}>
            {/* Navigation Links */}
            <div className="flex items-center" style={{ gap: '2rem' }}>
              <Link 
                to="/" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Home
              </Link>
              <a 
                href="#about" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                About Us
              </a>
              <a 
                href="#contact" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Contact Us
              </a>
              <a 
                href="#blogs" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Blogs
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center" style={{ gap: '1rem' }}>
              {isAuthenticated ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    style={{
                      padding: '0.625rem 1.25rem',
                      backgroundColor: 'var(--gray-100)',
                      color: 'var(--gray-700)',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease',
                      border: '1px solid var(--gray-300)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'var(--gray-200)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'var(--gray-100)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Dashboard
                  </Link>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    paddingLeft: '1rem',
                    borderLeft: '1px solid var(--gray-300)'
                  }}>
                    <span style={{ 
                      color: 'var(--gray-600)', 
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Welcome, {user.name}
                    </span>
                    <button 
                      onClick={handleLogout}
                      style={{
                        padding: '0.625rem 1.25rem',
                        background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    style={{
                      padding: '0.625rem 1.25rem',
                      backgroundColor: 'var(--gray-100)',
                      color: 'var(--gray-700)',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease',
                      border: '1px solid var(--gray-300)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'var(--gray-200)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'var(--gray-100)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease',
                      border: 'none'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: window.innerWidth <= 768 ? 'block' : 'none',
              padding: '0.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '24px', height: '3px', backgroundColor: 'var(--gray-600)', margin: '3px 0' }}></div>
            <div style={{ width: '24px', height: '3px', backgroundColor: 'var(--gray-600)', margin: '3px 0' }}></div>
            <div style={{ width: '24px', height: '3px', backgroundColor: 'var(--gray-600)', margin: '3px 0' }}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{ 
            padding: '1.5rem 0',
            borderTop: '1px solid var(--gray-200)',
            backgroundColor: 'var(--gray-50)',
            margin: '0 -1rem',
            paddingLeft: '1rem',
            paddingRight: '1rem'
          }}>
            {/* Mobile Navigation Links */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Link 
                to="/" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  transition: 'all 0.15s ease',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🏠 Home
              </Link>
              <a 
                href="#about" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  transition: 'all 0.15s ease',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                👥 About Us
              </a>
              <a 
                href="#contact" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  transition: 'all 0.15s ease',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📞 Contact Us
              </a>
              <a 
                href="#blogs" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  transition: 'all 0.15s ease',
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = 'var(--ayur-600)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📝 Blogs
              </a>
            </div>

            <div style={{ 
              height: '1px', 
              backgroundColor: 'var(--gray-300)', 
              margin: '1rem 0' 
            }}></div>

            {/* Auth Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {isAuthenticated ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    style={{
                      padding: '0.875rem 1.25rem',
                      backgroundColor: 'var(--gray-100)',
                      color: 'var(--gray-700)',
                      textDecoration: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                      border: '1px solid var(--gray-300)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    📊 Dashboard
                  </Link>
                  <div style={{ 
                    padding: '0.75rem 1.25rem',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid var(--gray-200)'
                  }}>
                    <span style={{ 
                      color: 'var(--gray-600)', 
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Welcome, {user.name}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    style={{
                      padding: '0.875rem 1.25rem',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    style={{
                      padding: '0.875rem 1.25rem',
                      backgroundColor: 'var(--gray-100)',
                      color: 'var(--gray-700)',
                      textDecoration: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                      border: '1px solid var(--gray-300)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    🔐 Login
                  </Link>
                  <Link 
                    to="/register"
                    style={{
                      padding: '0.875rem 1.25rem',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    📝 Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
