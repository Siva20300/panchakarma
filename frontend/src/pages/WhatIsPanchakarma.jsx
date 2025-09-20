import React from 'react';
import { Link } from 'react-router-dom';

const WhatIsPanchakarma = () => {
  const fiveActions = [
    {
      name: "Vamana",
      sanskrit: "वमन",
      description: "Therapeutic vomiting to eliminate excess Kapha dosha",
      benefits: ["Removes toxins from upper respiratory tract", "Treats asthma and allergies", "Improves digestion", "Reduces excess mucus"],
      icon: "🌊",
      color: "var(--primary-600)"
    },
    {
      name: "Virechana", 
      sanskrit: "विरेचन",
      description: "Purgation therapy to cleanse the small intestine and liver",
      benefits: ["Eliminates Pitta toxins", "Treats skin disorders", "Improves liver function", "Balances metabolism"],
      icon: "🔥",
      color: "var(--warning-600)"
    },
    {
      name: "Basti",
      sanskrit: "बस्ति", 
      description: "Medicated enemas to balance Vata dosha",
      benefits: ["Treats nervous system disorders", "Improves joint health", "Enhances immunity", "Balances hormones"],
      icon: "💧",
      color: "var(--success-600)"
    },
    {
      name: "Nasya",
      sanskrit: "नस्य",
      description: "Nasal administration of medicated oils and herbs",
      benefits: ["Clears sinuses", "Improves mental clarity", "Treats headaches", "Enhances sensory functions"],
      icon: "🌬️",
      color: "var(--ayur-600)"
    },
    {
      name: "Raktamokshana",
      sanskrit: "रक्तमोक्षण", 
      description: "Blood purification therapy (rarely used in modern practice)",
      benefits: ["Purifies blood", "Treats skin conditions", "Reduces inflammation", "Improves circulation"],
      icon: "🩸",
      color: "#dc2626"
    }
  ];

  const phases = [
    {
      phase: "Purva Karma",
      sanskrit: "पूर्व कर्म",
      title: "Preparatory Phase",
      duration: "3-7 days",
      description: "Preparation of the body for the main detoxification process",
      procedures: ["Abhyanga (Oil Massage)", "Swedana (Steam Therapy)", "Dietary Modifications", "Lifestyle Adjustments"],
      icon: "🛠️",
      color: "var(--primary-600)"
    },
    {
      phase: "Pradhana Karma", 
      sanskrit: "प्रधान कर्म",
      title: "Main Treatment Phase",
      duration: "5-15 days",
      description: "The core detoxification procedures (Panchakarma)",
      procedures: ["Vamana", "Virechana", "Basti", "Nasya", "Raktamokshana"],
      icon: "⚡",
      color: "var(--warning-600)"
    },
    {
      phase: "Paschat Karma",
      sanskrit: "पश्चात् कर्म", 
      title: "Post-Treatment Phase",
      duration: "7-14 days",
      description: "Rejuvenation and restoration of normal body functions",
      procedures: ["Samsarjana Krama (Gradual Diet)", "Rasayana Therapy", "Lifestyle Counseling", "Follow-up Care"],
      icon: "🌱",
      color: "var(--success-600)"
    }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '4rem 0 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, var(--ayur-600) 0%, var(--primary-600) 100%)',
        color: 'white'
      }}>
        <div className="container">
          <div style={{
            fontSize: '6rem',
            marginBottom: '2rem',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            🧘‍♂️
          </div>
          
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            What is Panchakarma?
          </h1>
          
          <p style={{ 
            fontSize: '1.5rem', 
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.7',
            opacity: 0.95
          }}>
            Discover the ancient Ayurvedic science of detoxification and rejuvenation 
            that has been healing humanity for over 5,000 years
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '2rem',
              color: 'var(--gray-900)'
            }}>
              The Science of Five Actions
            </h2>
            <div style={{ 
              fontSize: '1.25rem', 
              color: 'var(--gray-700)', 
              lineHeight: '1.8',
              marginBottom: '3rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong>Panchakarma</strong> (Sanskrit: पञ्चकर्म) literally means "five actions" or "five treatments." 
                It is the cornerstone of Ayurvedic medicine, representing the most comprehensive and systematic 
                approach to detoxification and rejuvenation known to humanity.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                This ancient healing system works by eliminating accumulated toxins (ama) from the body, 
                balancing the three doshas (Vata, Pitta, Kapha), and restoring the natural harmony 
                between mind, body, and spirit.
              </p>
              <p>
                Unlike modern detox programs that focus only on physical cleansing, Panchakarma addresses 
                the root causes of disease at cellular, emotional, and spiritual levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Actions */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--gray-900)'
          }}>
            The Five Sacred Actions
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {fiveActions.map((action, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: `2px solid ${action.color}20`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `${action.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${action.color}20`;
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{action.icon}</div>
                  <h3 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 'bold', 
                    color: action.color,
                    marginBottom: '0.5rem'
                  }}>
                    {action.name}
                  </h3>
                  <p style={{ 
                    fontSize: '1.25rem', 
                    color: 'var(--gray-600)',
                    fontStyle: 'italic'
                  }}>
                    {action.sanskrit}
                  </p>
                </div>
                
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: 'var(--gray-700)', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {action.description}
                </p>
                
                <div>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: 'var(--gray-800)',
                    marginBottom: '0.75rem'
                  }}>
                    Key Benefits:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {action.benefits.map((benefit, idx) => (
                      <li key={idx} style={{ 
                        fontSize: '0.95rem', 
                        color: 'var(--gray-700)',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{ color: action.color, fontSize: '1.2rem' }}>✓</span>
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

      {/* Three Phases */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--gray-900)'
          }}>
            The Three Phases of Panchakarma
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem' 
          }}>
            {phases.map((phase, index) => (
              <div 
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${phase.color}10, ${phase.color}05)`,
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  border: `2px solid ${phase.color}30`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{phase.icon}</div>
                  <h3 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 'bold', 
                    color: phase.color,
                    marginBottom: '0.5rem'
                  }}>
                    {phase.title}
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    color: 'var(--gray-600)',
                    fontStyle: 'italic',
                    marginBottom: '0.5rem'
                  }}>
                    {phase.phase} ({phase.sanskrit})
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 1rem',
                    background: phase.color,
                    color: 'white',
                    borderRadius: '1rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Duration: {phase.duration}
                  </span>
                </div>
                
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: 'var(--gray-700)', 
                  marginBottom: '2rem',
                  lineHeight: '1.6',
                  textAlign: 'center'
                }}>
                  {phase.description}
                </p>
                
                <div>
                  <h4 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: '600', 
                    color: 'var(--gray-800)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    Key Procedures:
                  </h4>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {phase.procedures.map((procedure, idx) => (
                      <div key={idx} style={{ 
                        padding: '0.75rem 1rem',
                        background: 'white',
                        borderRadius: '0.75rem',
                        border: `1px solid ${phase.color}20`,
                        fontSize: '0.95rem', 
                        color: 'var(--gray-700)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <span style={{ 
                          color: phase.color, 
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}>
                          {idx + 1}
                        </span>
                        {procedure}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: '3rem',
              color: 'var(--gray-900)'
            }}>
              Comprehensive Health Benefits
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid var(--primary-200)'
              }}>
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🧠</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary-600)' }}>
                  Mental & Emotional
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Reduces stress and anxiety</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Improves mental clarity</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Enhances emotional stability</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Promotes better sleep</li>
                </ul>
              </div>
              
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid var(--success-200)'
              }}>
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>💪</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--success-600)' }}>
                  Physical Health
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Detoxifies at cellular level</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Boosts immune system</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Improves digestion</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Increases energy levels</li>
                </ul>
              </div>
              
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid var(--warning-200)'
              }}>
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>🌟</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--warning-600)' }}>
                  Spiritual Growth
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Deepens self-awareness</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Enhances meditation practice</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Connects mind-body-spirit</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Promotes inner peace</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem',
            background: 'linear-gradient(135deg, var(--ayur-50), var(--primary-50))',
            borderRadius: '2rem',
            border: '1px solid var(--ayur-200)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🙏</div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: 'var(--gray-900)'
            }}>
              Begin Your Healing Journey
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--gray-600)',
              marginBottom: '2.5rem',
              lineHeight: '1.6'
            }}>
              Experience the transformative power of authentic Panchakarma under the guidance 
              of experienced Ayurvedic practitioners. Your path to optimal health starts here.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                <span>🌿</span>
                Start Your Treatment
              </Link>
              <Link to="/contact-us" style={{
                padding: '1rem 2rem',
                backgroundColor: 'var(--gray-100)',
                color: 'var(--gray-700)',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: '2px solid var(--gray-300)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--gray-200)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--gray-100)';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span>💬</span>
                Consult Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatIsPanchakarma;
