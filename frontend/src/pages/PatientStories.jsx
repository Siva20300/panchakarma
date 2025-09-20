import React, { useState } from 'react';

const PatientStories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const patientStories = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      location: 'Mumbai, Maharashtra',
      condition: 'Chronic Back Pain',
      category: 'pain_relief',
      treatment: 'Abhyanga + Kizhi Therapy',
      duration: '21 days',
      image: '👨‍💼',
      story: "After years of chronic back pain from my desk job, I was skeptical about Ayurvedic treatment. But the 21-day Panchakarma program completely transformed my life. The Abhyanga massages and Kizhi therapy not only relieved my pain but also improved my overall energy levels.",
      beforeAfter: {
        before: "Constant back pain (8/10), difficulty sleeping, low energy",
        after: "Pain reduced to 2/10, sleeping peacefully, feeling energetic"
      },
      testimonial: "I can now work long hours without any discomfort. Panchakarma gave me my life back!",
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 38,
      location: 'Bangalore, Karnataka',
      condition: 'Stress & Anxiety',
      category: 'mental_wellness',
      treatment: 'Shirodhara + Meditation',
      duration: '14 days',
      image: '👩‍💻',
      story: "As a software engineer, stress was consuming my life. The Shirodhara therapy was incredibly calming. The warm oil flowing over my forehead created a meditative state I'd never experienced before. Combined with guided meditation sessions, it completely changed my relationship with stress.",
      beforeAfter: {
        before: "High anxiety, insomnia, frequent headaches",
        after: "Calm mind, better sleep, no headaches"
      },
      testimonial: "Shirodhara is pure magic! I feel like a completely different person - calm, focused, and happy.",
      rating: 5
    },
    {
      id: 3,
      name: 'Vikram Singh',
      age: 52,
      location: 'Delhi, NCR',
      condition: 'Digestive Issues',
      category: 'digestive_health',
      treatment: 'Virechana + Basti',
      duration: '28 days',
      image: '👨‍🍳',
      story: "Years of irregular eating habits had ruined my digestion. I was constantly bloated and uncomfortable. The Virechana cleansing therapy was intense but incredibly effective. The Basti treatments that followed helped restore my digestive fire completely.",
      beforeAfter: {
        before: "Chronic bloating, irregular bowel movements, low appetite",
        after: "Perfect digestion, regular bowel movements, healthy appetite"
      },
      testimonial: "My digestion is better than it was 20 years ago! The detox was life-changing.",
      rating: 5
    },
    {
      id: 4,
      name: 'Meera Krishnan',
      age: 29,
      location: 'Chennai, Tamil Nadu',
      condition: 'Migraine & Insomnia',
      category: 'neurological',
      treatment: 'Nasya + Shirodhara',
      duration: '21 days',
      image: '👩‍🎨',
      story: "Migraines were controlling my life. I couldn't work, couldn't enjoy time with family. The Nasya therapy helped clear my sinuses and the Shirodhara sessions were deeply relaxing. After 21 days, my migraines reduced by 90% and I started sleeping peacefully.",
      beforeAfter: {
        before: "Daily migraines, 3-4 hours sleep, constant fatigue",
        after: "Rare mild headaches, 7-8 hours quality sleep, full energy"
      },
      testimonial: "Panchakarma gave me my life back. I can finally pursue my passion for art without pain!",
      rating: 5
    },
    {
      id: 5,
      name: 'Amit Patel',
      age: 41,
      location: 'Ahmedabad, Gujarat',
      condition: 'Joint Pain & Stiffness',
      category: 'pain_relief',
      treatment: 'Pizhichil + Njavarakizhi',
      duration: '21 days',
      image: '👨‍🏭',
      story: "Working in a factory for 20 years had taken a toll on my joints. Morning stiffness was unbearable. The Pizhichil oil bath therapy and Njavarakizhi rice bolus massage worked wonders. The warm treatments penetrated deep into my joints and provided lasting relief.",
      beforeAfter: {
        before: "Severe joint stiffness, difficulty walking, constant pain",
        after: "Flexible joints, easy movement, minimal pain"
      },
      testimonial: "I feel 20 years younger! The joint pain that troubled me for years is almost gone.",
      rating: 5
    },
    {
      id: 6,
      name: 'Sunita Reddy',
      age: 35,
      location: 'Hyderabad, Telangana',
      condition: 'Skin Problems',
      category: 'skin_health',
      treatment: 'Udvartana + Herbal Steam',
      duration: '14 days',
      image: '👩‍⚕️',
      story: "Years of acne and skin problems had affected my confidence. The Udvartana herbal powder massage and steam treatments not only cleared my skin but also improved its texture and glow. The herbal formulations were perfectly suited to my skin type.",
      beforeAfter: {
        before: "Acne-prone skin, dullness, low confidence",
        after: "Clear glowing skin, even tone, renewed confidence"
      },
      testimonial: "My skin has never looked better! People ask me what skincare routine I follow - it's Panchakarma!",
      rating: 5
    }
  ];

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📚' },
    { id: 'pain_relief', name: 'Pain Relief', icon: '🩹' },
    { id: 'mental_wellness', name: 'Mental Wellness', icon: '🧠' },
    { id: 'digestive_health', name: 'Digestive Health', icon: '🍃' },
    { id: 'neurological', name: 'Neurological', icon: '💆‍♀️' },
    { id: 'skin_health', name: 'Skin Health', icon: '✨' }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? patientStories 
    : patientStories.filter(story => story.category === selectedCategory);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Patient Success Stories
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.9,
            lineHeight: '1.6',
            margin: 0
          }}>
            Real experiences from real people who transformed their health through Panchakarma therapy
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Filter by Condition
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: selectedCategory === category.id ? '2px solid #4f46e5' : '1px solid #d1d5db',
                  backgroundColor: selectedCategory === category.id ? '#4f46e5' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#374151',
                  borderRadius: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#d1d5db';
                  }
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div style={{
        padding: '3rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {filteredStories.map(story => (
            <div
              key={story.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Patient Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '3rem',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '50%'
                }}>
                  {story.image}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {story.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: '0 0 0.25rem 0'
                  }}>
                    Age {story.age} • {story.location}
                  </p>
                  <div style={{
                    fontSize: '1rem',
                    color: '#f59e0b'
                  }}>
                    {renderStars(story.rating)}
                  </div>
                </div>
              </div>

              {/* Condition & Treatment */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '0.5rem',
                  border: '1px solid #fecaca'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#dc2626',
                    margin: '0 0 0.5rem 0'
                  }}>
                    CONDITION
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#7f1d1d',
                    margin: 0
                  }}>
                    {story.condition}
                  </p>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#16a34a',
                    margin: '0 0 0.5rem 0'
                  }}>
                    TREATMENT
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#14532d',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {story.treatment}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#16a34a',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    Duration: {story.duration}
                  </p>
                </div>
              </div>

              {/* Story */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{story.story}"
                </p>
              </div>

              {/* Before & After */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 1rem 0'
                }}>
                  TRANSFORMATION
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <h5 style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#dc2626',
                      margin: '0 0 0.5rem 0',
                      textTransform: 'uppercase'
                    }}>
                      Before
                    </h5>
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {story.beforeAfter.before}
                    </p>
                  </div>
                  <div>
                    <h5 style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#16a34a',
                      margin: '0 0 0.5rem 0',
                      textTransform: 'uppercase'
                    }}>
                      After
                    </h5>
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {story.beforeAfter.after}
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div style={{
                padding: '1rem',
                backgroundColor: '#4f46e5',
                borderRadius: '0.5rem',
                color: 'white'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.5',
                  textAlign: 'center'
                }}>
                  "{story.testimonial}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Ready to Start Your Healing Journey?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            opacity: 0.9,
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Join thousands of patients who have transformed their health through authentic Panchakarma therapy
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              padding: '1rem 2rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4338ca';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4f46e5';
              e.target.style.transform = 'translateY(0)';
            }}>
              Book Consultation
            </button>
            <button style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStories;
