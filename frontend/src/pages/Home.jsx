import React from 'react';
import { Link } from 'react-router-dom';
import NearbyPanchakarmaHospitals from '../components/NearbyPanchakarmaHospitals';

const Home = () => {
  return (
    <div>
      <style>
        {`
          /* MOBILE FIRST RESPONSIVE STYLES */
          .hero-section-responsive {
            padding: 2rem 0 !important;
            text-align: center !important;
          }
          
          .hero-flex-container {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1.5rem !important;
          }
          
          .hero-logo {
            width: 80px !important;
            height: 80px !important;
          }
          
          .hero-title {
            font-size: 2.25rem !important;
            line-height: 1.1 !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
          }
          
          .features-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .feature-card {
            padding: 1.5rem !important;
            text-align: center !important;
          }
          
          /* TABLET STYLES */
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            .container {
              max-width: 100% !important;
              margin: 0 auto !important;
              padding: 0 2rem !important;
            }
            
            .hero-section-responsive {
              padding: 3rem 0 !important;
              text-align: center !important;
            }
            
            .hero-flex-container {
              flex-direction: row !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 2rem !important;
              max-width: 100% !important;
            }
            
            .hero-logo {
              width: 100px !important;
              height: 100px !important;
            }
            
            .hero-title {
              font-size: 3rem !important;
              text-align: left !important;
            }
            
            .hero-subtitle {
              font-size: 1.25rem !important;
              text-align: left !important;
            }
            
            .features-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 2rem !important;
              max-width: 100% !important;
            }
            
            section {
              width: 100% !important;
              overflow-x: hidden !important;
            }
          }
          
          /* DESKTOP STYLES */
          @media screen and (min-width: 1025px) {
            .hero-section-responsive {
              padding: 4rem 0 !important;
            }
            
            .hero-logo {
              width: 120px !important;
              height: 120px !important;
            }
            
            .hero-title {
              font-size: 4rem !important;
            }
            
            .features-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
        `}
      </style>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }} className="hero-section-responsive">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div className="hero-flex-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                className="hero-logo"
                src="/ayursutra-logo.png" 
                alt="AyurSutra Logo" 
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain"
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <h1 className="hero-title" style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
                  AYURSUTRA
                </h1>
                <p className="hero-subtitle" style={{ fontSize: '1.5rem', marginBottom: '0', opacity: 0.9, color: 'white' }}>
                  PANCHAKARMA SOFTWARE
                </p>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, textAlign: 'center' }}>
            Advanced Patient Management & Therapy Scheduling System
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }} id="learn-more">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Panchakarma Management
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              Streamline your Ayurvedic practice with our all-in-one management system
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <Link 
              to="/doctor-dashboard"
              style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                const icon = e.currentTarget.querySelector('.icon-circle');
                if (icon) {
                  icon.style.backgroundColor = 'var(--primary-200)';
                  icon.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                const icon = e.currentTarget.querySelector('.icon-circle');
                if (icon) {
                  icon.style.backgroundColor = 'var(--primary-100)';
                  icon.style.transform = 'scale(1)';
                }
              }}
            >
              <div >
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'var(--primary-100)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  👨‍⚕️
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Doctor Dashboard
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Manage patients, assign therapists, track progress, and send notifications
                </p>
              </div>
            </Link>

            <Link 
              to="/therapist-dashboard"
              className="card text-center"
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                const icon = e.currentTarget.querySelector('.icon-circle');
                if (icon) {
                  icon.style.backgroundColor = 'var(--ayur-200)';
                  icon.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                const icon = e.currentTarget.querySelector('.icon-circle');
                if (icon) {
                  icon.style.backgroundColor = 'var(--ayur-100)';
                  icon.style.transform = 'scale(1)';
                }
              }}
            >
              <div >
                <div 
                  className="icon-circle"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'var(--ayur-100)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  👩‍⚕️
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Therapist Portal
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  View assigned patients, update session status, and provide feedback
                </p>
              </div>
            </Link>

            <Link 
              to="/patient-dashboard"
              className="card text-center"
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                const icon = e.currentTarget.querySelector('.icon-circle');
                if (icon) {
                  icon.style.backgroundColor = '#fde68a';
                  icon.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                const icon = e.currentTarget.querySelector('.icon-circle');
                if (icon) {
                  icon.style.backgroundColor = '#fef3c7';
                  icon.style.transform = 'scale(1)';
                }
              }}
            >
              <div >
                <div 
                  className="icon-circle"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  👤
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Patient Experience
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Book appointments, track progress, receive notifications, and provide feedback
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Panchakarma Section */}
      <section style={{ backgroundColor: 'var(--gray-100)', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                About Panchakarma
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Panchakarma is a cornerstone of Ayurvedic medicine, consisting of five therapeutic procedures 
                designed to cleanse and rejuvenate the body, mind, and spirit.
              </p>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>The Five Procedures:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Vamana (Therapeutic Vomiting)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Virechana (Purgation)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Basti (Medicated Enemas)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Nasya (Nasal Administration)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Raktamokshana (Bloodletting)</li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '300px',
                height: '200px',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '4rem'
              }}>
                🧘‍♀️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              About AyurSutra
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>
              Revolutionizing Ayurvedic healthcare management with cutting-edge technology
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', alignItems: 'center', marginTop: '3rem' }}>
            <div>
              <Link 
                to="/mission-vision"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'block',
                  padding: '1rem',
                  borderRadius: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'var(--ayur-50)';
                  e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--ayur-600)' }}>
                  Our Mission
                </h3>
                <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                  To bridge the gap between traditional Ayurvedic wisdom and modern healthcare management, 
                  making Panchakarma treatments more accessible, organized, and effective for practitioners and patients alike.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--ayur-600)',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Learn More →
                </div>
              </Link>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--gray-800)' }}>
                  Why Choose AyurSutra?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link 
                    to="/overview"
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      transition: 'all 0.2s ease',
                      marginBottom: '0.5rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'var(--primary-50)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Comprehensive patient management system</span>
                  </Link>
                  <Link 
                    to="/therapies"
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      transition: 'all 0.2s ease',
                      marginBottom: '0.5rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'var(--primary-50)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Automated scheduling and notifications</span>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem' }}>
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Role-based access for doctors, therapists, and patients</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem' }}>
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Progress tracking and feedback system</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Link 
                to="/what-is-panchakarma"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  const card = e.target.querySelector('.hover-card');
                  if (card) {
                    card.style.transform = 'scale(1.05)';
                    card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseOut={(e) => {
                  const card = e.target.querySelector('.hover-card');
                  if (card) {
                    card.style.transform = 'scale(1)';
                    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <div className="hover-card" style={{
                  width: '350px',
                  height: '250px',
                  background: 'linear-gradient(135deg, var(--ayur-100), var(--primary-100))',
                  borderRadius: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: '4rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  🏥
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)', fontStyle: 'italic' }}>
                  Modern Healthcare Management
                </p>
                <div style={{
                  marginTop: '0.5rem',
                  color: 'var(--ayur-600)',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Learn About Panchakarma →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Panchakarma Hospitals Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Find Nearby Panchakarma Centers
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              Discover authentic Panchakarma hospitals and Ayurvedic centers in your area
            </p>
          </div>
          <NearbyPanchakarmaHospitals />
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', alignItems: 'start' }}>
            {/* Contact Form */}
            <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Send us a Message</h3>
              </div>
              <div >
                <form>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--gray-700)' }}>Full Name</label>
                    <input type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} placeholder="Your full name" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--gray-700)' }}>Email Address</label>
                    <input type="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} placeholder="your.email@example.com" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--gray-700)' }}>Subject</label>
                    <input type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} placeholder="How can we help?" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--gray-700)' }}>Message</label>
                    <textarea style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }} rows="4" placeholder="Tell us more about your inquiry..."></textarea>
                  </div>
                  <button type="submit" style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', width: '100%' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ paddingLeft: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--ayur-600)' }}>
                Contact Information
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--ayur-100)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    📧
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Email</h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>support@ayursutra.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--primary-100)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    📞
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Phone</h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>+91 98765 43210</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    📍
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Address</h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>
                      Ayurvedic Wellness Center<br/>
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, var(--ayur-50), var(--primary-50))',
                borderRadius: '1rem',
                border: '1px solid var(--ayur-200)'
              }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--ayur-700)' }}>
                  Business Hours
                </h4>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                  <p style={{ margin: '0.25rem 0' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p style={{ margin: '0.25rem 0' }}>Saturday: 9:00 AM - 4:00 PM</p>
                  <p style={{ margin: '0.25rem 0' }}>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to Transform Your Practice?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Join AyurSutra today and experience the future of Panchakarma management
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/register" style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))', color: 'white', textDecoration: 'none', borderRadius: '0.5rem', fontWeight: '500', display: 'inline-block', padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Start Free Trial
            </Link>
            <Link to="/login" style={{ background: 'white', color: 'var(--gray-700)', textDecoration: 'none', borderRadius: '0.5rem', fontWeight: '500', border: '1px solid #d1d5db', display: 'inline-block', padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
