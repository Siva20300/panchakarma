import React from 'react';

const Location = () => {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '100vh', background: '#f8fafc' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#1f2937' }}>Our Location</h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📍</div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#4f46e5' }}>AyurSutra Wellness Center</h2>
        
        <div style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
          <p>📍 123 Wellness Street, Health District</p>
          <p>🏙️ Mumbai, Maharashtra - 400001</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@ayursutra.com</p>
          <p>🕒 Mon-Sat: 8:00 AM - 8:00 PM</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Get Directions
          </button>
          <button style={{
            padding: '1rem 2rem',
            background: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
