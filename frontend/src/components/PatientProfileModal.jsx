import React from 'react';

const Row = ({ label, value }) => (
  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem' }}>
    <div style={{ width: 120, color: 'var(--gray-600)', fontSize: '0.875rem' }}>{label}:</div>
    <div style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{value || '-'}</div>
  </div>
);

const PatientProfileModal = ({ patient, doctor, onClose }) => {
  if (!patient) return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        width: 'min(720px, 92vw)',
        borderRadius: '0.75rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>Patient Profile</div>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
        <div style={{ padding: '1rem 1.25rem' }}>
          <div className="grid grid-cols-2" style={{ gap: '1.25rem' }}>
            <div className="card" style={{ border: '1px solid var(--gray-200)', borderRadius: '0.5rem' }}>
              <div className="card-header" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--gray-200)' }}>
                <div style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Patient Details</div>
              </div>
              <div className="card-body" style={{ padding: '0.75rem 1rem' }}>
                <Row label="Name" value={patient.name} />
                <Row label="Age" value={patient.age} />
                <Row label="Phone" value={patient.phone} />
                <Row label="Email" value={patient.email} />
                <Row label="Problem" value={patient.problem} />
                <Row label="Therapy" value={patient.therapyType} />
                <Row label="Sessions" value={patient.sessions} />
                <Row label="Next Appt" value={patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleString() : 'Not scheduled'} />
              </div>
            </div>
            <div className="card" style={{ border: '1px solid var(--gray-200)', borderRadius: '0.5rem' }}>
              <div className="card-header" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--gray-200)' }}>
                <div style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Assigning Doctor</div>
              </div>
              <div className="card-body" style={{ padding: '0.75rem 1rem' }}>
                <Row label="Name" value={doctor?.name} />
                <Row label="Email" value={doctor?.email} />
                <Row label="Specialization" value={doctor?.specialization} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileModal;
