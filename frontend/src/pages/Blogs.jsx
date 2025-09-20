import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Benefits of Panchakarma in Modern Life",
      excerpt: "Discover how ancient Panchakarma treatments can help combat modern lifestyle diseases and stress.",
      date: "January 15, 2025",
      readTime: "5 min read",
      author: "Dr. Priya Sharma",
      category: "Wellness",
      icon: "🌿",
      image: "linear-gradient(135deg, var(--ayur-200), var(--ayur-300))",
      fullContent: `
        <h3>Introduction</h3>
        <p>In today's fast-paced world, stress, pollution, and unhealthy lifestyle choices have become the norm. Ancient Ayurvedic wisdom offers a powerful solution through Panchakarma - a comprehensive detoxification and rejuvenation therapy that addresses the root causes of modern health issues.</p>
        
        <h3>Understanding Panchakarma</h3>
        <p>Panchakarma, literally meaning "five actions," is a systematic approach to cleansing the body of accumulated toxins (ama) and restoring natural balance. This ancient practice has proven remarkably effective in addressing contemporary health challenges.</p>
        
        <h3>Key Benefits for Modern Life</h3>
        <ul>
          <li><strong>Stress Reduction:</strong> Panchakarma treatments like Shirodhara and Abhyanga significantly reduce cortisol levels and promote deep relaxation.</li>
          <li><strong>Detoxification:</strong> Removes accumulated toxins from processed foods, environmental pollutants, and metabolic waste.</li>
          <li><strong>Improved Immunity:</strong> Strengthens the body's natural defense mechanisms against modern pathogens and allergens.</li>
          <li><strong>Better Sleep:</strong> Addresses insomnia and sleep disorders common in urban lifestyles.</li>
          <li><strong>Mental Clarity:</strong> Enhances cognitive function and emotional stability in our information-overloaded world.</li>
        </ul>
        
        <h3>Scientific Validation</h3>
        <p>Recent studies have shown that Panchakarma treatments can:</p>
        <ul>
          <li>Reduce inflammatory markers by up to 40%</li>
          <li>Improve cardiovascular health parameters</li>
          <li>Enhance neuroplasticity and brain function</li>
          <li>Regulate hormonal imbalances</li>
        </ul>
        
        <h3>Conclusion</h3>
        <p>Panchakarma offers a holistic approach to health that is particularly relevant in our modern context. By addressing the root causes of illness rather than just symptoms, it provides lasting benefits for both physical and mental well-being.</p>
      `
    },
    {
      id: 2,
      title: "Understanding Abhyanga Therapy",
      excerpt: "Learn about the therapeutic oil massage that forms the foundation of many Panchakarma treatments.",
      date: "January 10, 2025",
      readTime: "7 min read",
      author: "Dr. Rajesh Kumar",
      category: "Therapy",
      icon: "💆‍♀️",
      image: "linear-gradient(135deg, var(--primary-200), var(--primary-300))",
      fullContent: `
        <h3>What is Abhyanga?</h3>
        <p>Abhyanga is a form of Ayurvedic therapy that involves massage of the body with large amounts of warm oil. The oil is often pre-medicated with herbs for specific conditions. Abhyanga can be done as part of the steps of Panchakarma therapy, especially in the preparatory stage called Purva Karma.</p>
        
        <h3>The Science Behind Oil Massage</h3>
        <p>The practice of Abhyanga is based on the principle that the skin is the largest organ of the body and can absorb the therapeutic properties of medicated oils. The warm oil penetrates deep into the tissues, nourishing them and helping to eliminate toxins.</p>
        
        <h3>Types of Oils Used</h3>
        <ul>
          <li><strong>Sesame Oil:</strong> Most commonly used, suitable for Vata constitution</li>
          <li><strong>Coconut Oil:</strong> Cooling properties, ideal for Pitta constitution</li>
          <li><strong>Mustard Oil:</strong> Warming effect, beneficial for Kapha constitution</li>
          <li><strong>Medicated Oils:</strong> Specially prepared with herbs for specific conditions</li>
        </ul>
        
        <h3>Health Benefits</h3>
        <ul>
          <li>Improves blood circulation and lymphatic drainage</li>
          <li>Nourishes and moisturizes the skin</li>
          <li>Reduces stress and promotes relaxation</li>
          <li>Enhances flexibility and joint mobility</li>
          <li>Supports better sleep quality</li>
          <li>Boosts immune system function</li>
        </ul>
        
        <h3>How to Prepare for Abhyanga</h3>
        <p>Before receiving Abhyanga therapy, it's important to:</p>
        <ul>
          <li>Avoid heavy meals 2-3 hours before treatment</li>
          <li>Stay hydrated but avoid excessive water intake</li>
          <li>Inform your therapist about any allergies or medical conditions</li>
          <li>Wear comfortable, loose clothing</li>
        </ul>
      `
    },
    {
      id: 3,
      title: "Preparing for Your First Panchakarma",
      excerpt: "A comprehensive guide to mental, physical, and dietary preparation for Panchakarma treatment.",
      date: "January 5, 2025",
      readTime: "6 min read",
      author: "Dr. Meera Nair",
      category: "Preparation",
      icon: "🧘‍♂️",
      image: "linear-gradient(135deg, var(--success-200), var(--success-300))",
      fullContent: `
        <h3>Mental Preparation</h3>
        <p>Panchakarma is not just a physical detox but also a mental and emotional cleansing process. Preparing your mind is crucial for the success of the treatment.</p>
        
        <h3>Pre-Treatment Guidelines</h3>
        <h4>Dietary Preparation (1-2 weeks before):</h4>
        <ul>
          <li>Gradually reduce processed foods, caffeine, and alcohol</li>
          <li>Increase intake of fresh fruits and vegetables</li>
          <li>Start eating lighter, easily digestible meals</li>
          <li>Avoid cold drinks and ice-cold foods</li>
        </ul>
        
        <h4>Lifestyle Adjustments:</h4>
        <ul>
          <li>Establish regular sleep patterns (sleep by 10 PM)</li>
          <li>Reduce strenuous physical activities</li>
          <li>Limit screen time and digital exposure</li>
          <li>Practice meditation or gentle yoga</li>
        </ul>
        
        <h3>What to Expect During Treatment</h3>
        <p>Panchakarma typically involves three phases:</p>
        <ul>
          <li><strong>Purva Karma:</strong> Preparatory treatments including oil massage and steam therapy</li>
          <li><strong>Pradhana Karma:</strong> Main detoxification procedures</li>
          <li><strong>Paschat Karma:</strong> Post-treatment rejuvenation and lifestyle guidance</li>
        </ul>
        
        <h3>Post-Treatment Care</h3>
        <ul>
          <li>Follow prescribed diet and lifestyle recommendations</li>
          <li>Avoid exposure to extreme weather conditions</li>
          <li>Continue with gentle exercises and yoga</li>
          <li>Maintain regular follow-up appointments</li>
        </ul>
        
        <h3>Common Experiences</h3>
        <p>During Panchakarma, you may experience:</p>
        <ul>
          <li>Initial fatigue as toxins are released</li>
          <li>Emotional releases and mood changes</li>
          <li>Improved energy levels as treatment progresses</li>
          <li>Enhanced mental clarity and focus</li>
        </ul>
      `
    },
    {
      id: 4,
      title: "Seasonal Ayurvedic Practices",
      excerpt: "Adapt your wellness routine according to seasonal changes with Ayurvedic wisdom.",
      date: "December 28, 2024",
      readTime: "4 min read",
      author: "Dr. Arjun Patel",
      category: "Seasonal Care",
      icon: "🍂",
      image: "linear-gradient(135deg, #fbbf24, #f59e0b)",
      fullContent: `
        <h3>Understanding Seasonal Rhythms</h3>
        <p>Ayurveda recognizes that our bodies are deeply connected to natural cycles. Each season brings specific qualities that can either balance or disturb our doshas.</p>
        
        <h3>Spring (Vasant Ritu)</h3>
        <ul>
          <li>Focus on detoxification and cleansing</li>
          <li>Reduce heavy, oily foods</li>
          <li>Increase bitter and astringent tastes</li>
          <li>Practice vigorous exercise</li>
        </ul>
        
        <h3>Summer (Grishma Ritu)</h3>
        <ul>
          <li>Stay cool and hydrated</li>
          <li>Favor sweet, bitter, and astringent tastes</li>
          <li>Avoid excessive sun exposure</li>
          <li>Practice cooling pranayama</li>
        </ul>
        
        <h3>Monsoon (Varsha Ritu)</h3>
        <ul>
          <li>Strengthen digestion with warm spices</li>
          <li>Avoid heavy, cold foods</li>
          <li>Practice gentle indoor exercises</li>
          <li>Maintain regular meal times</li>
        </ul>
        
        <h3>Autumn (Sharad Ritu)</h3>
        <ul>
          <li>Balance Pitta with cooling foods</li>
          <li>Include sweet and bitter tastes</li>
          <li>Practice moderate exercise</li>
          <li>Maintain regular sleep schedule</li>
        </ul>
        
        <h3>Winter (Shishir Ritu)</h3>
        <ul>
          <li>Nourish with warm, oily foods</li>
          <li>Include sweet, sour, and salty tastes</li>
          <li>Practice oil massage regularly</li>
          <li>Engage in strengthening exercises</li>
        </ul>
      `
    },
    {
      id: 5,
      title: "Ayurvedic Nutrition for Modern Living",
      excerpt: "Practical tips for incorporating Ayurvedic dietary principles into your busy lifestyle.",
      date: "December 20, 2024",
      readTime: "8 min read",
      author: "Dr. Kavita Singh",
      category: "Nutrition",
      icon: "🥗",
      image: "linear-gradient(135deg, #10b981, #059669)",
      fullContent: `
        <h3>The Six Tastes in Ayurveda</h3>
        <p>Ayurveda identifies six tastes (rasas) that should be included in every meal for optimal health and satisfaction.</p>
        
        <h3>Understanding Your Constitution</h3>
        <h4>Vata Constitution:</h4>
        <ul>
          <li>Favor warm, moist, and grounding foods</li>
          <li>Include sweet, sour, and salty tastes</li>
          <li>Eat regular meals at consistent times</li>
          <li>Avoid raw, cold, and dry foods</li>
        </ul>
        
        <h4>Pitta Constitution:</h4>
        <ul>
          <li>Choose cool, refreshing foods</li>
          <li>Emphasize sweet, bitter, and astringent tastes</li>
          <li>Avoid spicy, sour, and salty foods</li>
          <li>Eat moderate portions at regular intervals</li>
        </ul>
        
        <h4>Kapha Constitution:</h4>
        <ul>
          <li>Select light, warm, and stimulating foods</li>
          <li>Include pungent, bitter, and astringent tastes</li>
          <li>Limit sweet, sour, and salty foods</li>
          <li>Eat smaller, more frequent meals</li>
        </ul>
        
        <h3>Practical Meal Planning</h3>
        <ul>
          <li>Start the day with warm water and lemon</li>
          <li>Make lunch your largest meal</li>
          <li>Include all six tastes in main meals</li>
          <li>Eat dinner 3 hours before bedtime</li>
          <li>Chew food thoroughly and eat mindfully</li>
        </ul>
        
        <h3>Modern Adaptations</h3>
        <ul>
          <li>Meal prep with Ayurvedic principles</li>
          <li>Healthy office snacks based on your dosha</li>
          <li>Quick Ayurvedic recipes for busy schedules</li>
          <li>Eating out while following Ayurvedic guidelines</li>
        </ul>
      `
    },
    {
      id: 6,
      title: "Yoga and Meditation in Ayurveda",
      excerpt: "Explore the synergistic relationship between yoga, meditation, and Ayurvedic healing.",
      date: "December 15, 2024",
      readTime: "6 min read",
      author: "Dr. Sanjay Gupta",
      category: "Mind-Body",
      icon: "🧘‍♀️",
      image: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      fullContent: `
        <h3>The Trinity of Wellness</h3>
        <p>Ayurveda, Yoga, and Meditation form a complete system for physical, mental, and spiritual well-being. Each practice supports and enhances the others.</p>
        
        <h3>Yoga for Different Doshas</h3>
        <h4>Vata-Pacifying Yoga:</h4>
        <ul>
          <li>Gentle, grounding poses</li>
          <li>Slow, flowing movements</li>
          <li>Focus on hip openers and forward bends</li>
          <li>Restorative poses with props</li>
        </ul>
        
        <h4>Pitta-Pacifying Yoga:</h4>
        <ul>
          <li>Cooling, moderate-intensity practice</li>
          <li>Avoid excessive heat-building poses</li>
          <li>Include twists and lateral bends</li>
          <li>Practice during cooler parts of the day</li>
        </ul>
        
        <h4>Kapha-Pacifying Yoga:</h4>
        <ul>
          <li>Dynamic, energizing sequences</li>
          <li>Include backbends and inversions</li>
          <li>Practice sun salutations</li>
          <li>Focus on building heat and energy</li>
        </ul>
        
        <h3>Meditation Techniques</h3>
        <ul>
          <li><strong>Trataka:</strong> Candle gazing meditation</li>
          <li><strong>Mantra Meditation:</strong> Using sacred sounds</li>
          <li><strong>Breath Awareness:</strong> Following natural breath rhythm</li>
          <li><strong>Body Scan:</strong> Progressive relaxation technique</li>
        </ul>
        
        <h3>Creating a Daily Practice</h3>
        <ul>
          <li>Start with 10-15 minutes daily</li>
          <li>Choose consistent time and place</li>
          <li>Adapt practice to your constitution</li>
          <li>Combine movement, breath, and meditation</li>
        </ul>
      `
    }
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section style={{ padding: '4rem 0 2rem', textAlign: 'center', background: 'white' }}>
        <div className="container">
          <div style={{
            fontSize: '5rem',
            marginBottom: '2rem',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            📝
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
            Ayurvedic Wellness Blog
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--gray-600)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Discover ancient wisdom for modern living through our comprehensive collection 
            of Ayurvedic insights, wellness tips, and healing practices
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem' 
          }}>
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '0',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Header Image */}
                <div style={{
                  height: '200px',
                  background: post.image,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  color: 'white',
                  position: 'relative'
                }}>
                  {post.icon}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--gray-700)'
                  }}>
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: 'var(--gray-500)'
                  }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--gray-900)',
                    marginBottom: '1rem',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h2>

                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--gray-600)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {post.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(post)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.3)';
                      const arrow = e.target.querySelector('.arrow');
                      if (arrow) arrow.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                      const arrow = e.target.querySelector('.arrow');
                      if (arrow) arrow.style.transform = 'translateX(0)';
                    }}
                  >
                    Read Full Article
                    <span 
                      className="arrow"
                      style={{
                        fontSize: '1.1rem',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      Read More
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '3rem',
            background: 'linear-gradient(135deg, var(--ayur-50), var(--primary-50))',
            borderRadius: '2rem',
            border: '1px solid var(--ayur-200)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📧</div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--gray-900)'
            }}>
              Stay Updated
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--gray-600)',
              marginBottom: '2rem'
            }}>
              Subscribe to our newsletter for the latest Ayurvedic insights and wellness tips
            </p>
            <div style={{ display: 'flex', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: '2px solid var(--gray-300)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
              <button style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{
              background: selectedArticle.image,
              padding: '2rem',
              color: 'white',
              position: 'relative'
            }}>
              {/* Back Arrow */}
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: 'white',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateX(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateX(0)';
                }}
                title="Back to Blogs"
              >
                ←
              </button>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                title="Close"
              >
                ×
              </button>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{selectedArticle.icon}</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {selectedArticle.title}
              </h1>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
                <span>•</span>
                <span>{selectedArticle.author}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '2rem',
              maxHeight: '60vh',
              overflow: 'auto',
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: 'var(--gray-700)'
            }}>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent }} />
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '2rem',
              borderTop: '1px solid var(--gray-200)',
              textAlign: 'center',
              background: 'var(--gray-50)'
            }}>
              <p style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>
                Thank you for reading! Share your thoughts and experiences with us.
              </p>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, var(--ayur-600), var(--primary-600))',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  const arrow = e.target.querySelector('.back-arrow');
                  if (arrow) arrow.style.transform = 'translateX(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  const arrow = e.target.querySelector('.back-arrow');
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                <span 
                  className="back-arrow"
                  style={{
                    fontSize: '1.1rem',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  ←
                </span>
                Back to Blogs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
