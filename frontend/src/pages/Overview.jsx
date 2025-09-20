import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Overview of Panchakarma
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Comprehensive Guide to Ancient Ayurvedic Detoxification and Rejuvenation
          </p>
          <div style={{ fontSize: '4rem', marginTop: '2rem' }}>
            🧘‍♀️
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--ayur-600)' }}>
                What is Panchakarma?
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-700)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Panchakarma, literally meaning "five actions" in Sanskrit, is the cornerstone of Ayurvedic medicine. 
                It represents a comprehensive system of purification and rejuvenation therapies designed to eliminate 
                toxins from the body, restore natural balance, and promote optimal health.
              </p>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-700)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                This ancient practice, dating back over 5,000 years, combines therapeutic procedures with personalized 
                lifestyle recommendations to address the root causes of illness rather than just treating symptoms.
              </p>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--ayur-50)',
                borderRadius: '1rem',
                border: '1px solid var(--ayur-200)'
              }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--ayur-700)' }}>
                  Key Benefits
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>✓ Deep detoxification and cleansing</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>✓ Stress reduction and mental clarity</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>✓ Enhanced immunity and vitality</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>✓ Improved digestion and metabolism</li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '400px',
                height: '300px',
                background: 'linear-gradient(135deg, var(--ayur-100), var(--primary-100))',
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '6rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}>
                🌿
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Actions Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--gray-50)' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              The Five Actions of Panchakarma
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>
              Each of the five therapeutic procedures targets specific doshas and body systems
            </p>
          </div>

          <div className="grid grid-cols-1" style={{ gap: '2rem', marginTop: '3rem' }}>
            {/* Vamana */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--ayur-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  🤮
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--ayur-600)' }}>
                    1. Vamana (Therapeutic Vomiting)
                  </h3>
                  <p style={{ color: 'var(--gray-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    A controlled emesis therapy that eliminates excess Kapha dosha from the upper respiratory tract, 
                    stomach, and chest. Effective for treating asthma, allergies, and digestive disorders.
                  </p>
                </div>
              </div>
            </div>

            {/* Virechana */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--primary-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  💊
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-600)' }}>
                    2. Virechana (Purgation Therapy)
                  </h3>
                  <p style={{ color: 'var(--gray-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Medicated purgation that cleanses the small intestine, liver, and gallbladder. Particularly 
                    effective for Pitta-related disorders, skin conditions, and metabolic imbalances.
                  </p>
                </div>
              </div>
            </div>

            {/* Basti */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  💉
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#d97706' }}>
                    3. Basti (Medicated Enemas)
                  </h3>
                  <p style={{ color: 'var(--gray-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Considered the most important of all Panchakarma procedures. Uses medicated oils and decoctions 
                    to cleanse the colon and balance Vata dosha, treating neurological and musculoskeletal disorders.
                  </p>
                </div>
              </div>
            </div>

            {/* Nasya */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--success-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  👃
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--success-600)' }}>
                    4. Nasya (Nasal Administration)
                  </h3>
                  <p style={{ color: 'var(--gray-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Administration of medicated oils through the nasal passages to cleanse the head, neck, and 
                    respiratory system. Effective for sinusitis, headaches, and mental clarity.
                  </p>
                </div>
              </div>
            </div>

            {/* Raktamokshana */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--error-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  🩸
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--error-600)' }}>
                    5. Raktamokshana (Bloodletting)
                  </h3>
                  <p style={{ color: 'var(--gray-700)', fontSize: '1rem', lineHeight: '1.6' }}>
                    Controlled removal of small amounts of blood to purify the circulatory system. Used for 
                    skin disorders, localized inflammation, and blood-related conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              The Panchakarma Process
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              A systematic approach to detoxification and rejuvenation
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem', marginTop: '3rem' }}>
            {/* Purva Karma */}
            <div className="card text-center" style={{ padding: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--ayur-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem'
              }}>
                🔄
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--ayur-600)' }}>
                Purva Karma (Preparation)
              </h3>
              <p style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Preparatory treatments including Snehana (oleation) and Swedana (sudation) to prepare the body 
                for main procedures by loosening toxins.
              </p>
            </div>

            {/* Pradhana Karma */}
            <div className="card text-center" style={{ padding: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem'
              }}>
                ⚡
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary-600)' }}>
                Pradhana Karma (Main Treatment)
              </h3>
              <p style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                The five main purification procedures (Panchakarma) are performed based on individual constitution 
                and health conditions.
              </p>
            </div>

            {/* Paschat Karma */}
            <div className="card text-center" style={{ padding: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#fef3c7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem'
              }}>
                🌱
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#d97706' }}>
                Paschat Karma (Post-Treatment)
              </h3>
              <p style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Rejuvenation phase with specific diet, lifestyle guidelines, and Rasayana (rejuvenative) therapies 
                to restore strength and vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Applications Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--gray-50)' }}>
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '350px',
                height: '250px',
                background: 'linear-gradient(135deg, var(--primary-100), var(--ayur-100))',
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '5rem',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
              }}>
                🏥
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--primary-600)' }}>
                Modern Applications
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-700)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                Today's Panchakarma treatments are adapted for modern lifestyles while maintaining traditional 
                principles. Our management system helps healthcare providers deliver personalized treatments 
                with precision and care.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--gray-800)' }}>
                  Contemporary Benefits:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--primary-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Stress management and mental wellness</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--primary-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Chronic disease management</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--primary-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Preventive healthcare and wellness</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--primary-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Anti-aging and rejuvenation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Experience Authentic Panchakarma
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Begin your journey to optimal health with our comprehensive Panchakarma management system
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              Start Your Journey
            </Link>
            <Link to="/" className="btn" style={{
              padding: '1rem 2rem',
              backgroundColor: 'var(--gray-100)',
              color: 'var(--gray-700)',
              textDecoration: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: '2px solid var(--gray-300)',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'var(--gray-200)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'var(--gray-100)';
              e.target.style.transform = 'translateY(0)';
            }}>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
