import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MissionVision = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SimpleCard = ({ children, style = {} }) => (
    <div 
      style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        ...style
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ 
      background: '#f8fafc',
      minHeight: '100vh'
    }}>

      {/* Hero Section */}
      <section style={{ padding: '4rem 0 3rem', textAlign: 'center', background: 'white' }}>
        <div className="container">
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            🎯
          </div>
          
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: '#1f2937'
          }}>
            Our Mission & Vision
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Transforming lives through authentic Ayurvedic wisdom and modern healthcare excellence
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '4rem 0', background: '#f9fafb' }}>
        <div className="container">
          <SimpleCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div style={{
                fontSize: '4rem',
                color: 'var(--ayur-600)'
              }}>
                🚀
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: 'var(--ayur-600)'
                }}>
                  Our Mission
                </h2>
                
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: 'var(--gray-700)', 
                  marginBottom: '2rem', 
                  lineHeight: '1.8'
                }}>
                  To revolutionize healthcare by seamlessly integrating the timeless wisdom of Ayurveda 
                  with cutting-edge technology, making authentic Panchakarma treatments accessible, 
                  personalized, and effective for people worldwide.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { icon: '🌿', text: 'Preserve authentic Ayurvedic practices', link: '/what-is-panchakarma' },
                    { icon: '💡', text: 'Innovate through technology solutions', link: '/overview' },
                    { icon: '🤝', text: 'Make wellness accessible to all', link: '/patient-dashboard' },
                    { icon: '🎯', text: 'Deliver personalized experiences', link: '/therapies' }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '1rem',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = 'none';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--gray-700)' }}>
                        {item.text}
                      </span>
                      <span style={{ marginLeft: 'auto', color: 'var(--ayur-600)', fontSize: '0.9rem' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SimpleCard>
        </div>
      </section>

      {/* Vision Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <SimpleCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexDirection: 'row-reverse' }}>
              <div style={{
                fontSize: '4rem',
                color: '#f59e0b'
              }}>
                🔮
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#f59e0b'
                }}>
                  Our Vision
                </h2>
                
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: 'var(--gray-700)', 
                  marginBottom: '2rem', 
                  lineHeight: '1.8'
                }}>
                  To become the global leader in Ayurvedic healthcare management, creating a world 
                  where every individual has access to personalized, holistic wellness solutions 
                  that harmonize ancient wisdom with modern technology.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {[
                    { icon: '🌍', title: 'Global Reach', desc: 'Worldwide accessibility', link: '/locate-us' },
                    { icon: '🔬', title: 'Scientific Integration', desc: 'Research-backed practices', link: '/blogs' },
                    { icon: '👥', title: 'Community Impact', desc: 'Transforming lives', link: '/patient-stories' },
                    { icon: '🌟', title: 'Excellence Standard', desc: 'Industry benchmarks', link: '/overview' }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(254, 202, 87, 0.1))',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(255, 107, 107, 0.2)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        e.target.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = 'none';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--gray-800)' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                        {item.desc}
                      </p>
                      <div style={{ color: '#ff6b6b', fontSize: '0.85rem', fontWeight: '600' }}>Explore →</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SimpleCard>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '4rem 0', background: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Our Core Values
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The principles that guide our journey
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🙏', title: 'Authenticity', desc: 'True to Ayurvedic principles', color: 'var(--ayur-600)', link: '/what-is-panchakarma' },
              { icon: '💚', title: 'Compassion', desc: 'Caring with empathy', color: 'var(--success-600)', link: '/patient-stories' },
              { icon: '⚖️', title: 'Integrity', desc: 'Highest ethical standards', color: 'var(--primary-600)', link: '/overview' },
              { icon: '🌱', title: 'Sustainability', desc: 'Eco-friendly practices', color: '#10b981', link: '/blogs' },
              { icon: '🎓', title: 'Excellence', desc: 'Continuous improvement', color: '#f59e0b', link: '/doctor-dashboard' },
              { icon: '🤲', title: 'Accessibility', desc: 'Quality care for all', color: '#8b5cf6', link: '/patient-dashboard' }
            ].map((value, index) => (
              <Link
                key={index}
                to={value.link}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  style={{
                    background: 'white',
                    borderRadius: '1rem',
                    padding: '2rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                    {value.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: value.color
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--gray-600)',
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {value.desc}
                  </p>
                  <div style={{
                    color: value.color,
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', textAlign: 'center', background: 'white' }}>
        <div className="container">
          <SimpleCard style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🌟</div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: 'var(--ayur-600)'
            }}>
              Join Our Mission
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--gray-600)', 
              marginBottom: '2.5rem'
            }}>
              Experience the perfect blend of ancient wisdom and modern technology
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/register" style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                Get Started
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
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                Back to Home
              </Link>
            </div>
          </SimpleCard>
        </div>
      </section>

    </div>
  );
};

export default MissionVision;
