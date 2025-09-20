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
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
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
        <div className="flex justify-between items-center" style={{ padding: '0.75rem 0' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="flex items-center" style={{ gap: '0.875rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)'
              }}>
                A
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '1.375rem', 
                  fontWeight: '700', 
                  color: 'var(--gray-900)',
                  margin: 0,
                  letterSpacing: '-0.025em'
                }}>
                  AyurSutra
                </h1>
                <p style={{ 
                  fontSize: '0.7rem', 
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
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              padding: '0.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderRadius: '0.375rem'
            }}
          >
            <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--gray-700)', margin: '4px 0', borderRadius: '1px', transition: 'all 0.3s ease' }}></div>
            <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--gray-700)', margin: '4px 0', borderRadius: '1px', transition: 'all 0.3s ease' }}></div>
            <div style={{ width: '24px', height: '2px', backgroundColor: 'var(--gray-700)', margin: '4px 0', borderRadius: '1px', transition: 'all 0.3s ease' }}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            {/* Mobile Navigation Links */}
            <div>
              <Link 
                to="/" 
                className="nav-link"
                onClick={closeMobileMenu}
                style={{ 
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Home
              </Link>
              <a 
                href="#about" 
                className="nav-link"
                onClick={closeMobileMenu}
                style={{ 
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                About Us
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

            {/* Auth Buttons */}
            <div className="auth-buttons">
              {isAuthenticated ? (
                <>
                  <span className="user-welcome">
                    Welcome, {user.name}
                  </span>
                  <Link 
                    to={getDashboardLink()} 
                    className="btn btn-secondary"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="btn btn-secondary"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="btn btn-primary"
                    onClick={closeMobileMenu}
                  >
                    Register
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
