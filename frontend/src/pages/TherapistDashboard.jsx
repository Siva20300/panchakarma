import React, { useState } from 'react';
import { dummyPatients, dummyFeedback, dummyFoodDiets } from '../data/dummyData';

const TherapistDashboard = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [patients] = useState(dummyPatients.filter(p => p.assignedTherapist === 'Priya Sharma'));
  const [feedback] = useState(dummyFeedback);
  const [foodDiets, setFoodDiets] = useState(dummyFoodDiets);
  const [selectedPatientForDiet, setSelectedPatientForDiet] = useState(null);
  const [showDietForm, setShowDietForm] = useState(false);

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

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Therapist Dashboard
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Manage your assigned patients and update therapy sessions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 mb-6">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
                {patients.length}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Assigned Patients
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-500)' }}>
                {patients.reduce((sum, p) => sum + p.completedSessions, 0)}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Sessions Completed
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--ayur-600)' }}>
                {patients.filter(p => p.status === 'ongoing').length}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Active Treatments
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
            id="assigned" 
            label="Assigned Patients" 
            active={activeTab === 'assigned'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="sessions" 
            label="Session Updates" 
            active={activeTab === 'sessions'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="feedback" 
            label="Feedback" 
            active={activeTab === 'feedback'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="fooddiet" 
            label="Food Diet Management" 
            active={activeTab === 'fooddiet'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'assigned' && (
          <div className="grid grid-cols-1 gap-4">
            {patients.map(patient => (
              <div key={patient.id} className="card">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {patient.name}
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Age:</span>
                          <span style={{ marginLeft: '0.5rem', fontWeight: '500' }}>{patient.age}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Phone:</span>
                          <span style={{ marginLeft: '0.5rem', fontWeight: '500' }}>{patient.phone}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Problem:</span>
                          <span style={{ marginLeft: '0.5rem' }}>{patient.problem}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Therapy:</span>
                          <span style={{ marginLeft: '0.5rem', fontWeight: '500' }}>{patient.therapyType}</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div className="flex justify-between items-center mb-2">
                          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Progress</span>
                          <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                            {patient.completedSessions}/{patient.sessions} sessions
                          </span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '8px', 
                          backgroundColor: 'var(--gray-200)', 
                          borderRadius: '4px'
                        }}>
                          <div style={{
                            width: `${(patient.completedSessions / patient.sessions) * 100}%`,
                            height: '100%',
                            backgroundColor: 'var(--success-500)',
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>

                      {patient.nextAppointment && (
                        <div style={{ 
                          backgroundColor: 'var(--primary-100)', 
                          padding: '0.75rem', 
                          borderRadius: '0.5rem',
                          marginBottom: '1rem'
                        }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--primary-700)' }}>
                            Next Appointment: {new Date(patient.nextAppointment).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ marginLeft: '2rem' }}>
                      <span className={`badge badge-${patient.status === 'completed' ? 'success' : patient.status === 'ongoing' ? 'info' : 'warning'}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Update Session Status</h3>
            </div>
            <div className="card-body">
              {patients.filter(p => p.status === 'ongoing').map(patient => (
                <div key={patient.id} className="card" style={{ marginBottom: '1rem' }}>
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{patient.name}</h5>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                          {patient.therapyType}
                        </p>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                          Session {patient.completedSessions + 1} of {patient.sessions}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button className="btn btn-success">
                          Mark Complete
                        </button>
                        <button className="btn btn-secondary">
                          Add Notes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Session Feedback</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-4">
                {feedback.map(item => (
                  <div key={item.id} className="card">
                    <div className="card-body">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h5 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{item.patientName}</h5>
                          <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                            Session Date: {new Date(item.sessionDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span style={{ fontSize: '1.25rem' }}>⭐ {item.rating}/5</span>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <h6 style={{ fontWeight: '500', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                          Patient Feedback:
                        </h6>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                          {item.patientFeedback}
                        </p>
                      </div>
                      
                      <div>
                        <h6 style={{ fontWeight: '500', marginBottom: '0.5rem', color: 'var(--gray-700)' }}>
                          Your Notes:
                        </h6>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                          {item.therapistFeedback}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Feedback Form */}
                <div className="card">
                  <div className="card-header">
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Add Session Feedback</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label className="form-label">Select Patient</label>
                        <select className="form-select">
                          <option value="">Choose patient...</option>
                          {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>
                              {patient.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Session Notes</label>
                        <textarea 
                          className="form-textarea" 
                          rows="4"
                          placeholder="Enter your observations and recommendations..."
                        ></textarea>
                      </div>
                      
                      <button type="submit" className="btn btn-primary">
                        Submit Feedback
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Food Diet Management Tab */}
        {activeTab === 'fooddiet' && (
          <div>
            {/* Current Diet Plans Overview */}
            <div className="card mb-6">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Patient Diet Plans Overview</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 gap-4">
                  {patients.map(patient => {
                    const patientDiet = foodDiets.find(diet => diet.patientId === patient.id);
                    return (
                      <div key={patient.id} className="card">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <div style={{ flex: 1 }}>
                              <h5 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{patient.name}</h5>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Problem:</span>
                                  <span style={{ marginLeft: '0.5rem' }}>{patient.problem}</span>
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Therapy:</span>
                                  <span style={{ marginLeft: '0.5rem', fontWeight: '500' }}>{patient.therapyType}</span>
                                </div>
                              </div>
                              
                              {patientDiet ? (
                                <div style={{
                                  backgroundColor: 'var(--success-50)',
                                  padding: '0.75rem',
                                  borderRadius: '0.5rem',
                                  borderLeft: '4px solid var(--success-500)'
                                }}>
                                  <p style={{ fontSize: '0.875rem', color: 'var(--success-700)', margin: 0 }}>
                                    <strong>Diet Plan Active</strong> - Last updated: {new Date(patientDiet.lastUpdated).toLocaleDateString()}
                                  </p>
                                </div>
                              ) : (
                                <div style={{
                                  backgroundColor: 'var(--warning-50)',
                                  padding: '0.75rem',
                                  borderRadius: '0.5rem',
                                  borderLeft: '4px solid var(--warning-500)'
                                }}>
                                  <p style={{ fontSize: '0.875rem', color: 'var(--warning-700)', margin: 0 }}>
                                    <strong>No Diet Plan Assigned</strong>
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div style={{ marginLeft: '2rem', display: 'flex', gap: '0.5rem' }}>
                              {patientDiet ? (
                                <button 
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    setSelectedPatientForDiet(patient);
                                    setShowDietForm(true);
                                  }}
                                >
                                  Update Diet
                                </button>
                              ) : (
                                <button 
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setSelectedPatientForDiet(patient);
                                    setShowDietForm(true);
                                  }}
                                >
                                  Create Diet Plan
                                </button>
                              )}
                              {patientDiet && (
                                <button 
                                  className="btn btn-info"
                                  onClick={() => {
                                    // View diet plan details
                                    alert(`Viewing diet plan for ${patient.name}`);
                                  }}
                                >
                                  View Details
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Diet Plan Form Modal */}
            {showDietForm && selectedPatientForDiet && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  maxWidth: '800px',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  width: '90%'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                      {foodDiets.find(d => d.patientId === selectedPatientForDiet.id) ? 'Update' : 'Create'} Diet Plan for {selectedPatientForDiet.name}
                    </h3>
                    <button 
                      onClick={() => {
                        setShowDietForm(false);
                        setSelectedPatientForDiet(null);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: 'var(--gray-500)'
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Handle form submission
                    alert(`Diet plan ${foodDiets.find(d => d.patientId === selectedPatientForDiet.id) ? 'updated' : 'created'} for ${selectedPatientForDiet.name}`);
                    setShowDietForm(false);
                    setSelectedPatientForDiet(null);
                  }}>
                    {/* Quick Diet Templates */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Quick Templates</label>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button type="button" className="btn btn-outline-primary" style={{ fontSize: '0.875rem' }}>
                          Anti-Inflammatory Diet
                        </button>
                        <button type="button" className="btn btn-outline-primary" style={{ fontSize: '0.875rem' }}>
                          Digestive Health Diet
                        </button>
                        <button type="button" className="btn btn-outline-primary" style={{ fontSize: '0.875rem' }}>
                          Detox Diet
                        </button>
                        <button type="button" className="btn btn-outline-primary" style={{ fontSize: '0.875rem' }}>
                          Joint Health Diet
                        </button>
                      </div>
                    </div>

                    {/* General Guidelines */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label" style={{ fontWeight: 'bold' }}>General Guidelines</label>
                      <textarea 
                        className="form-textarea" 
                        rows="3"
                        placeholder="Enter general dietary guidelines for the patient..."
                        defaultValue="Eat warm, freshly cooked food&#10;Drink warm water throughout the day&#10;Avoid cold and frozen foods&#10;Eat in a calm environment&#10;Chew food properly&#10;Maintain regular meal times"
                      ></textarea>
                    </div>

                    {/* Restrictions */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label" style={{ fontWeight: 'bold' }}>Food Restrictions</label>
                      <textarea 
                        className="form-textarea" 
                        rows="3"
                        placeholder="Enter foods to avoid..."
                        defaultValue="No ice cream or cold desserts&#10;Avoid spicy and oily foods&#10;No carbonated drinks&#10;Limit caffeine intake&#10;Avoid eating late at night"
                      ></textarea>
                    </div>

                    {/* Meal-wise Recommendations */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Meal-wise Recommendations</h4>
                      
                      {['Morning', 'Mid Morning', 'Lunch', 'Evening', 'Dinner'].map((meal) => (
                        <div key={meal} className="card" style={{ marginBottom: '1rem' }}>
                          <div className="card-header">
                            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>{meal}</h5>
                          </div>
                          <div className="card-body">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="form-group">
                                <label className="form-label">Recommended Foods</label>
                                <textarea 
                                  className="form-textarea" 
                                  rows="3"
                                  placeholder={`Enter recommended foods for ${meal.toLowerCase()}...`}
                                ></textarea>
                              </div>
                              <div className="form-group">
                                <label className="form-label">Foods to Avoid</label>
                                <textarea 
                                  className="form-textarea" 
                                  rows="3"
                                  placeholder={`Enter foods to avoid during ${meal.toLowerCase()}...`}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Doctor's Notes */}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label" style={{ fontWeight: 'bold' }}>Doctor's Notes</label>
                      <textarea 
                        className="form-textarea" 
                        rows="3"
                        placeholder="Enter special instructions or notes for the patient..."
                      ></textarea>
                    </div>

                    {/* Form Actions */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowDietForm(false);
                          setSelectedPatientForDiet(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {foodDiets.find(d => d.patientId === selectedPatientForDiet.id) ? 'Update' : 'Create'} Diet Plan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistDashboard;


