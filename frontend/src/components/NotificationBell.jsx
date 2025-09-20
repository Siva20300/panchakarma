import React, { useEffect, useMemo, useRef, useState } from 'react';

const BellIcon = ({ size = 24, color = 'var(--gray-700)' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21a2 2 0 01-3.46 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Toast = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      right: '1rem',
      bottom: '1rem',
      backgroundColor: 'white',
      border: '1px solid var(--gray-200)',
      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
      borderRadius: '0.5rem',
      padding: '0.75rem 1rem',
      zIndex: 1000,
      minWidth: '260px'
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--gray-800)' }}>New Assignment</div>
      <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>{message}</div>
    </div>
  );
};

const NotificationBell = ({ therapistName, patients, assignmentCandidates = [], onViewProfile, onAccept, onReject }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const containerRef = useRef(null);

  const assignedPatients = useMemo(
    () => patients.filter(p => p.assignedTherapist === therapistName),
    [patients, therapistName]
  );

  // Seed notifications on mount
  useEffect(() => {
    const pool = assignmentCandidates.length ? assignmentCandidates : assignedPatients;
    let seed = pool.slice(0, 2).map(p => ({
      id: `seed-${p.id}`,
      patient: p,
      when: new Date().toISOString(),
      message: assignmentCandidates.length ? `${p.name} assigned to you for ${p.therapyType}` : `${p.name} has an update for ${p.therapyType}`,
      read: false,
      type: assignmentCandidates.length ? 'assignment' : 'update',
    }));
    // Ensure at least one immediate notification if possible
    if (!seed.length && pool.length) {
      const p = pool[0];
      seed = [{
        id: `seed-${p.id}`,
        patient: p,
        when: new Date().toISOString(),
        message: assignmentCandidates.length ? `${p.name} assigned to you for ${p.therapyType}` : `${p.name} has an update for ${p.therapyType}`,
        read: false,
        type: assignmentCandidates.length ? 'assignment' : 'update',
      }];
    }
    if (seed.length) {
      setNotifications(seed);
      setUnread(seed.length);
      setToast({ visible: true, message: seed[0].message });
      setTimeout(() => setToast(t => ({ ...t, visible: false })), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate frequent notifications as if doctor assigns patients
  useEffect(() => {
    const pool = assignmentCandidates.length ? assignmentCandidates : assignedPatients;
    if (!pool.length) return;
    const interval = setInterval(() => {
      const p = pool[Math.floor(Math.random() * pool.length)];
      const isAssignment = assignmentCandidates.length > 0;
      const n = {
        id: `${Date.now()}-${p.id}`,
        patient: p,
        when: new Date().toISOString(),
        message: isAssignment ? `${p.name} assigned to you for ${p.therapyType}` : `${p.name} has a new update for ${p.therapyType}`,
        read: false,
        type: isAssignment ? 'assignment' : 'update',
      };
      setNotifications(prev => [n, ...prev].slice(0, 20));
      setUnread(prev => prev + 1);
      setToast({ visible: true, message: n.message });
      setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
    }, 5000);

    return () => clearInterval(interval);
  }, [assignedPatients, assignmentCandidates]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnread(0);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); if (unread) markAllRead(); }}
        style={{
          border: '1px solid var(--gray-300)',
          background: 'white',
          borderRadius: '999px',
          padding: '0.5rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}
        aria-label="Notifications"
        title="Notifications"
      >
        <BellIcon />
        <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)', fontWeight: 600 }}>Alerts</span>
        {unread > 0 && (
          <span
            style={{
              backgroundColor: 'var(--danger-500)',
              color: 'white',
              borderRadius: '999px',
              padding: '0.125rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              lineHeight: 1
            }}
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            marginTop: '0.5rem',
            width: '360px',
            maxHeight: '60vh',
            overflow: 'auto',
            background: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
            zIndex: 100
          }}
        >
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Notifications</div>
            <button onClick={markAllRead} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>Mark all read</button>
          </div>

          {notifications.length === 0 ? (
            <div style={{ padding: '1rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>No notifications</div>
          ) : (
            <div>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '999px',
                    background: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {n.patient?.name?.[0] || 'P'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{n.patient?.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-700)', margin: '2px 0 6px' }}>{n.message}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{new Date(n.when).toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem' }}
                      onClick={(e) => { e.stopPropagation(); onViewProfile && onViewProfile(n.patient); }}
                    >
                      View Profile
                    </button>
                    {n.type === 'assignment' && (
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-success" style={{ padding: '0.25rem 0.5rem' }}
                          onClick={(e) => { e.stopPropagation(); onAccept && onAccept(n.patient); setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x)); }}
                        >
                          Accept
                        </button>
                        <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem' }}
                          onClick={(e) => { e.stopPropagation(); onReject && onReject(n.patient); setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x)); }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  );
};

export default NotificationBell;
