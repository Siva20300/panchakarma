import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationComponent from './components/NotificationComponent';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Articles from './pages/Articles';
import Overview from './pages/Overview';
import MissionVision from './pages/MissionVision';
import Therapies from './pages/Therapies';
import Blogs from './pages/Blogs';
import PatientDetails from './pages/PatientDetails';
import Location from './pages/Location';
import LocateUs from './pages/LocateUs';
import ContactUs from './pages/ContactUs';
import WhatIsPanchakarma from './pages/WhatIsPanchakarma';
import DoctorDashboard from './pages/DoctorDashboard';
import TherapistDashboard from './pages/TherapistDashboard';
import PatientDashboard from './pages/PatientDashboard';
import TreatmentTracking from './pages/TreatmentTracking';
import PatientStories from './pages/PatientStories';

const AppContent = () => {
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Pages where navbar and footer should be hidden
  const hideNavbarFooter = ['/login', '/register'].includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideNavbarFooter && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          <Route path="/therapies" element={<Therapies />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/location" element={<Location />} />
          <Route path="/locate-us" element={<LocateUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/what-is-panchakarma" element={<WhatIsPanchakarma />} />
          <Route path="/patient-stories" element={<PatientStories />} />
          
          <Route 
            path="/doctor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/patient-details/:patientId" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientDetails />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/treatment-tracking/:patientId" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <TreatmentTracking />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/therapist-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['therapist']}>
                <TherapistDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/patient-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!hideNavbarFooter && <Footer />}
      <NotificationComponent 
        notifications={notifications} 
        onDismiss={dismissNotification} 
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
