import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dummyPatients, dummyTherapists, therapyTypes, therapistNotifications } from '../data/dummyData.jsx';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [patients, setPatients] = useState(dummyPatients);
  const [therapists] = useState(dummyTherapists);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(therapistNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [animatingNotifications, setAnimatingNotifications] = useState(new Set());

  // Handle URL parameters to set active tab
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['overview', 'patients', 'assignments', 'progress'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === 'ongoing').length,
    completedTreatments: patients.filter(p => p.status === 'completed').length,
    pendingAssignments: patients.filter(p => !p.assignedTherapist).length
  };

  const assignTherapist = (patientId, therapistId) => {
    const therapist = therapists.find(t => t.id === parseInt(therapistId));
    setPatients(prev => prev.map(patient => 
      patient.id === patientId 
        ? { ...patient, assignedTherapist: therapist.name }
        : patient
    ));
  };

  // Notification helper functions
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const unreadCount = unreadNotifications.length;

  const markNotificationAsRead = (notificationId) => {
    // Add animation state
    setAnimatingNotifications(prev => new Set(prev).add(notificationId));
    
    // Remove animation after animation completes
    setTimeout(() => {
      setAnimatingNotifications(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }, 600);
    
    // Mark as read after a short delay to show animation
    setTimeout(() => {
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      ));
    }, 300);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'session_update': return '📋';
      case 'appointment_missed': return '⚠️';
      case 'health_concern': return '🚨';
      case 'positive_update': return '✅';
      case 'consultation_request': return '👨‍⚕️';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const MenuItem = ({ id, label, icon, active, onClick }) => (
    <button
      onClick={() => {
        onClick(id);
        setMenuOpen(false); // Close menu after selection
      }}
      style={{
        width: '100%',
        padding: '1.25rem 1.5rem',
        border: 'none',
        backgroundColor: active ? '#4f46e5' : 'transparent',
        color: active ? 'white' : '#6b7280',
        borderRadius: '1rem',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        marginBottom: '0.75rem',
        fontSize: '1.125rem',
        justifyContent: 'flex-start',
        minHeight: '60px'
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.target.style.backgroundColor = '#f3f4f6';
          e.target.style.transform = 'translateX(4px)';
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.transform = 'translateX(0)';
        }
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* CSS Keyframes for notification animation */}
      <style>
        {`
          @keyframes notificationSwipe {
            0% { transform: translateX(0px); }
            15% { transform: translateX(20px); }
            30% { transform: translateX(-20px); }
            45% { transform: translateX(10px); }
            60% { transform: translateX(-5px); }
            75% { transform: translateX(3px); }
            90% { transform: translateX(-1px); }
            100% { transform: translateX(0px); }
          }
          
          /* ===== DOCTOR DASHBOARD RESPONSIVE STYLES ===== */
          
          /* DESKTOP (Default) */
          .doctor-dashboard-container {
            min-height: 100vh;
            background-color: #f8fafc;
          }
          
          .doctor-top-nav {
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            position: relative;
            z-index: 999;
          }
          
          .doctor-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 250px;
            height: 100vh;
            background: white;
            border-right: 1px solid #e5e7eb;
            z-index: 998;
            transform: translateX(0);
            transition: transform 0.3s ease;
          }
          
          .doctor-main-content {
            margin-left: 250px;
            padding: 2rem;
            min-height: calc(100vh - 80px);
          }
          
          .doctor-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .doctor-content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
          }
          
          /* TABLET (768px - 1024px) */
          @media screen and (min-width: 768px) and (max-width: 1024px) {
            .doctor-top-nav {
              padding: 1rem 1.5rem;
            }
            
            .doctor-sidebar {
              width: 220px;
            }
            
            .doctor-main-content {
              margin-left: 220px;
              padding: 1.5rem;
            }
            
            .doctor-stats-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
            
            .doctor-content-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            
            .doctor-table {
              font-size: 0.875rem;
            }
            
            .doctor-card {
              padding: 1rem;
            }
          }
          
          /* MOBILE (0px - 767px) */
          @media screen and (max-width: 767px) {
            .doctor-top-nav {
              padding: 0.75rem 1rem !important;
            }
            
            .doctor-sidebar {
              width: 280px !important;
              transform: translateX(-100%) !important;
              box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1) !important;
            }
            
            .doctor-sidebar.open {
              transform: translateX(0) !important;
            }
            
            .doctor-main-content {
              margin-left: 0 !important;
              padding: 1rem !important;
              width: 100% !important;
            }
            
            .doctor-title {
              font-size: 1.25rem !important;
              font-weight: 600 !important;
            }
            
            .doctor-stats-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .doctor-content-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            
            .doctor-card {
              padding: 1rem !important;
              border-radius: 0.5rem !important;
            }
            
            .doctor-table {
              font-size: 0.75rem !important;
              overflow-x: auto !important;
            }
            
            .doctor-table th,
            .doctor-table td {
              padding: 0.5rem 0.25rem !important;
              white-space: nowrap !important;
            }
            
            .notification-panel {
              width: 100% !important;
              max-width: 100% !important;
              right: 0 !important;
              left: 0 !important;
              border-radius: 0 !important;
              height: 100vh !important;
              max-height: 100vh !important;
            }
            
            .hamburger-menu {
              display: block !important;
            }
            
            .mobile-overlay {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              background: rgba(0, 0, 0, 0.5) !important;
              z-index: 997 !important;
              display: block !important;
            }
          }
          
          /* SMALL MOBILE (320px - 480px) */
          @media screen and (max-width: 480px) {
            .doctor-top-nav {
              padding: 0.5rem 0.75rem !important;
            }
            
            .doctor-main-content {
              padding: 0.75rem !important;
            }
            
            .doctor-title {
              font-size: 1.125rem !important;
            }
            
            .doctor-card {
              padding: 0.75rem !important;
            }
            
            .doctor-table {
              font-size: 0.7rem !important;
            }
            
            .doctor-sidebar {
              width: 260px !important;
            }
          }
        `}
      </style>
      {/* Top Navigation Bar with Hamburger Menu */}
      <div className="doctor-top-nav" style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'relative',
        zIndex: 999
      }}>
        {/* Left side - Hamburger + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: '0.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              gap: '3px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{
              width: '22px',
              height: '3px',
              backgroundColor: '#4f46e5',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}></div>
            <div style={{
              width: '22px',
              height: '3px',
              backgroundColor: '#4f46e5',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}></div>
            <div style={{
              width: '22px',
              height: '3px',
              backgroundColor: '#4f46e5',
              borderRadius: '2px',
              transition: 'all 0.3s ease'
            }}></div>
          </button>

          {/* Title */}
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: 0
          }}>
            Doctor Dashboard
          </h1>
        </div>

        {/* Right side - Notifications & User info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              style={{
                padding: '0.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: '#6b7280',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.color = '#4f46e5';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              🔔
              {/* Notification Count Badge - Always show for testing */}
              <span style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                backgroundColor: '#dc2626',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1'
              }}>
                {unreadCount || '4'}
              </span>
            </button>
          </div>

          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{user?.name || 'Doctor'}</span>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 'bold'
          }}>
            DS
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '73px',
          left: '2rem',
          backgroundColor: 'white',
          borderRadius: '1.25rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          minWidth: '300px',
          zIndex: 1001
        }}>
          <nav>
            <MenuItem 
              id="overview" 
              label="Overview" 
              icon="📊" 
              active={activeTab === 'overview'} 
              onClick={setActiveTab} 
            />
            <MenuItem 
              id="patients" 
              label="Patients" 
              icon="👥" 
              active={activeTab === 'patients'} 
              onClick={setActiveTab} 
            />
            <MenuItem 
              id="assignments" 
              label="Assignments" 
              icon="📋" 
              active={activeTab === 'assignments'} 
              onClick={setActiveTab} 
            />
            <MenuItem 
              id="progress" 
              label="Progress" 
              icon="📈" 
              active={activeTab === 'progress'} 
              onClick={setActiveTab} 
            />
          </nav>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 1000
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Notification Dropdown */}
      {notificationOpen && (
        <div style={{
          position: 'fixed',
          top: '73px',
          right: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb',
          minWidth: '400px',
          maxWidth: '500px',
          maxHeight: '500px',
          zIndex: 1001,
          overflow: 'hidden'
        }}>
          {/* Notification Header */}
          <div style={{
            padding: '1.5rem 1.5rem 1rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0
            }}>
              Notifications ({unreadCount} unread)
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔔</div>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const isAnimating = animatingNotifications.has(notification.id);
                return (
                  <div
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid #f3f4f6',
                      cursor: 'pointer',
                      backgroundColor: notification.isRead ? 'white' : '#f8fafc',
                      transition: 'background-color 0.2s ease',
                      animation: isAnimating 
                        ? 'notificationSwipe 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isAnimating) {
                        e.target.style.backgroundColor = '#f1f5f9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isAnimating) {
                        e.target.style.backgroundColor = notification.isRead ? 'white' : '#f8fafc';
                      }
                    }}
                  >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem', marginTop: '0.125rem' }}>
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {notification.therapistName}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#6b7280'
                          }}>
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          {!notification.isRead && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: getPriorityColor(notification.priority)
                            }} />
                          )}
                        </div>
                      </div>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#374151',
                        margin: '0 0 0.5rem 0',
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </p>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        Patient: <span style={{ fontWeight: '500' }}>{notification.patientName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Overlay to close notification dropdown when clicking outside */}
      {notificationOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
            zIndex: 1000
          }}
          onClick={() => setNotificationOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={{ padding: '1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Welcome Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '0.5rem' 
          }}>
            Welcome back, {user?.name || 'Doctor'} 👨‍⚕️
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem' 
          }}>
            Here's an overview of your practice and patient management
          </p>
        </div>

        {/* Compact Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#4f46e5', marginBottom: '0.25rem' }}>
              {stats.totalPatients}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '500' }}>
              Total Patients
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.25rem' }}>
              {stats.activePatients}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '500' }}>
              Active Treatments
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.25rem' }}>
              {stats.completedTreatments}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '500' }}>
              Completed
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.25rem' }}>
              {stats.pendingAssignments}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: '500' }}>
              Pending Assignments
            </div>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Recent Patients */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Recent Patients</h3>
              </div>
              <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
                {patients.slice(0, 3).map(patient => (
                  <div key={patient.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: patient.id !== patients.slice(0, 3)[patients.slice(0, 3).length - 1].id ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.875rem' }}>{patient.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {patient.therapyType}
                      </div>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: patient.status === 'completed' ? '#dcfce7' : patient.status === 'ongoing' ? '#dbeafe' : '#fef3c7',
                      color: patient.status === 'completed' ? '#166534' : patient.status === 'ongoing' ? '#1e40af' : '#92400e'
                    }}>
                      {patient.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Therapists */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Available Therapists</h3>
              </div>
              <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
                {therapists.map(therapist => (
                  <div key={therapist.id} style={{ 
                    padding: '0.75rem 0',
                    borderBottom: therapist.id !== therapists[therapists.length - 1].id ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.875rem' }}>{therapist.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      {therapist.specialization}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {therapist.assignedPatients.length} active patients
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>All Patients</h3>
            </div>
            <div style={{ padding: '0', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Problem</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Therapy</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Therapist</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meeting Type</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progress</th>
                    <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '0.75rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient.id} style={{ borderBottom: index !== patients.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <Link 
                          to={`/patient-details/${patient.id}?from=${activeTab}`}
                          style={{ 
                            fontWeight: '500', 
                            color: '#4f46e5', 
                            fontSize: '0.875rem',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#3730a3'}
                          onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                        >
                          {patient.name}
                        </Link>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{patient.phone}</div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{patient.age}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {patient.problem}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{patient.therapyType}</td>
                      <td style={{ padding: '1rem' }}>
                        {patient.assignedTherapist ? (
                          <span style={{ fontSize: '0.875rem', color: '#374151' }}>{patient.assignedTherapist}</span>
                        ) : (
                          <span style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: '500' }}>
                            Not assigned
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ 
                            fontSize: '1rem',
                            color: patient.meetingType === 'online' ? '#3b82f6' : '#10b981'
                          }}>
                            {patient.meetingType === 'online' ? '💻' : '🏥'}
                          </span>
                          <div>
                            <div style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontSize: '0.75rem',
                              fontWeight: '500',
                              backgroundColor: patient.meetingType === 'online' ? '#dbeafe' : '#dcfce7',
                              color: patient.meetingType === 'online' ? '#1e40af' : '#166534'
                            }}>
                              {patient.meetingType === 'online' ? 'Online' : 'Offline'}
                            </div>
                            <div style={{ fontSize: '0.625rem', color: '#6b7280', marginTop: '0.125rem' }}>
                              {patient.meetingPreference}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                          {patient.completedSessions}/{patient.sessions} sessions
                        </div>
                        <div style={{ 
                          width: '80px', 
                          height: '6px', 
                          backgroundColor: '#e5e7eb', 
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(patient.completedSessions / patient.sessions) * 100}%`,
                            height: '100%',
                            backgroundColor: patient.completedSessions === patient.sessions ? '#10b981' : '#3b82f6',
                            borderRadius: '3px',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: patient.status === 'completed' ? '#dcfce7' : patient.status === 'ongoing' ? '#dbeafe' : '#fef3c7',
                          color: patient.status === 'completed' ? '#166534' : patient.status === 'ongoing' ? '#1e40af' : '#92400e'
                        }}>
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'therapists' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {therapists.map(therapist => (
              <div key={therapist.id} style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                padding: '1.5rem'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#1f2937'
                  }}>
                    👩‍⚕️ {therapist.name}
                  </h4>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                  }}>
                    {therapist.specialization}
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '1rem',
                    fontSize: '0.875rem'
                  }}>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        EXPERIENCE
                      </div>
                      <div style={{ color: '#374151', fontWeight: '500' }}>
                        {therapist.experience}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        ACTIVE PATIENTS
                      </div>
                      <div style={{ color: '#374151', fontWeight: '500' }}>
                        {therapist.assignedPatients.length} patients
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    CONTACT
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                    📧 {therapist.email}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                    📞 {therapist.phone}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '0.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <button style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Patient Assignments</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                Assign therapists to patients and manage therapy plans
              </p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              {patients.filter(p => !p.assignedTherapist).length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem 2rem',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    All patients assigned!
                  </h4>
                  <p style={{ fontSize: '0.875rem' }}>
                    Every patient has been assigned to a therapist.
                  </p>
                </div>
              ) : (
                patients.filter(p => !p.assignedTherapist).map(patient => (
                  <div key={patient.id} style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      gap: '2rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ 
                          fontWeight: '600', 
                          marginBottom: '0.5rem', 
                          color: '#1f2937',
                          fontSize: '1rem'
                        }}>
                          {patient.name}
                        </h5>
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: '0.875rem', 
                          marginBottom: '0.5rem',
                          lineHeight: '1.4'
                        }}>
                          <strong>Problem:</strong> {patient.problem}
                        </p>
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: '0.875rem',
                          marginBottom: '0.5rem'
                        }}>
                          <strong>Recommended Therapy:</strong> {patient.therapyType}
                        </p>
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: '0.875rem'
                        }}>
                          <strong>Sessions:</strong> {patient.sessions} planned
                        </p>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'flex-end',
                        gap: '1rem',
                        minWidth: '300px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Select Therapist
                          </label>
                          <select 
                            id={`therapist-${patient.id}`}
                            style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              backgroundColor: 'white',
                              color: '#374151'
                            }}
                          >
                            <option value="">Choose therapist...</option>
                            {therapists.map(therapist => (
                              <option key={therapist.id} value={therapist.id}>
                                {therapist.name} - {therapist.specialization}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button 
                          onClick={() => {
                            const select = document.getElementById(`therapist-${patient.id}`);
                            if (select.value) {
                              assignTherapist(patient.id, select.value);
                            }
                          }}
                          style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                        >
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Treatment Progress Tracking</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                Monitor patient progress and treatment outcomes. Click on patient names for detailed tracking.
              </p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {patients.filter(p => p.status === 'ongoing').map(patient => (
                  <div key={patient.id} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1.25rem',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <Link 
                        to={`/treatment-tracking/${patient.id}?from=${activeTab}`}
                        style={{ 
                          fontSize: '1rem', 
                          fontWeight: '600', 
                          color: '#4f46e5',
                          textDecoration: 'none',
                          marginBottom: '0.25rem',
                          display: 'block',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#3730a3'}
                        onMouseLeave={(e) => e.target.style.color = '#4f46e5'}
                      >
                        {patient.name}
                      </Link>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {patient.therapyType} • {patient.assignedTherapist}
                      </p>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                          Progress
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {patient.completedSessions}/{patient.sessions} sessions
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%', 
                        height: '8px', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(patient.completedSessions / patient.sessions) * 100}%`,
                          height: '100%',
                          backgroundColor: '#3b82f6',
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280',
                        marginTop: '0.25rem'
                      }}>
                        {Math.round((patient.completedSessions / patient.sessions) * 100)}% Complete
                      </div>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      <span>Next: {patient.nextAppointment}</span>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {patients.filter(p => p.status === 'ongoing').length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem 2rem',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                    No active treatments
                  </h4>
                  <p style={{ fontSize: '0.875rem' }}>
                    All current treatments have been completed.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
