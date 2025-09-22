import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { dummyPatients, dummyTherapists, therapyTypes, detailedPatientData } from '../data/dummyData.jsx';

const PatientDetails = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the source tab from URL params or default to 'patients'
  const getSourceTab = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('from') || 'patients';
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
  
  const handleBackNavigation = () => {
    navigate(`/doctor-dashboard?tab=${sourceTab}`);
  };
  const [selectedTherapies, setSelectedTherapies] = useState([]);
  const [assignedTherapist, setAssignedTherapist] = useState('');
  const [treatmentNotes, setTreatmentNotes] = useState('');
  const [treatmentDuration, setTreatmentDuration] = useState('7');

  // Find patient data from both sources
  const patient = dummyPatients.find(p => p.id === parseInt(patientId)) || 
                  detailedPatientData.find(p => p.id === parseInt(patientId));
  
  if (!patient) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Patient not found</h2>
        <button onClick={() => navigate(`/doctor-dashboard?tab=${getSourceTab()}`)} style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Therapy recommendations based on patient problems
  const getRecommendedTherapies = (problems) => {
    const recommendations = [];
    
    problems.forEach(problem => {
      switch(problem.toLowerCase()) {
        case 'stress':
        case 'anxiety':
          recommendations.push('Shirodhara', 'Abhyanga', 'Meditation Therapy');
          break;
        case 'joint pain':
        case 'arthritis':
          recommendations.push('Kizhi', 'Abhyanga', 'Pizhichil');
          break;
        case 'digestive issues':
          recommendations.push('Virechana', 'Basti', 'Dietary Counseling');
          break;
        case 'insomnia':
          recommendations.push('Shirodhara', 'Abhyanga', 'Yoga Therapy');
          break;
        case 'hypertension':
          recommendations.push('Shirodhara', 'Meditation Therapy', 'Pranayama');
          break;
        case 'skin problems':
          recommendations.push('Udvartana', 'Herbal Steam', 'Detox Therapy');
          break;
        default:
          recommendations.push('Panchakarma Consultation', 'General Wellness');
      }
    });
    
    return [...new Set(recommendations)]; // Remove duplicates
  };

  const recommendedTherapies = getRecommendedTherapies(patient.problems || ['General Wellness']);

  const handleTherapyToggle = (therapy) => {
    setSelectedTherapies(prev => 
      prev.includes(therapy) 
        ? prev.filter(t => t !== therapy)
        : [...prev, therapy]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the treatment plan
    alert('Treatment plan saved successfully!');
    navigate(`/doctor-dashboard?tab=${sourceTab}`);
  };


  // Check if patient already has assignments
  // If status is 'ongoing' or 'completed', they should have fixed assignments
  // If status is 'pending', they can get new assignments
  const hasExistingAssignment = (patient.status === 'ongoing' || patient.status === 'completed') && 
                                (patient.assignedTherapist || patient.treatmentPlan || patient.treatmentType);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BackButton onClick={handleBackNavigation} />
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: 0
          }}>
            {hasExistingAssignment ? 'Patient Details & Assignment Status' : 'Patient Details & Treatment Assignment'}
          </h1>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Patient Information Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              👤 Patient Information
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>Name:</span>
                <span style={{ color: '#1f2937' }}>{patient.name}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>Age:</span>
                <span style={{ color: '#1f2937' }}>{patient.age}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>Treatment Type:</span>
                <span style={{ color: '#1f2937' }}>{patient.treatmentType}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>Status:</span>
                <span style={{ 
                  color: patient.status === 'ongoing' ? '#059669' : patient.status === 'completed' ? '#0284c7' : '#dc2626',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {patient.status}
                </span>
              </div>
              
              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>Problems:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(patient.problems || ['General Wellness']).map((problem, index) => (
                    <span key={index} style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {problem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Plan Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {hasExistingAssignment ? '🔒 Assigned Treatment (Fixed)' : '📋 New Treatment Assignment'}
            </h2>

            {hasExistingAssignment ? (
              // Show existing assignment details
              <div>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '0.75rem',
                  border: '2px solid #22c55e',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: '#16a34a',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🎯 Assigned Treatment Plan
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>Treatment Plan:</span>
                      <span style={{ color: '#16a34a', fontWeight: '600' }}>
                        {patient.treatmentPlan || patient.treatmentType || 'Treatment assigned'}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>Assigned Therapist:</span>
                      <span style={{ color: '#16a34a', fontWeight: '600' }}>
                        {patient.assignedTherapist || 'Therapist assigned'}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>Status:</span>
                      <span style={{
                        color: patient.status === 'ongoing' ? '#16a34a' : patient.status === 'completed' ? '#0284c7' : '#dc2626',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {patient.status}
                      </span>
                    </div>
                    
                    {patient.completedSessions !== undefined && patient.totalSessions && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        border: '1px solid #bbf7d0'
                      }}>
                        <span style={{ fontWeight: '600', color: '#374151' }}>Progress:</span>
                        <span style={{ color: '#16a34a', fontWeight: '600' }}>
                          {patient.completedSessions}/{patient.totalSessions} sessions completed
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <BackButton onClick={handleBackNavigation} />
                  </div>
                  
                  <button
                    onClick={() => navigate(`/treatment-tracking/${patient.id}?from=${sourceTab}`)}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0284c7'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0ea5e9'}
                  >
                    📊 View Progress Tracking
                  </button>
                </div>
              </div>
            ) : (
              // Show treatment planning form
              <form onSubmit={handleSubmit}>
              {/* Recommended Therapies */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '1rem' 
                }}>
                  Recommended Therapies (based on patient problems):
                </label>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {recommendedTherapies.map((therapy, index) => (
                    <label key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      border: selectedTherapies.includes(therapy) ? '2px solid #4f46e5' : '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      backgroundColor: selectedTherapies.includes(therapy) ? '#eef2ff' : 'white',
                      transition: 'all 0.2s ease'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedTherapies.includes(therapy)}
                        onChange={() => handleTherapyToggle(therapy)}
                        style={{ width: '1rem', height: '1rem' }}
                      />
                      <span style={{ 
                        fontWeight: selectedTherapies.includes(therapy) ? '600' : '500',
                        color: selectedTherapies.includes(therapy) ? '#4f46e5' : '#374151'
                      }}>
                        {therapy}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Therapist Assignment */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Assign Therapist:
                </label>
                <select
                  value={assignedTherapist}
                  onChange={(e) => setAssignedTherapist(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                  }}
                  required
                >
                  <option value="">Select a therapist...</option>
                  {dummyTherapists.map(therapist => (
                    <option key={therapist.id} value={therapist.name}>
                      {therapist.name} - {therapist.specialization}
                    </option>
                  ))}
                </select>
              </div>

              {/* Treatment Duration */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Treatment Duration (days):
                </label>
                <select
                  value={treatmentDuration}
                  onChange={(e) => setTreatmentDuration(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="21">21 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>

              {/* Treatment Notes */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Treatment Notes:
                </label>
                <textarea
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                  rows={4}
                  placeholder="Enter any specific instructions, precautions, or notes for the treatment..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
                >
                  Save Treatment Plan
                </button>
                <BackButton onClick={handleBackNavigation}>
                  Cancel
                </BackButton>
              </div>
              </form>
            )}
          </div>
        </div>

        {/* Treatment Summary */}
        {selectedTherapies.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📊 Treatment Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #0ea5e9' }}>
                <h4 style={{ color: '#0284c7', fontWeight: '600', marginBottom: '0.5rem' }}>Selected Therapies</h4>
                <p style={{ color: '#0c4a6e', margin: 0 }}>{selectedTherapies.join(', ')}</p>
              </div>
              {assignedTherapist && (
                <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #22c55e' }}>
                  <h4 style={{ color: '#16a34a', fontWeight: '600', marginBottom: '0.5rem' }}>Assigned Therapist</h4>
                  <p style={{ color: '#14532d', margin: 0 }}>{assignedTherapist}</p>
                </div>
              )}
              <div style={{ padding: '1rem', backgroundColor: '#fefce8', borderRadius: '0.5rem', border: '1px solid #eab308' }}>
                <h4 style={{ color: '#ca8a04', fontWeight: '600', marginBottom: '0.5rem' }}>Duration</h4>
                <p style={{ color: '#713f12', margin: 0 }}>{treatmentDuration} days</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
