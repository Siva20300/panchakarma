import React, { useState } from 'react';
import { dummyPatients, dummyTherapists, therapyTypes } from '../data/dummyData';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [patients] = useState(dummyPatients);
  const [therapists] = useState(dummyTherapists);

  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === 'ongoing').length,
    completedTreatments: patients.filter(p => p.status === 'completed').length,
    pendingAssignments: patients.filter(p => !p.assignedTherapist).length
  };

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
            Doctor Dashboard
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Manage patients, assign therapists, and track treatment progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 mb-6">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
                {stats.totalPatients}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Total Patients
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-500)' }}>
                {stats.activePatients}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Active Treatments
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--ayur-600)' }}>
                {stats.completedTreatments}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Completed
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-500)' }}>
                {stats.pendingAssignments}
              </div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Pending Assignments
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
            id="overview" 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="patients" 
            label="All Patients" 
            active={activeTab === 'patients'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="therapists" 
            label="Therapists" 
            active={activeTab === 'therapists'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="assignments" 
            label="Assignments" 
            active={activeTab === 'assignments'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-4">
            {/* Recent Patients */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Recent Patients</h3>
              </div>
              <div className="card-body">
                {patients.slice(0, 3).map(patient => (
                  <div key={patient.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--gray-200)'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{patient.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                        {patient.therapyType}
                      </div>
                    </div>
                    <span className={`badge badge-${patient.status === 'completed' ? 'success' : patient.status === 'ongoing' ? 'info' : 'warning'}`}>
                      {patient.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Therapists */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Available Therapists</h3>
              </div>
              <div className="card-body">
                {therapists.map(therapist => (
                  <div key={therapist.id} style={{ 
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--gray-200)'
                  }}>
                    <div style={{ fontWeight: '500' }}>{therapist.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                      {therapist.specialization}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                      {therapist.assignedPatients.length} active patients
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>All Patients</h3>
            </div>
            <div className="card-body">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--gray-200)' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Age</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Problem</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Therapy</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Therapist</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Progress</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(patient => (
                      <tr key={patient.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontWeight: '500' }}>{patient.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{patient.phone}</div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>{patient.age}</td>
                        <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{patient.problem}</td>
                        <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{patient.therapyType}</td>
                        <td style={{ padding: '0.75rem' }}>
                          {patient.assignedTherapist || (
                            <span style={{ color: 'var(--warning-500)', fontSize: '0.875rem' }}>
                              Not assigned
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ fontSize: '0.875rem' }}>
                            {patient.completedSessions}/{patient.sessions} sessions
                          </div>
                          <div style={{ 
                            width: '100px', 
                            height: '4px', 
                            backgroundColor: 'var(--gray-200)', 
                            borderRadius: '2px',
                            marginTop: '0.25rem'
                          }}>
                            <div style={{
                              width: `${(patient.completedSessions / patient.sessions) * 100}%`,
                              height: '100%',
                              backgroundColor: 'var(--success-500)',
                              borderRadius: '2px'
                            }}></div>
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span className={`badge badge-${patient.status === 'completed' ? 'success' : patient.status === 'ongoing' ? 'info' : 'warning'}`}>
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'therapists' && (
          <div className="grid grid-cols-2">
            {therapists.map(therapist => (
              <div key={therapist.id} className="card">
                <div className="card-body">
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {therapist.name}
                  </h4>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    {therapist.specialization}
                  </p>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
                    Experience: {therapist.experience}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
                    Active Patients: {therapist.assignedPatients.length}
                  </div>
                  <button className="btn btn-primary btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="card">
            <div className="card-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Patient Assignments</h3>
            </div>
            <div className="card-body">
              <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Assign therapists to patients and manage therapy plans
              </p>
              {patients.filter(p => !p.assignedTherapist).map(patient => (
                <div key={patient.id} className="card" style={{ marginBottom: '1rem' }}>
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{patient.name}</h5>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                          {patient.problem}
                        </p>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                          Recommended: {patient.therapyType}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <select className="form-select" style={{ width: '200px' }}>
                          <option value="">Select Therapist</option>
                          {therapists.map(therapist => (
                            <option key={therapist.id} value={therapist.id}>
                              {therapist.name}
                            </option>
                          ))}
                        </select>
                        <button className="btn btn-primary">
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
