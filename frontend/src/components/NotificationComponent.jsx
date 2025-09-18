import React, { useState, useEffect } from 'react';

const NotificationComponent = ({ notifications = [], onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleDismiss = (id) => {
    setVisibleNotifications(prev => prev.filter(notif => notif.id !== id));
    if (onDismiss) {
      onDismiss(id);
    }
  };

  const getNotificationStyle = (type) => {
    const baseStyle = {
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      animation: 'slideIn 0.3s ease-out'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, backgroundColor: 'var(--ayur-100)', color: 'var(--ayur-600)', border: '1px solid var(--ayur-200)' };
      case 'error':
        return { ...baseStyle, backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' };
      case 'warning':
        return { ...baseStyle, backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
      case 'info':
      default:
        return { ...baseStyle, backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)', border: '1px solid var(--primary-200)' };
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info':
      default: return 'ℹ️';
    }
  };

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1000,
      maxWidth: '400px',
      width: '100%'
    }}>
      {visibleNotifications.map(notification => (
        <div key={notification.id} style={getNotificationStyle(notification.type)}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>{getIcon(notification.type)}</span>
            <div>
              {notification.title && (
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {notification.title}
                </div>
              )}
              <div style={{ fontSize: '0.875rem' }}>
                {notification.message}
              </div>
              {notification.timestamp && (
                <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => handleDismiss(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              opacity: 0.7,
              padding: '0',
              marginLeft: '1rem'
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
