import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MissionVision = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Card3D = ({ children, style = {} }) => (
    <div 
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        padding: '2.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }} />

      {/* Hero Section */}
      <section style={{ padding: '6rem 0 4rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div style={{
            fontSize: '8rem',
            marginBottom: '2rem',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            🎯
          </div>
          
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            color: 'white',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #fff, #f0f8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Mission & Vision
          </h1>
          
          <p style={{ 
            fontSize: '1.5rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            Transforming lives through authentic Ayurvedic wisdom and modern healthcare excellence
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <Card3D>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div style={{
                fontSize: '8rem',
                background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                🚀
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
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
                    { icon: '🌿', text: 'Preserve authentic Ayurvedic practices' },
                    { icon: '💡', text: 'Innovate through technology solutions' },
                    { icon: '🤝', text: 'Make wellness accessible to all' },
                    { icon: '🎯', text: 'Deliver personalized experiences' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
                        borderRadius: '1rem',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--gray-700)' }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* Vision Section */}
      <section style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <Card3D>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexDirection: 'row-reverse' }}>
              <div style={{
                fontSize: '8rem',
                background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                🔮
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  marginBottom: '2rem',
                  background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
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
                    { icon: '🌍', title: 'Global Reach', desc: 'Worldwide accessibility' },
                    { icon: '🔬', title: 'Scientific Integration', desc: 'Research-backed practices' },
                    { icon: '👥', title: 'Community Impact', desc: 'Transforming lives' },
                    { icon: '🌟', title: 'Excellence Standard', desc: 'Industry benchmarks' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(254, 202, 87, 0.1))',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(255, 107, 107, 0.2)',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--gray-800)' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--gray-600)' }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '4rem 0', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
            }}>
              Our Core Values
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The principles that guide our journey
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🙏', title: 'Authenticity', desc: 'True to Ayurvedic principles', color: 'var(--ayur-600)' },
              { icon: '💚', title: 'Compassion', desc: 'Caring with empathy', color: 'var(--success-600)' },
              { icon: '⚖️', title: 'Integrity', desc: 'Highest ethical standards', color: 'var(--primary-600)' },
              { icon: '🌱', title: 'Sustainability', desc: 'Eco-friendly practices', color: '#10b981' },
              { icon: '🎓', title: 'Excellence', desc: 'Continuous improvement', color: '#f59e0b' },
              { icon: '🤲', title: 'Accessibility', desc: 'Quality care for all', color: '#8b5cf6' }
            ].map((value, index) => (
              <Card3D 
                key={index}
                style={{
                  textAlign: 'center'
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
                  lineHeight: '1.6'
                }}>
                  {value.desc}
                </p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <Card3D style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🌟</div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
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
          </Card3D>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default MissionVision;
