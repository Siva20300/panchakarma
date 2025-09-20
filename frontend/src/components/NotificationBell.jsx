import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';

const NotificationBell = ({ userType = 'patient' }) => {
  const { notifications, markNotificationAsRead, bookings, addNotification } = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [reminders, setReminders] = useState([]);

  // Add therapy-specific notifications on component mount
  useEffect(() => {
    if (userType === 'patient') {
      // Add sample therapist messages and therapy reminders
      const therapyNotifications = [
        {
          id: 'therapy_msg_1',
          type: 'therapist_message',
          title: 'Message from Dr. Priya Sharma',
          message: 'Please avoid heavy meals 2 hours before your Shirodhara session tomorrow. Drink plenty of warm water.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false,
          recipient: 'patient',
          therapistName: 'Dr. Priya Sharma'
        },
        {
          id: 'therapy_reminder_1',
          type: 'therapy_reminder',
          title: 'Upcoming Panchakarma Session',
          message: 'Your Abhyanga therapy is scheduled for tomorrow at 10:00 AM. Please arrive 15 minutes early.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          read: false,
          recipient: 'patient',
          therapyType: 'Abhyanga'
        },
        {
          id: 'diet_update_1',
          type: 'diet_update',
          title: 'Diet Plan Updated',
          message: 'Dr. Rajesh Kumar has updated your food diet plan. Please check the Food Diet tab for new recommendations.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          read: false,
          recipient: 'patient',
          doctorName: 'Dr. Rajesh Kumar'
        },
        {
          id: 'session_complete_1',
          type: 'session_completed',
          title: 'Session Completed',
          message: 'Your Shirodhara session has been completed. Please provide feedback to help us improve your experience.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: true,
          recipient: 'patient',
          therapyType: 'Shirodhara'
        }
      ];

      // Add these notifications if they don't exist
      therapyNotifications.forEach(notif => {
        if (!notifications.find(n => n.id === notif.id)) {
          addNotification(notif);
        }
      });
    }
  }, [userType, notifications, addNotification]);

  // Filter notifications by user type
  const userNotifications = notifications.filter(notif => notif.recipient === userType);
  const unreadCount = userNotifications.filter(notif => !notif.read).length;

  // Countdown timer for upcoming appointments
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      // Get upcoming therapy sessions
      const upcomingTherapies = [
        {
          id: 'upcoming_1',
          title: 'Abhyanga Therapy',
          therapist: 'Dr. Priya Sharma',
          time: new Date(now.getTime() + 14 * 60 * 60 * 1000), // 14 hours from now (tomorrow morning)
          timeUntil: 14 * 60 * 60 * 1000
        },
        {
          id: 'upcoming_2', 
          title: 'Shirodhara Session',
          therapist: 'Dr. Rajesh Kumar',
          time: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          timeUntil: 3 * 24 * 60 * 60 * 1000
        }
      ].filter(therapy => therapy.timeUntil > 0 && therapy.timeUntil < 7 * 24 * 60 * 60 * 1000); // Next 7 days

      setReminders(upcomingTherapies);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [notifications, userType]);

  const formatTimeUntil = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_confirmed':
        return '✅';
      case 'new_booking':
        return '📅';
      case 'reminder':
        return '⏰';
      case 'cancellation':
        return '❌';
      case 'therapist_message':
        return '👩‍⚕️';
      case 'therapy_reminder':
        return '🧘‍♀️';
      case 'diet_update':
        return '🍽️';
      case 'session_completed':
        return '✨';
      case 'payment_reminder':
        return '💳';
      case 'progress_update':
        return '📈';
      default:
        return '📢';
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'relative',
            padding: '0.75rem',
            backgroundColor: unreadCount > 0 ? 'var(--primary-50)' : 'transparent',
            border: unreadCount > 0 ? '2px solid var(--primary-200)' : '2px solid transparent',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            boxShadow: unreadCount > 0 ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
            background: unreadCount > 0 
              ? 'linear-gradient(135deg, var(--primary-50), var(--primary-100))' 
              : 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.25)';
            if (unreadCount > 0) {
              e.target.style.background = 'linear-gradient(135deg, var(--primary-100), var(--primary-200))';
            } else {
              e.target.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e1)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = unreadCount > 0 ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)';
            if (unreadCount > 0) {
              e.target.style.background = 'linear-gradient(135deg, var(--primary-50), var(--primary-100))';
            } else {
              e.target.style.background = 'linear-gradient(135deg, #f8fafc, #e2e8f0)';
            }
          }}
        >
          <span style={{
            display: 'inline-block',
            filter: unreadCount > 0 ? 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))' : 'none',
            animation: unreadCount > 0 ? 'bellRing 2s infinite' : 'none'
          }}>
            🔔
          </span>
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '0.125rem',
              right: '0.125rem',
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
              animation: 'pulse 2s infinite'
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes bellRing {
            0%, 50%, 100% { transform: rotate(0deg); }
            10%, 30% { transform: rotate(-10deg); }
            20%, 40% { transform: rotate(10deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>

        {/* Notification Dropdown */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: '450px',
            maxHeight: '600px',
            backgroundColor: 'white',
            border: '1px solid var(--gray-200)',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            overflowY: 'auto'
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem',
              borderBottom: '1px solid var(--gray-200)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--gray-900)'
              }}>
                Notifications
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  color: 'var(--gray-500)'
                }}
              >
                ×
              </button>
            </div>

            {/* Upcoming Therapy Sessions */}
            {reminders.length > 0 && (
              <div style={{
                padding: '1.25rem',
                backgroundColor: '#f0f9ff',
                borderBottom: '1px solid var(--gray-200)'
              }}>
                <h5 style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1e40af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🧘‍♀️ Upcoming Therapy Sessions
                </h5>
                {reminders.map(reminder => (
                  <div key={reminder.id} style={{
                    backgroundColor: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem',
                    border: '1px solid #dbeafe'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1e40af',
                      marginBottom: '0.25rem'
                    }}>
                      {reminder.title}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      👩‍⚕️ with {reminder.therapist}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#059669',
                      fontWeight: '500'
                    }}>
                      ⏰ in {formatTimeUntil(reminder.timeUntil)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notifications List */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {userNotifications.length === 0 ? (
                <div style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  color: 'var(--gray-500)',
                  fontSize: '0.875rem'
                }}>
                  No notifications yet
                </div>
              ) : (
                userNotifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid var(--gray-100)',
                      cursor: 'pointer',
                      backgroundColor: notification.read ? 'transparent' : '#f0f9ff',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'var(--gray-50)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = notification.read ? 'transparent' : '#f0f9ff';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: notification.read ? '400' : '600',
                          color: 'var(--gray-900)',
                          marginBottom: '0.5rem'
                        }}>
                          {notification.title}
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: 'var(--gray-600)',
                          marginBottom: '0.5rem',
                          lineHeight: '1.4'
                        }}>
                          {notification.message}
                        </div>
                        <div style={{
                          fontSize: '0.8125rem',
                          color: 'var(--gray-500)'
                        }}>
                          {new Date(notification.timestamp).toLocaleString()}
                        </div>
                      </div>
                      {!notification.read && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#3b82f6',
                          borderRadius: '50%',
                          marginTop: '0.25rem'
                        }}></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationBell;
