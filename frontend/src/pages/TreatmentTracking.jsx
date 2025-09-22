import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { detailedPatientData } from '../data/dummyData.jsx';

const TreatmentTracking = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the source tab from URL params or default to 'progress'
  const getSourceTab = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('from') || 'progress';
  };
  
  const sourceTab = getSourceTab();
  
  // Standardized back button component
  const BackButton = ({ onClick, children = 'Back' }) => (
    <button
      onClick={onClick}
      style={{
        padding: '0.75rem 1.25rem',
        border: 'none',
        background: 'linear-gradient(135deg, #64748b, #475569)',
        color: 'white',
        borderRadius: '0.75rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.15s ease',
        boxShadow: '0 4px 14px 0 rgba(100, 116, 139, 0.35)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 25px 0 rgba(100, 116, 139, 0.45)';
        e.target.style.background = 'linear-gradient(135deg, #475569, #334155)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 14px 0 rgba(100, 116, 139, 0.35)';
        e.target.style.background = 'linear-gradient(135deg, #64748b, #475569)';
      }}
    >
      {children}
    </button>
  );
  const [selectedTab, setSelectedTab] = useState('overview');

  // Find patient data
  const patient = detailedPatientData.find(p => p.id === parseInt(patientId));

  if (!patient) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <h2>Patient not found</h2>
          <div style={{ marginTop: '1rem' }}>
            <BackButton onClick={() => navigate(`/doctor-dashboard?tab=${sourceTab}`)} />
          </div>
        </div>
      </div>
    );
  }

  const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: '0.75rem 1.5rem',
        border: 'none',
        backgroundColor: active ? '#4f46e5' : 'transparent',
        color: active ? 'white' : '#6b7280',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem'
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );

  const ProgressBar = ({ percentage, color = '#3b82f6' }) => (
    <div style={{
      width: '100%',
      height: '12px',
      backgroundColor: '#e5e7eb',
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '6px',
        transition: 'width 0.3s ease'
      }}></div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate(`/doctor-dashboard?tab=${sourceTab}`)}
              style={{
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: 'linear-gradient(135deg, #64748b, #475569)',
                color: 'white',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.15s ease',
                boxShadow: '0 4px 14px 0 rgba(100, 116, 139, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px 0 rgba(100, 116, 139, 0.45)';
                e.target.style.background = 'linear-gradient(135deg, #475569, #334155)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 14px 0 rgba(100, 116, 139, 0.35)';
                e.target.style.background = 'linear-gradient(135deg, #64748b, #475569)';
              }}
            >
              Back
            </button>
            <div>
              <h1 style={{ 
                fontSize: '1.875rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                margin: 0,
                marginBottom: '0.25rem'
              }}>
                Treatment Tracking - {patient.name}
              </h1>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '0.875rem',
                margin: 0
              }}>
                Comprehensive treatment progress and patient feedback
              </p>
            </div>
          </div>
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: patient.status === 'ongoing' ? '#dbeafe' : '#dcfce7',
            color: patient.status === 'ongoing' ? '#1e40af' : '#166534',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {patient.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <TabButton 
            id="overview" 
            label="Overview" 
            icon="📊" 
            active={selectedTab === 'overview'} 
            onClick={setSelectedTab} 
          />
          <TabButton 
            id="feedback" 
            label="Patient Feedback" 
            icon="💬" 
            active={selectedTab === 'feedback'} 
            onClick={setSelectedTab} 
          />
          <TabButton 
            id="sessions" 
            label="Session Details" 
            icon="📋" 
            active={selectedTab === 'sessions'} 
            onClick={setSelectedTab} 
          />
          <TabButton 
            id="therapist" 
            label="Therapist Notes" 
            icon="👩‍⚕️" 
            active={selectedTab === 'therapist'} 
            onClick={setSelectedTab} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {selectedTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Patient Information Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                👤 Patient Information
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                      NAME
                    </label>
                    <div style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '500' }}>
                      {patient.name}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                      AGE
                    </label>
                    <div style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '500' }}>
                      {patient.age} years
                    </div>
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                    PRIMARY PROBLEMS
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {patient.problems.map((problem, index) => (
                      <span key={index} style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {problem}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                    TREATMENT PLAN
                  </label>
                  <div style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '500' }}>
                    {patient.treatmentPlan}
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                    ASSIGNED THERAPIST
                  </label>
                  <div style={{ fontSize: '1rem', color: '#1f2937', fontWeight: '500' }}>
                    {patient.assignedTherapist}
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Progress Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                📈 Treatment Progress
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                    Overall Progress
                  </span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>
                    {patient.overallProgress}%
                  </span>
                </div>
                <ProgressBar percentage={patient.overallProgress} color="#4f46e5" />
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  marginTop: '0.5rem'
                }}>
                  {patient.completedSessions} of {patient.totalSessions} sessions completed
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {patient.therapyProgress.map((therapy, index) => (
                  <div key={index}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                        {therapy.name}
                      </span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280' }}>
                        {therapy.progress}%
                      </span>
                    </div>
                    <ProgressBar percentage={therapy.progress} color={therapy.color} />
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280',
                      marginTop: '0.25rem'
                    }}>
                      {therapy.sessionsCompleted} of {therapy.totalSessions} sessions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'feedback' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                💬 Patient Feedback History
              </h3>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {patient.feedbackHistory.map((feedback, index) => (
                  <div key={index} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                          Session #{feedback.sessionNumber} - {feedback.therapy}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {feedback.date} • Therapist: {feedback.therapist}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Rating:</span>
                        <div style={{ display: 'flex', gap: '0.125rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ 
                              color: i < feedback.rating ? '#fbbf24' : '#d1d5db',
                              fontSize: '1rem'
                            }}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                          {feedback.rating}/5
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        Patient Feedback:
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        lineHeight: '1.5',
                        fontStyle: 'italic'
                      }}>
                        "{feedback.patientComment}"
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>
                          Pain Level
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                          {feedback.painLevel}/10
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>
                          Energy Level
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                          {feedback.energyLevel}/10
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>
                          Sleep Quality
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                          {feedback.sleepQuality}/10
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase' }}>
                          Mood
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                          {feedback.mood}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'sessions' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937',
                  margin: 0
                }}>
                  📋 Session Details & Timeline
                </h3>
              </div>
              
              <div style={{ padding: '0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Session
                      </th>
                      <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Date & Time
                      </th>
                      <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Therapy
                      </th>
                      <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Therapist
                      </th>
                      <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Duration
                      </th>
                      <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Status
                      </th>
                      <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase' }}>
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.sessionDetails.map((session, index) => (
                      <tr key={index} style={{ borderBottom: index !== patient.sessionDetails.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                            #{session.sessionNumber}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                            {session.date}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {session.time}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                          {session.therapy}
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                          {session.therapist}
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                          {session.duration}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            backgroundColor: session.status === 'Completed' ? '#dcfce7' : session.status === 'Scheduled' ? '#dbeafe' : '#fef3c7',
                            color: session.status === 'Completed' ? '#166534' : session.status === 'Scheduled' ? '#1e40af' : '#92400e'
                          }}>
                            {session.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', maxWidth: '200px' }}>
                            {session.notes}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'therapist' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '1.5rem'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                👩‍⚕️ Therapist Notes & Observations
              </h3>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {patient.therapistNotes.map((note, index) => (
                  <div key={index} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                          {note.therapy} - Session #{note.sessionNumber}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {note.date} • By: {note.therapist}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          Clinical Observations:
                        </div>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          lineHeight: '1.5'
                        }}>
                          {note.observations}
                        </div>
                      </div>
                      
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          Recommendations:
                        </div>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          lineHeight: '1.5'
                        }}>
                          {note.recommendations}
                        </div>
                      </div>
                      
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                          Next Session Focus:
                        </div>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          lineHeight: '1.5'
                        }}>
                          {note.nextFocus}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentTracking;
