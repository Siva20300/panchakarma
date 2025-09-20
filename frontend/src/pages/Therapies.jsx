import React from 'react';
import { Link } from 'react-router-dom';

const Therapies = () => {
  const therapies = [
    {
      id: 1,
      name: "Abhyanga",
      icon: "💆‍♀️",
      description: "Full body oil massage with warm herbal oils",
      problems: ["Stress and anxiety", "Joint pain", "Poor circulation", "Insomnia", "Dry skin"],
      benefits: ["Improves blood circulation", "Reduces stress", "Nourishes skin", "Enhances flexibility"],
      duration: "60-90 minutes",
      color: "var(--ayur-600)"
    },
    {
      id: 2,
      name: "Shirodhara",
      icon: "🧘‍♀️",
      description: "Continuous pouring of warm oil on the forehead",
      problems: ["Stress and mental fatigue", "Headaches", "Insomnia", "Anxiety disorders", "Hair problems"],
      benefits: ["Calms nervous system", "Improves sleep quality", "Reduces headaches", "Enhances mental clarity"],
      duration: "45-60 minutes",
      color: "var(--primary-600)"
    },
    {
      id: 3,
      name: "Panchakarma Detox",
      icon: "🌿",
      description: "Complete body detoxification through five therapeutic procedures",
      problems: ["Chronic diseases", "Digestive disorders", "Toxin accumulation", "Metabolic issues"],
      benefits: ["Deep detoxification", "Restores balance", "Boosts immunity", "Rejuvenates body"],
      duration: "7-21 days",
      color: "var(--success-600)"
    },
    {
      id: 4,
      name: "Udvartana",
      icon: "✨",
      description: "Herbal powder massage for weight management",
      problems: ["Obesity", "Cellulite", "Poor metabolism", "Skin disorders", "Lymphatic congestion"],
      benefits: ["Reduces weight", "Improves skin texture", "Enhances metabolism", "Tones muscles"],
      duration: "45-60 minutes",
      color: "#f59e0b"
    },
    {
      id: 5,
      name: "Nasya",
      icon: "👃",
      description: "Nasal administration of medicated oils",
      problems: ["Sinusitis", "Headaches", "Respiratory issues", "Mental disorders", "Hair fall"],
      benefits: ["Clears nasal passages", "Improves breathing", "Enhances mental clarity", "Prevents hair fall"],
      duration: "30-45 minutes",
      color: "#8b5cf6"
    },
    {
      id: 6,
      name: "Kizhi",
      icon: "🌾",
      description: "Herbal poultice massage with warm medicated bundles",
      problems: ["Arthritis", "Joint stiffness", "Muscle pain", "Neurological disorders", "Sports injuries"],
      benefits: ["Reduces inflammation", "Improves joint mobility", "Relieves pain", "Strengthens muscles"],
      duration: "60-75 minutes",
      color: "#10b981"
    },
    {
      id: 7,
      name: "Akshi Tarpana",
      icon: "👁️",
      description: "Eye treatment with medicated ghee",
      problems: ["Eye strain", "Dry eyes", "Vision problems", "Eye infections", "Computer eye syndrome"],
      benefits: ["Improves vision", "Reduces eye strain", "Moisturizes eyes", "Prevents eye disorders"],
      duration: "30-45 minutes",
      color: "#ef4444"
    },
    {
      id: 8,
      name: "Karna Purana",
      icon: "👂",
      description: "Ear treatment with warm medicated oils",
      problems: ["Ear infections", "Hearing problems", "Tinnitus", "Earache", "Wax accumulation"],
      benefits: ["Improves hearing", "Prevents infections", "Reduces tinnitus", "Cleanses ears"],
      duration: "20-30 minutes",
      color: "#06b6d4"
    }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      {/* Hero Section */}
      <section style={{ padding: '4rem 0 2rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            fontSize: '6rem',
            marginBottom: '2rem',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            💆‍♀️
          </div>
          
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ayurvedic Therapies
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--gray-600)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Discover our comprehensive range of authentic Ayurvedic therapies designed to heal, 
            rejuvenate, and restore your natural balance
          </p>
        </div>
      </section>

      {/* Therapies Grid */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {therapies.map((therapy) => (
              <div 
                key={therapy.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.border = `1px solid ${therapy.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                }}
              >
                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '1.5rem' 
                }}>
                  <div style={{
                    fontSize: '3rem',
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${therapy.color}15`,
                    borderRadius: '50%',
                    border: `2px solid ${therapy.color}30`
                  }}>
                    {therapy.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: therapy.color,
                      marginBottom: '0.5rem'
                    }}>
                      {therapy.name}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--gray-600)',
                      margin: 0
                    }}>
                      Duration: {therapy.duration}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--gray-700)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {therapy.description}
                </p>

                {/* Problems Treated */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--gray-800)',
                    marginBottom: '0.75rem'
                  }}>
                    Problems Treated:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {therapy.problems.map((problem, index) => (
                      <span 
                        key={index}
                        style={{
                          fontSize: '0.85rem',
                          padding: '0.25rem 0.75rem',
                          background: `${therapy.color}10`,
                          color: therapy.color,
                          borderRadius: '1rem',
                          border: `1px solid ${therapy.color}20`
                        }}
                      >
                        {problem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--gray-800)',
                    marginBottom: '0.75rem'
                  }}>
                    Key Benefits:
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {therapy.benefits.map((benefit, index) => (
                      <li 
                        key={index}
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--gray-700)',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <span style={{ color: therapy.color, fontSize: '1.2rem' }}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '2rem',
            padding: '3rem',
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🌟</div>
            <h2 style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Start Your Healing Journey
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--gray-600)', 
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Choose the therapy that best suits your needs and begin your path to wellness
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                Book Consultation
              </Link>
              <Link to="/" style={{
                padding: '1rem 2rem',
                backgroundColor: 'var(--gray-100)',
                color: 'var(--gray-700)',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: '2px solid var(--gray-300)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--gray-200)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--gray-100)';
                e.target.style.transform = 'translateY(0)';
              }}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Therapies;
