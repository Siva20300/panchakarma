import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }} className="hero-section-responsive">
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Welcome to AyurSutra
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Complete Panchakarma Patient Management & Therapy Scheduling Software
          </p>
          <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
            <Link to="/login" className="btn" style={{
              backgroundColor: 'white',
              color: 'var(--primary-600)',
              padding: '1rem 2rem',
              fontSize: '1.125rem'
            }}>
              Get Started
            </Link>
            <Link to="#learn-more" className="btn" style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '1rem 2rem',
              fontSize: '1.125rem'
            }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }} id="learn-more">
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Panchakarma Management
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              Streamline your Ayurvedic practice with our all-in-one management system
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ marginTop: '3rem' }}>
            <div className="card text-center">
              <div className="card-body">
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--primary-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  👨‍⚕️
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Doctor Dashboard
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Manage patients, assign therapists, track progress, and send notifications
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-body">
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--ayur-100)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  👩‍⚕️
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Therapist Portal
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  View assigned patients, update session status, and provide feedback
                </p>
              </div>
            </div>

            <div className="card text-center">
              <div className="card-body">
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem'
                }}>
                  👤
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Patient Experience
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Book appointments, track progress, receive notifications, and provide feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Panchakarma Section */}
      <section style={{ backgroundColor: 'var(--gray-100)', padding: '4rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                About Panchakarma
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Panchakarma is a cornerstone of Ayurvedic medicine, consisting of five therapeutic procedures 
                designed to cleanse and rejuvenate the body, mind, and spirit.
              </p>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>The Five Procedures:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Vamana (Therapeutic Vomiting)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Virechana (Purgation)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Basti (Medicated Enemas)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Nasya (Nasal Administration)</li>
                  <li style={{ padding: '0.25rem 0', color: 'var(--gray-700)' }}>• Raktamokshana (Bloodletting)</li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '300px',
                height: '200px',
                backgroundColor: 'var(--primary-100)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '4rem'
              }}>
                🧘‍♀️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              About AyurSutra
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>
              Revolutionizing Ayurvedic healthcare management with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ alignItems: 'center', marginTop: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--ayur-600)' }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                To bridge the gap between traditional Ayurvedic wisdom and modern healthcare management, 
                making Panchakarma treatments more accessible, organized, and effective for practitioners and patients alike.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--gray-800)' }}>
                  Why Choose AyurSutra?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Comprehensive patient management system</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Automated scheduling and notifications</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Role-based access for doctors, therapists, and patients</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--ayur-600)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--gray-700)' }}>Progress tracking and feedback system</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '350px',
                height: '250px',
                background: 'linear-gradient(135deg, var(--ayur-100), var(--primary-100))',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '4rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                🏥
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)', fontStyle: 'italic' }}>
                Modern Healthcare Management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" style={{ padding: '4rem 0', backgroundColor: 'var(--gray-50)' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Latest Blogs & Articles
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              Stay updated with the latest insights on Panchakarma and Ayurvedic treatments
            </p>
          </div>

          <div className="grid grid-cols-3">
            <div className="card">
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--ayur-200), var(--ayur-300))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🌿
              </div>
              <div className="card-body">
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Benefits of Panchakarma in Modern Life
                </h4>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Discover how ancient Panchakarma treatments can help combat modern lifestyle diseases and stress.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  January 15, 2025 • 5 min read
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--primary-200), var(--primary-300))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                💆‍♀️
              </div>
              <div className="card-body">
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Understanding Abhyanga Therapy
                </h4>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Learn about the therapeutic oil massage that forms the foundation of many Panchakarma treatments.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  January 10, 2025 • 7 min read
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🧘‍♂️
              </div>
              <div className="card-body">
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Preparing for Your First Panchakarma
                </h4>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Essential guidelines and preparations for patients beginning their Panchakarma journey.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                  January 5, 2025 • 6 min read
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)' }}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-2" style={{ alignItems: 'start' }}>
            {/* Contact Form */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Send us a Message</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="your.email@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input type="text" className="form-input" placeholder="How can we help?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" rows="4" placeholder="Tell us more about your inquiry..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ paddingLeft: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--ayur-600)' }}>
                Contact Information
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--ayur-100)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    📧
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Email</h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>support@ayursutra.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'var(--primary-100)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    📞
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Phone</h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>+91 98765 43210</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    📍
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Address</h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>
                      Ayurvedic Wellness Center<br/>
                      Mumbai, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, var(--ayur-50), var(--primary-50))',
                borderRadius: '1rem',
                border: '1px solid var(--ayur-200)'
              }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--ayur-700)' }}>
                  Business Hours
                </h4>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>
                  <p style={{ margin: '0.25rem 0' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p style={{ margin: '0.25rem 0' }}>Saturday: 9:00 AM - 4:00 PM</p>
                  <p style={{ margin: '0.25rem 0' }}>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--gray-50)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to Transform Your Practice?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginBottom: '2rem' }}>
            Join AyurSutra today and experience the future of Panchakarma management
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn btn-primary" style={{
              padding: '1rem 2rem',
              fontSize: '1.125rem'
            }}>
              Start Free Trial
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{
              padding: '1rem 2rem',
              fontSize: '1.125rem'
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
