import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

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

  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsAboutDropdownOpen(false);
    }, 100);
    setDropdownTimeout(timeout);
  };


  return (
    <>
      <style>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }
          @media (min-width: 769px) {
            .desktop-nav {
              display: flex !important;
            }
            .mobile-menu-btn {
              display: none !important;
            }
          }
          
          /* Ensure navigation doesn't wrap */
          .desktop-nav {
            overflow: visible;
            white-space: nowrap;
          }
        `}
      </style>
      <nav style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--gray-200)'
      }}>
      <div className="container">
        <div className="flex items-center" style={{ 
          padding: '1.25rem 0',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Logo */}
          <Link to="/" style={{ 
            textDecoration: 'none',
            flexShrink: 0
          }}>
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
          <div className="flex items-center desktop-nav" style={{ 
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            flexWrap: 'nowrap'
          }}>
            {/* Navigation Links */}
            <div className="flex items-center" style={{ 
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'nowrap'
            }}>
              <Link 
                to="/" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative',
                  whiteSpace: 'nowrap'
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
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={handleDropdownLeave}
              >
                <a 
                  href="#about" 
                  style={{ 
                    color: 'var(--gray-700)', 
                    textDecoration: 'none', 
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    padding: '0.5rem 0',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    whiteSpace: 'nowrap'
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
                
                {/* Dropdown Menu */}
                {isAboutDropdownOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      backgroundColor: 'white',
                      borderRadius: '0.75rem',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                      border: '1px solid var(--gray-200)',
                      minWidth: '220px',
                      zIndex: 100,
                      padding: '0.75rem 0',
                      marginTop: '0.25rem'
                    }}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link 
                      to="/overview"
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.25rem',
                        color: 'var(--gray-700)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'var(--ayur-50)';
                        e.target.style.color = 'var(--ayur-700)';
                        e.target.style.paddingLeft = '1.5rem';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--gray-700)';
                        e.target.style.paddingLeft = '1.25rem';
                      }}
                    >
                      📋 Overview
                    </Link>
                    <Link 
                      to="/mission-vision"
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.25rem',
                        color: 'var(--gray-700)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'var(--ayur-50)';
                        e.target.style.color = 'var(--ayur-700)';
                        e.target.style.paddingLeft = '1.5rem';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--gray-700)';
                        e.target.style.paddingLeft = '1.25rem';
                      }}
                    >
                      🎯 Mission and Vision
                    </Link>
                    <Link 
                      to="/therapies"
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.25rem',
                        color: 'var(--gray-700)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'var(--ayur-50)';
                        e.target.style.color = 'var(--ayur-700)';
                        e.target.style.paddingLeft = '1.5rem';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--gray-700)';
                        e.target.style.paddingLeft = '1.25rem';
                      }}
                    >
                      💆‍♀️ Therapies
                    </Link>
                    <Link 
                      to="/what-is-panchakarma"
                      style={{
                        display: 'block',
                        padding: '0.75rem 1.25rem',
                        color: 'var(--gray-700)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'var(--ayur-50)';
                        e.target.style.color = 'var(--ayur-700)';
                        e.target.style.paddingLeft = '1.5rem';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--gray-700)';
                        e.target.style.paddingLeft = '1.25rem';
                      }}
                    >
                      🧘‍♂️ What is Panchakarma
                    </Link>
                  </div>
                )}
              </div>
              <Link 
                to="/contact-us" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative',
                  whiteSpace: 'nowrap'
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
              </Link>
              <Link 
                to="/blogs" 
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative',
                  whiteSpace: 'nowrap'
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
              </Link>
              {/* Patient Stories Link */}
              <Link 
                to="/patient-stories"
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative',
                  whiteSpace: 'nowrap'
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
                Patient Stories
              </Link>
              {/* Locate Us Link */}
              <Link 
                to="/locate-us"
                style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none', 
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 0',
                  position: 'relative',
                  whiteSpace: 'nowrap'
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
                Locate Us
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center" style={{ gap: '1rem' }}>
              {isAuthenticated ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = '0.9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = '1';
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
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = '0.9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = '1';
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
              display: 'none',
              padding: '0.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
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
              <Link 
                to="/locate-us" 
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
                📍 Locate Us
              </Link>
              <Link 
                to="/blogs" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--ayur-50)';
                  e.target.style.color = 'var(--ayur-700)';
                  e.target.style.boxShadow = '0 2px 4px rgba(34, 197, 94, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📝 Blogs
              </Link>
              <Link 
                to="/patient-stories" 
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
                💬 Patient Stories
              </Link>
              <Link 
                to="/locate-us" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--ayur-50)';
                  e.target.style.color = 'var(--ayur-700)';
                  e.target.style.boxShadow = '0 2px 4px rgba(34, 197, 94, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-700)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📍 Locate Us
              </Link>
              <Link 
                to="/therapy-centers" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem 0.875rem 2rem',
                  color: 'var(--gray-600)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--ayur-50)';
                  e.target.style.color = 'var(--ayur-700)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-600)';
                }}
              >
                🏥 Therapy Centers
              </Link>
              <Link 
                to="/hospitals" 
                style={{ 
                  display: 'block',
                  padding: '0.875rem 1.25rem 0.875rem 2rem',
                  color: 'var(--gray-600)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--ayur-50)';
                  e.target.style.color = 'var(--ayur-700)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--gray-600)';
                }}
              >
                🏨 Hospitals
              </Link>
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
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = '0.9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0)';
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
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = '0.9';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0)';
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
    </>
  );
};

export default Navbar;
