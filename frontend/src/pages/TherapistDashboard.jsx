import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dummyPatients, dummyFeedback, dummyUsers, dummyBookings, dummyFoodDiets } from '../data/dummyData.jsx';
import CircularProgress from '../components/CircularProgress';
import SessionProgressBar from '../components/SessionProgressBar';
import NotificationBell from '../components/NotificationBell';
import PatientProfileModal from '../components/PatientProfileModal';

const TherapistDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('assigned');
  const therapistName = user?.name || 'Therapist';
  const [patients, setPatients] = useState(dummyPatients.filter(p => p.assignedTherapist === therapistName));
  const [feedback] = useState(dummyFeedback);
  const [profileModal, setProfileModal] = useState({ open: false, patient: null });
  const [showDietForm, setShowDietForm] = useState(false);
  const [selectedPatientForDiet, setSelectedPatientForDiet] = useState(null);
  const [foodDiets, setFoodDiets] = useState(dummyFoodDiets);
  const assigningDoctor = dummyUsers.find(u => u.role === 'doctor') || { name: 'Assigning Doctor' };
  const assignmentCandidates = dummyPatients.filter(p => !p.assignedTherapist);

  // UI state for filters/search
  const [statusFilter, setStatusFilter] = useState('all'); // all|ongoing|completed|pending
  const [searchQuery, setSearchQuery] = useState('');
  const [appointmentModal, setAppointmentModal] = useState({ open: false, appt: null });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));
  const weekInfo = useMemo(() => {
    const base = new Date(selectedDate);
    const mondayOffset = (base.getDay() + 6) % 7; // Monday as 0
    const monday = new Date(base);
    monday.setDate(base.getDate() - mondayOffset);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const count = dummyBookings.filter(
        (b) => (b.therapistName === therapistName || !b.therapistName) && b.date === iso
      ).length;
      return {
        dateObj: d,
        iso,
        label: d.toLocaleDateString(undefined, { weekday: 'short' }),
        count,
      };
    });
    return days; // Monday..Sunday
  }, [selectedDate, therapistName]);

  const handleViewProfile = (patient) => {
    setProfileModal({ open: true, patient });
  };

  const handleCloseProfile = () => setProfileModal({ open: false, patient: null });

  const handleAcceptPatient = (patient) => {
    // If patient already in list, do nothing
    if (patients.some(p => p.id === patient.id)) return;
    const newPatient = {
      ...patient,
      assignedTherapist: therapistName,
      completedSessions: 0,
      status: 'ongoing'
    };
    setPatients(prev => [newPatient, ...prev]);
  };

  const handleRejectPatient = (patient) => {
    // For demo: no-op, could log or show toast
  };

  const TabButton = ({ id, label, active, onClick, icon }) => (
    <button
      aria-pressed={active}
      onClick={() => onClick(id)}
      style={{
        padding: '0.625rem 1rem',
        border: `1px solid ${active ? 'var(--primary-600)' : 'var(--gray-300)'}`,
        backgroundColor: active ? 'var(--primary-600)' : 'white',
        color: active ? 'white' : 'var(--gray-700)',
        borderRadius: '999px',
        cursor: 'pointer',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: active ? '0 6px 16px rgba(37,99,235,0.25)' : '0 1px 2px rgba(0,0,0,0.04)',
        transition: 'all 200ms ease'
      }}
    >
      {icon && <span aria-hidden>{icon}</span>}
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-600)' }}>
              Welcome, {therapistName} 🧘‍♀️
            </h1>
            <p style={{ color: 'var(--gray-600)' }}>
              Manage your assigned patients and update therapy sessions
            </p>
          </div>
          <NotificationBell 
            therapistName={therapistName} 
            patients={[...patients]} 
            assignmentCandidates={assignmentCandidates}
            onViewProfile={handleViewProfile}
            onAccept={handleAcceptPatient}
            onReject={handleRejectPatient}
          />
        </div>

        {/* Removed hero/quick actions section as requested */}

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

        {/* View Reports quick button removed as requested */}

        {/* Tabs - pill styled */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <TabButton id="assigned" label="Assigned Patients" active={activeTab === 'assigned'} onClick={setActiveTab} icon="👥" />
          <TabButton id="newAssignments" label="New Assignments" active={activeTab === 'newAssignments'} onClick={setActiveTab} icon="🆕" />
          <TabButton id="sessions" label="Session Updates" active={activeTab === 'sessions'} onClick={setActiveTab} icon="🗓️" />
          <TabButton id="reports" label="Reports" active={activeTab === 'reports'} onClick={setActiveTab} icon="📄" />
          <TabButton id="feedback" label="Patient Feedback" active={activeTab === 'feedback'} onClick={setActiveTab} icon="⭐" />
          <TabButton id="schedule" label="Schedule" active={activeTab === 'schedule'} onClick={setActiveTab} icon="📅" />
        </div>

        {/* Tab Content */}
        {activeTab === 'assigned' && (
          <div>
            {/* Filters & search */}
            <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['all','ongoing','completed','pending'].map(k => (
                  <button key={k} onClick={() => setStatusFilter(k)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      border: `1px solid ${statusFilter===k? 'var(--primary-600)':'var(--gray-300)'}`,
                      background: statusFilter===k? 'var(--primary-50)': 'white',
                      color: statusFilter===k? 'var(--primary-700)':'var(--gray-700)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >{k[0].toUpperCase()+k.slice(1)}</button>
                ))}
              </div>
              <input
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                placeholder="Search patients..."
                style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--gray-300)', borderRadius: '0.5rem', minWidth: 220 }}
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4">
              {patients
                .filter(p => statusFilter==='all' ? true : p.status===statusFilter)
                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(patient => (
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
                      
                      {/* Segmented Session Progress (pop animation) */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Sessions Schedule</div>
                        <SessionProgressBar 
                          key={`${patient.id}-${patient.completedSessions}`}
                          total={patient.sessions}
                          completed={patient.completedSessions}
                          height={16}
                          gap={8}
                          animate={true}
                        />
                      </div>

                      {/* Progress moved to right side */}

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

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-secondary">Message</button>
                        <button className="btn btn-outline">Reschedule</button>
                        <button className="btn btn-success">Mark Session Done</button>
                      </div>
                    </div>
                    
                    <div style={{ marginLeft: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <CircularProgress
                        percentage={(patient.completedSessions / patient.sessions) * 100}
                        size={90}
                        strokeWidth={10}
                        color="var(--success-500)"
                        backgroundColor="var(--gray-200)"
                        animationDuration={1500}
                        showPercentage={true}
                        label={`${patient.completedSessions}/${patient.sessions} Sessions`}
                      />
                      <span className={`badge badge-${patient.status === 'completed' ? 'success' : patient.status === 'ongoing' ? 'info' : 'warning'}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {activeTab === 'newAssignments' && (
          <div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>New Assignment Requests</h3>
              </div>
              <div className="card-body">
                {assignmentCandidates.length === 0 ? (
                  <div style={{ color: 'var(--gray-600)' }}>No new assignments at the moment.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {assignmentCandidates.map(candidate => (
                      <div key={candidate.id} className="card">
                        <div className="card-body">
                          <div className="flex justify-between items-start">
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{candidate.name}</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                                <div>
                                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Problem:</span>
                                  <span style={{ marginLeft: '0.5rem' }}>{candidate.problem}</span>
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Therapy:</span>
                                  <span style={{ marginLeft: '0.5rem', fontWeight: 500 }}>{candidate.therapyType}</span>
                                </div>
                              </div>
                            </div>
                            <div style={{ marginLeft: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <button className="btn btn-outline" onClick={() => handleViewProfile(candidate)}>View Profile</button>
                              <button className="btn btn-primary" onClick={() => handleAcceptPatient(candidate)}>Accept</button>
                              <button className="btn btn-secondary" onClick={() => handleRejectPatient(candidate)}>Reject</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Recent Session Updates</h3>
            </div>
            <div className="card-body">
              <div style={{ position: 'relative', marginLeft: '1rem' }}>
                <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: 'var(--gray-200)' }} />
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {patients.filter(p=>p.status!=='pending').map(patient => (
                    <div key={patient.id} style={{ position: 'relative', paddingLeft: '2rem' }}>
                      <span style={{ position: 'absolute', left: 0, top: 6, width: 16, height: 16, borderRadius: 999, background: patient.status==='completed' ? 'var(--success-500)' : 'var(--primary-500)', boxShadow: '0 0 0 4px rgba(59,130,246,0.12)' }}></span>
                      <div style={{ fontWeight: 700 }}>{patient.name} • <span style={{ color: 'var(--gray-600)' }}>{patient.therapyType}</span></div>
                      <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Session {Math.min(patient.completedSessions + 1, patient.sessions)} of {patient.sessions} • {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString() : '–'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3].map(id => (
              <div key={id} className="card" style={{ border: '1px solid var(--gray-200)' }}>
                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--gray-800)' }}>Report #{id}</div>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Generated on {new Date().toLocaleDateString()}</div>
                  </div>
                  <button className="btn btn-primary">Download</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Weekly Schedule</h3>
            </div>
            <div className="card-body">
              {/* Date selector to view appointments for any day */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Select Date:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ border: '1px solid var(--gray-300)', borderRadius: 8, padding: '0.35rem 0.5rem' }}
                  />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {weekInfo.map((d) => {
                  const isSelected = d.iso === selectedDate;
                  return (
                    <button
                      key={d.iso}
                      onClick={() => setSelectedDate(d.iso)}
                      style={{
                        border: `1px solid ${isSelected ? 'var(--primary-600)' : 'var(--gray-200)'}`,
                        borderRadius: '0.5rem',
                        padding: '0.5rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: isSelected ? 'var(--primary-50)' : 'white',
                        color: isSelected ? 'var(--primary-700)' : 'inherit',
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{d.label}</div>
                      <div style={{ color: 'var(--gray-600)', fontSize: '0.75rem' }}>Appts: {d.count}</div>
                      <div style={{ color: 'var(--gray-500)', fontSize: '0.75rem' }}>{new Date(d.iso).getDate()}</div>
                    </button>
                  );
                })}
              </div>
              <div>
                <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Appointments for {new Date(selectedDate).toLocaleDateString()}</div>
                <div className="grid grid-cols-1 gap-2">
                  {dummyBookings
                    .filter(b => (b.therapistName===therapistName || !b.therapistName) && b.date === selectedDate)
                    .map(b => (
                    <div key={b.id} className="card" style={{ border: '1px solid var(--gray-200)' }}>
                      <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{b.patientName}</div>
                          <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>{b.therapyType}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ color: 'var(--gray-700)' }}>{b.time}</div>
                          <button className="btn btn-outline" onClick={() => setAppointmentModal({ open: true, appt: b })}>View Updates</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {dummyBookings.filter(b => (b.therapistName===therapistName || !b.therapistName) && b.date === selectedDate).length === 0 && (
                    <div className="card" style={{ border: '1px dashed var(--gray-300)' }}>
                      <div className="card-body" style={{ color: 'var(--gray-600)' }}>
                        No appointments for the selected date.
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
      {profileModal.open && profileModal.patient && (
        <PatientProfileModal 
          patient={profileModal.patient}
          doctor={assigningDoctor}
          onClose={handleCloseProfile}
        />
      )}

      {/* Appointment Updates Modal */}
      {appointmentModal.open && appointmentModal.appt && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', width: '90%', maxWidth: 560, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontWeight: 800 }}>Appointment Updates</h3>
              <button
                onClick={() => setAppointmentModal({ open: false, appt: null })}
                style={{ background: 'none', border: '1px solid var(--gray-300)', borderRadius: 8, padding: '0.25rem 0.5rem', cursor: 'pointer' }}
              >Close</button>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 700 }}>{appointmentModal.appt.patientName}</div>
              <div style={{ color: 'var(--gray-600)' }}>{appointmentModal.appt.therapyType}</div>
              <div style={{ color: 'var(--gray-800)', marginTop: 4 }}>Time: {appointmentModal.appt.time}</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Recent Updates</div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                <li>Appointment booked • {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                <li>Reminder sent • {new Date().toLocaleDateString()} 09:00 AM</li>
                <li>Confirmed by patient • {new Date().toLocaleDateString()} 09:30 AM</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistDashboard;

