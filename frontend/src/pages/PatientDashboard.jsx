import React, { useState } from 'react';
import { dummyPatients, therapyTypes } from '../data/dummyData';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [patientData] = useState(dummyPatients[0]); // Assuming current user is first patient
  const [bookingForm, setBookingForm] = useState({
    therapyType: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        backgroundColor: active ? 'var(--primary-600)' : 'transparent',
        color: active ? 'white' : 'var(--gray-600)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.15s'
      }}
    >
      {label}
    </button>
  );

  const handleBookingChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking request submitted successfully!');
    setBookingForm({
      therapyType: '',
      preferredDate: '',
      preferredTime: '',
      notes: ''
    });
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Patient Dashboard
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Welcome back, {patientData.name}! Manage your therapy sessions and track progress.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 mb-6">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
                {patientData.completedSessions}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Sessions Completed
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-500)' }}>
                {patientData.sessions - patientData.completedSessions}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Sessions Remaining
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-500)' }}>
                {Math.round((patientData.completedSessions / patientData.sessions) * 100)}%
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Progress
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ 
          backgroundColor: 'var(--gray-100)', 
          padding: '0.5rem', 
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '0.25rem'
        }}>
          <TabButton 
            id="profile" 
            label="My Profile" 
            active={activeTab === 'profile'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="booking" 
            label="Book Therapy" 
            active={activeTab === 'booking'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="progress" 
            label="My Progress" 
            active={activeTab === 'progress'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="precautions" 
            label="Precautions" 
            active={activeTab === 'precautions'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Personal Information</h3>
              </div>
              <div className="card-body">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Full Name
                  </label>
                  <div style={{ fontWeight: '500' }}>{patientData.name}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Age
                  </label>
                  <div style={{ fontWeight: '500' }}>{patientData.age} years</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Phone
                  </label>
                  <div style={{ fontWeight: '500' }}>{patientData.phone}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Email
                  </label>
                  <div style={{ fontWeight: '500' }}>{patientData.email}</div>
                </div>
                <button className="btn btn-secondary">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Treatment Information</h3>
              </div>
              <div className="card-body">
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Health Problem
                  </label>
                  <div>{patientData.problem}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Prescribed Therapy
                  </label>
                  <div style={{ fontWeight: '500' }}>{patientData.therapyType}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Assigned Therapist
                  </label>
                  <div style={{ fontWeight: '500' }}>{patientData.assignedTherapist || 'Not assigned yet'}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>
                    Treatment Status
                  </label>
                  <span className={`badge badge-${patientData.status === 'completed' ? 'success' : patientData.status === 'ongoing' ? 'info' : 'warning'}`}>
                    {patientData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Book New Therapy Session</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Therapy Type</label>
                    <select
                      name="therapyType"
                      className="form-select"
                      value={bookingForm.therapyType}
                      onChange={handleBookingChange}
                      required
                    >
                      <option value="">Select therapy type</option>
                      {therapyTypes.map(therapy => (
                        <option key={therapy} value={therapy}>{therapy}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      className="form-input"
                      value={bookingForm.preferredDate}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Time</label>
                    <select
                      name="preferredTime"
                      className="form-select"
                      value={bookingForm.preferredTime}
                      onChange={handleBookingChange}
                      required
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Additional Notes</label>
                    <textarea
                      name="notes"
                      className="form-textarea"
                      rows="3"
                      value={bookingForm.notes}
                      onChange={handleBookingChange}
                      placeholder="Any specific requirements or notes..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit Booking Request
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div>
            {/* Progress Overview */}
            <div className="card mb-6">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Treatment Progress</h3>
              </div>
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>Overall Progress</span>
                  <span style={{ fontSize: '1.125rem', color: 'var(--primary-600)' }}>
                    {patientData.completedSessions}/{patientData.sessions} sessions
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '12px', 
                  backgroundColor: 'var(--gray-200)', 
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: `${(patientData.completedSessions / patientData.sessions) * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--success-500)',
                    borderRadius: '6px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                  You have completed {Math.round((patientData.completedSessions / patientData.sessions) * 100)}% of your treatment plan.
                </p>
              </div>
            </div>

            {/* Next Appointment */}
            {patientData.nextAppointment && (
              <div className="card mb-6">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'var(--primary-100)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📅
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                        Next Appointment
                      </h4>
                      <p style={{ color: 'var(--gray-600)', marginBottom: '0.25rem' }}>
                        {new Date(patientData.nextAppointment).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                        Therapist: {patientData.assignedTherapist}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Section */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Session Feedback</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label className="form-label">How was your last session?</label>
                    <div className="flex gap-4 mb-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'var(--warning-500)'
                          }}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Your Feedback</label>
                    <textarea
                      className="form-textarea"
                      rows="4"
                      placeholder="Share your experience and how you're feeling..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'precautions' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Pre-Therapy Precautions</h3>
              </div>
              <div className="card-body">
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    ✅ Avoid heavy meals 2 hours before therapy
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    ✅ Wear comfortable, loose clothing
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    ✅ Inform about any allergies or medications
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    ✅ Arrive 15 minutes early for preparation
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    ✅ Stay hydrated but avoid excessive water
                  </li>
                  <li style={{ padding: '0.5rem 0' }}>
                    ✅ Get adequate rest the night before
                  </li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Post-Therapy Care</h3>
              </div>
              <div className="card-body">
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    🌿 Rest for at least 30 minutes after therapy
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    🌿 Drink warm water to aid detoxification
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    🌿 Avoid cold foods and beverages
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    🌿 Take a warm shower after 2-3 hours
                  </li>
                  <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    🌿 Avoid strenuous activities for the day
                  </li>
                  <li style={{ padding: '0.5rem 0' }}>
                    🌿 Follow prescribed dietary guidelines
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
