import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

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
            📞
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
            Contact Us
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--gray-600)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Get in touch with our Ayurvedic wellness experts. We're here to help you 
            on your journey to natural health and healing.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '3rem' 
          }}>
            
            {/* Contact Information */}
            <div style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                marginBottom: '2rem',
                color: 'var(--gray-900)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                📍 Get In Touch
              </h2>

              {/* Contact Cards */}
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                
                {/* Phone */}
                <div style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, var(--primary-50), var(--ayur-50))',
                  borderRadius: '1rem',
                  border: '1px solid var(--primary-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📞
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)', margin: 0 }}>
                        Phone
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', margin: 0 }}>
                        Call us anytime
                      </p>
                    </div>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <a href="tel:+919876543210" style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: 'var(--primary-600)',
                      textDecoration: 'none'
                    }}>
                      +91 98765 43210
                    </a>
                    <br />
                    <a href="tel:+919876543211" style={{ 
                      fontSize: '1rem', 
                      color: 'var(--gray-700)',
                      textDecoration: 'none'
                    }}>
                      +91 98765 43211 (Emergency)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, var(--success-50), var(--ayur-50))',
                  borderRadius: '1rem',
                  border: '1px solid var(--success-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--success-600), var(--ayur-600))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      ✉️
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)', margin: 0 }}>
                        Email
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', margin: 0 }}>
                        Send us a message
                      </p>
                    </div>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <a href="mailto:info@ayursutra.com" style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: 'var(--success-600)',
                      textDecoration: 'none'
                    }}>
                      info@ayursutra.com
                    </a>
                    <br />
                    <a href="mailto:support@ayursutra.com" style={{ 
                      fontSize: '1rem', 
                      color: 'var(--gray-700)',
                      textDecoration: 'none'
                    }}>
                      support@ayursutra.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, var(--warning-50), var(--ayur-50))',
                  borderRadius: '1rem',
                  border: '1px solid var(--warning-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--warning-600), var(--ayur-600))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📍
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)', margin: 0 }}>
                        Address
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', margin: 0 }}>
                        Visit our center
                      </p>
                    </div>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: 'var(--gray-700)',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      123 Wellness Street, Health District<br />
                      Mumbai, Maharashtra - 400001<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, var(--primary-50), var(--success-50))',
                  borderRadius: '1rem',
                  border: '1px solid var(--primary-200)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--success-600))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      🕒
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)', margin: 0 }}>
                        Business Hours
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', margin: 0 }}>
                        We're here to help
                      </p>
                    </div>
                  </div>
                  <div style={{ paddingLeft: '66px' }}>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: 'var(--gray-700)',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      <strong>Mon - Sat:</strong> 8:00 AM - 8:00 PM<br />
                      <strong>Sunday:</strong> 9:00 AM - 6:00 PM<br />
                      <strong>Emergency:</strong> 24/7 Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                marginBottom: '2rem',
                color: 'var(--gray-900)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                💬 Send Message
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  
                  {/* Name */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      color: 'var(--gray-700)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid var(--gray-300)',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-500)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: 'var(--gray-700)', 
                        marginBottom: '0.5rem' 
                      }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '2px solid var(--gray-300)',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-500)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: 'var(--gray-700)', 
                        marginBottom: '0.5rem' 
                      }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: '2px solid var(--gray-300)',
                          borderRadius: '0.5rem',
                          fontSize: '1rem',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-500)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      color: 'var(--gray-700)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid var(--gray-300)',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-500)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">Book Consultation</option>
                      <option value="treatment">Treatment Inquiry</option>
                      <option value="appointment">Appointment Booking</option>
                      <option value="support">General Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      color: 'var(--gray-700)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '2px solid var(--gray-300)',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-500)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--gray-300)'}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span>📤</span>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: 'var(--gray-900)'
            }}>
              Quick Actions
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, var(--primary-50), var(--ayur-50))',
                borderRadius: '1.5rem',
                border: '1px solid var(--primary-200)',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Book Appointment
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Schedule your consultation online
                </p>
              </div>
              
              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, var(--success-50), var(--ayur-50))',
                borderRadius: '1.5rem',
                border: '1px solid var(--success-200)',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Emergency Care
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  24/7 emergency support available
                </p>
              </div>
              
              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, var(--warning-50), var(--ayur-50))',
                borderRadius: '1.5rem',
                border: '1px solid var(--warning-200)',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Live Chat
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                  Chat with our wellness experts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
