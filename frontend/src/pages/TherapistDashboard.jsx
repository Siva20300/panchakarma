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
      <style>
        {`
          /* ===== THERAPIST DASHBOARD RESPONSIVE STYLES ===== */
          
          /* DESKTOP (Default) */
          .therapist-dashboard-container {
            padding: 2rem 0;
          }
          
          .therapist-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          
          .therapist-title {
            font-size: 2.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: var(--primary-600);
          }
          
          .therapist-subtitle {
            color: var(--gray-600);
          }
          
          .therapist-stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .therapist-tabs {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-bottom: 1.25rem;
          }
          
          .therapist-card {
            background: white;
            border-radius: 0.75rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          /* TABLET (768px - 1024px) */
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            .therapist-dashboard-container {
              padding: 1.5rem 0;
            }
            
            .therapist-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }
            
            .therapist-title {
              font-size: 2rem;
            }
            
            .therapist-stats-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
            
            .therapist-tabs {
              justify-content: center;
              gap: 0.25rem;
            }
            
            .tab-button-responsive {
              padding: 0.75rem 1rem !important;
              font-size: 0.875rem !important;
            }
          }
          
          /* MOBILE (0px - 767px) */
          @media screen and (max-width: 767px) {
            .therapist-dashboard-container {
              padding: 1rem 0 !important;
            }
            
            .container {
              padding: 0 1rem !important;
            }
            
            .therapist-header {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              gap: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .therapist-title {
              font-size: 1.75rem !important;
              line-height: 1.2 !important;
            }
            
            .therapist-subtitle {
              font-size: 0.9rem !important;
              text-align: center !important;
            }
            
            .therapist-stats-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .therapist-tabs {
              flex-direction: column !important;
              gap: 0.5rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .tab-button-responsive {
              width: 100% !important;
              padding: 1rem !important;
              font-size: 1rem !important;
              text-align: center !important;
            }
            
            .therapist-card {
              padding: 1rem !important;
              border-radius: 0.5rem !important;
              margin-bottom: 1rem !important;
            }
            
            .therapist-actions {
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
            
            .therapist-actions .btn {
              width: 100% !important;
              padding: 1rem !important;
              font-size: 1rem !important;
            }
            
            .patient-table {
              font-size: 0.75rem !important;
              overflow-x: auto !important;
            }
            
            .patient-table th,
            .patient-table td {
              padding: 0.5rem 0.25rem !important;
              white-space: nowrap !important;
            }
          }
          
          /* SMALL MOBILE (320px - 480px) */
          @media screen and (max-width: 480px) {
            .therapist-dashboard-container {
              padding: 0.5rem 0 !important;
            }
            
            .container {
              padding: 0 0.75rem !important;
            }
            
            .therapist-title {
              font-size: 1.5rem !important;
            }
            
            .therapist-subtitle {
              font-size: 0.85rem !important;
            }
            
            .therapist-card {
              padding: 0.75rem !important;
            }
            
            .tab-button-responsive {
              padding: 0.875rem !important;
            }
          }
        `}
      </style>
      
      <div className="container">
        {/* Header */}
        <div className="therapist-header mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <h1 className="therapist-title" style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-600)' }}>
              Welcome, {therapistName} 🧘‍♀️
            </h1>
            <p className="therapist-subtitle" style={{ color: 'var(--gray-600)' }}>
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

        {/* Hero / Quick Actions Card */}
        <div className="card" style={{ marginBottom: '1.25rem', overflow: 'hidden', border: '1px solid var(--gray-200)', borderRadius: '0.75rem', boxShadow: '0 10px 20px rgba(0,0,0,0.06)', animation: 'fadeSlideIn 450ms ease both' }}>
          <style>{`@keyframes fadeSlideIn {0%{opacity:0;transform:translateY(6px)}100%{opacity:1;transform:translateY(0)}}`}</style>
          <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--gray-800)' }}>Welcome back, {therapistName}</div>
              <div style={{ color: 'var(--gray-600)', marginTop: 4 }}>Review today’s schedule, new assignments, and session updates.</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Today’s Schedule</button>
              <button className="btn btn-secondary">New Assignment</button>
              <button className="btn btn-outline">View Reports</button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="therapist-stats-grid grid grid-cols-3 mb-6">
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

        {/* Tabs - pill styled */}
        <div className="therapist-tabs" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <TabButton id="assigned" label="Assigned Patients" active={activeTab === 'assigned'} onClick={setActiveTab} icon="👥" />
          <TabButton id="sessions" label="Session Updates" active={activeTab === 'sessions'} onClick={setActiveTab} icon="🗓️" />
          <TabButton id="reports" label="My Reports" active={activeTab === 'reports'} onClick={setActiveTab} icon="📄" />
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                  <div key={d} style={{ border: '1px solid var(--gray-200)', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700 }}>{d}</div>
                    <div style={{ color: 'var(--gray-600)', fontSize: '0.75rem' }}>Appts: {Math.floor(Math.random()*3)}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Today</div>
                <div className="grid grid-cols-1 gap-2">
                  {dummyBookings.filter(b => b.therapistName===therapistName || !b.therapistName).map(b => (
                    <div key={b.id} className="card" style={{ border: '1px solid var(--gray-200)' }}>
                      <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{b.patientName}</div>
                          <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>{b.therapyType}</div>
                        </div>
                        <div style={{ color: 'var(--gray-700)' }}>{b.time}</div>
                      </div>
                    </div>
                  ))}
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
    </div>
  );
};

export default TherapistDashboard;

