import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--gray-800)',
      color: 'white',
      padding: '3rem 0 1rem',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}>
                A
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                  AyurSutra
                </h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>
                  Panchakarma Management
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: 1.6 }}>
              Complete Panchakarma Patient Management & Therapy Scheduling Software for modern Ayurvedic practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/login" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
                  Login
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/register" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
                  Register
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#learn-more" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
                  About Panchakarma
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Contact Us
            </h4>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              <p style={{ marginBottom: '0.5rem' }}>📧 support@ayursutra.com</p>
              <p style={{ marginBottom: '0.5rem' }}>📞 +91 98765 43210</p>
              <p style={{ marginBottom: '0.5rem' }}>📍 Ayurvedic Wellness Center</p>
              <p style={{ marginBottom: '0.5rem' }}>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>
            © 2025 AyurSutra. All rights reserved. | Built with ❤️ for Ayurvedic wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
