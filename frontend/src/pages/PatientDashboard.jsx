


import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { dummyPatients, therapyTypes, dummyFoodDiets } from "../data/dummyData.jsx";
import { useBooking } from '../context/BookingContext';
import SlotGrid from '../components/SlotGrid';
import BookingModal from '../components/BookingModal';
import NotificationBell from '../components/NotificationBell';

// Import Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Dummy progress data (replace with API data later)
const progressData = [
  { session: 1, improvement: 20, feedback: 3 },
  { session: 2, improvement: 40, feedback: 4 },
  { session: 3, improvement: 55, feedback: 5 },
  { session: 4, improvement: 70, feedback: 4 },
  { session: 5, improvement: 85, feedback: 5 },
];

const PatientDashboard = () => {
  const { user } = useAuth();
  const { getUpcomingBookings, getAvailableSlots } = useBooking();
  const [activeTab, setActiveTab] = useState("profile");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [sessionRating, setSessionRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { bookings, addBooking } = useBooking();
  
  // Use actual user data or fallback to dummy data
  const [patientData, setPatientData] = useState({
    ...dummyPatients[0],
    name: user?.name || dummyPatients[0].name,
    age: user?.age || dummyPatients[0].age,
    email: user?.email || dummyPatients[0].email
  });
  const [patientFoodDiet, setPatientFoodDiet] = useState(dummyFoodDiets.find(diet => diet.patientId === dummyPatients[0].id));
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || dummyPatients[0].name,
    age: user?.age || dummyPatients[0].age,
    phone: dummyPatients[0].phone,
    email: dummyPatients[0].email,
  });
  const [bookingForm, setBookingForm] = useState({
    therapyType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const upcomingBookings = getUpcomingBookings(patientData.name);
  const availableSlots = getAvailableSlots();

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "var(--gray-50)";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
        }
      }}
      style={{
        padding: "0.75rem 0.5rem",
        border: active ? "none" : "1px solid var(--gray-300)",
        backgroundColor: active ? "var(--primary-600)" : "white",
        color: active ? "white" : "var(--gray-700)",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontWeight: active ? "600" : "500",
        transition: "all 0.15s",
        flex: "1",
        textAlign: "center",
        minWidth: "0",
        whiteSpace: "nowrap",
        fontSize: "0.875rem",
        boxShadow: active ? "0 2px 4px rgba(0,0,0,0.1)" : "0 1px 2px rgba(0,0,0,0.05)",
      }}
      className="tab-button-responsive"
    >
      {label}
    </button>
  );

  const handleEditClick = (e) => {
    // Add click effect
    e.currentTarget.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.currentTarget.style.transform = "scale(1)";
    }, 150);
    
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    setPatientData({
      ...patientData,
      name: editForm.name,
      age: editForm.age,
      phone: editForm.phone,
      email: editForm.email,
    });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: patientData.name,
      age: patientData.age,
      phone: patientData.phone,
      email: patientData.email,
    });
    setIsEditing(false);
  };

  const handleBookingChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert("Booking request submitted successfully!");
    setBookingForm({
      therapyType: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  const handleBookingComplete = (booking) => {
    setShowBookingModal(false);
    setSelectedSlot(null);
    alert(`Booking confirmed! Your ${booking.therapyType} session is scheduled for ${booking.slotDate} at ${booking.slotTime}`);
  };

  const handleBookingCancel = () => {
    setShowBookingModal(false);
    setSelectedSlot(null);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (sessionRating === 0) {
      alert("Please select a rating before submitting feedback.");
      return;
    }
    if (feedbackText.trim() === "") {
      alert("Please provide your feedback before submitting.");
      return;
    }
    
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", {
      rating: sessionRating,
      feedback: feedbackText,
      timestamp: new Date().toISOString()
    });
    
    setFeedbackSubmitted(true);
    alert("Thank you for your feedback! Your rating and comments have been submitted successfully.");
    
    // Reset form after successful submission
    setTimeout(() => {
      setSessionRating(0);
      setFeedbackText("");
      setFeedbackSubmitted(false);
    }, 2000);
  };

  const handleStarClick = (rating) => {
    setSessionRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div style={{ padding: "2rem 0" }}>
      <div className="container">
        {/* Header */}
        <div className="mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "var(--primary-700)",
              }}
            >
              Welcome back, {patientData?.name || 'Patient'}!
            </h1>
            <p style={{ 
              color: "var(--gray-600)", 
              fontSize: "1.125rem",
              fontWeight: "500"
            }}>
              Manage your therapy sessions and track your progress
            </p>
          </div>
          <NotificationBell userType="patient" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 mb-6">
          <div className="card">
            <div className="card-body text-center">
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--primary-600)",
                }}
              >
                {patientData.completedSessions}
              </div>
              <div style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                Sessions Completed
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--warning-500)",
                }}
              >
                {patientData.sessions - patientData.completedSessions}
              </div>
              <div style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                Sessions Remaining
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "var(--success-500)",
                }}
              >
                {Math.round(
                  (patientData.completedSessions / patientData.sessions) * 100
                )}
                %
              </div>
              <div style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                Progress
              </div>
            </div>
          </div>
        </div>


        {/* Tabs */}
        <div
          style={{
            backgroundColor: "var(--gray-50)",
            padding: "1rem",
            borderRadius: "1rem",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "0.5rem",
            width: "100%",
            overflow: "visible",
            flexWrap: "nowrap",
            border: "2px solid var(--primary-200)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            background: "linear-gradient(135deg, var(--gray-50) 0%, var(--gray-100) 100%)",
          }}
          className="tabs-container-responsive"
        >
          <TabButton
            id="profile"
            label="My Profile"
            active={activeTab === "profile"}
            onClick={setActiveTab}
          />
          <TabButton
            id="booking"
            label="Book Therapy"
            active={activeTab === "booking"}
            onClick={setActiveTab}
          />
          <TabButton
            id="progress"
            label="My Progress"
            active={activeTab === "progress"}
            onClick={setActiveTab}
          />
          <TabButton
            id="precautions"
            label="Precautions"
            active={activeTab === "precautions"}
            onClick={setActiveTab}
          />
          <TabButton
            id="fooddiet"
            label="Food Diet"
            active={activeTab === "fooddiet"}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-2 gap-4">
            {/* Personal Info */}
            <div className="card" style={{
              transition: "box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}>
              <div className="card-header" style={{ textAlign: "center", paddingBottom: "1rem" }}>
                <h3 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Personal Information
                </h3>
                <div style={{
                  width: "60px",
                  height: "3px",
                  backgroundColor: "var(--primary-600)",
                  margin: "0 auto",
                  borderRadius: "2px"
                }}></div>
              </div>
              <div className="card-body">
                {!isEditing ? (
                  <>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      marginBottom: "1rem",
                      padding: "0.5rem 0"
                    }}>
                      <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "120px" }}>Full Name:</span>
                      <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.name}</span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      marginBottom: "1rem",
                      padding: "0.5rem 0"
                    }}>
                      <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "120px" }}>Age:</span>
                      <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.age} years</span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      marginBottom: "1rem",
                      padding: "0.5rem 0"
                    }}>
                      <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "120px" }}>Phone:</span>
                      <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.phone}</span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      marginBottom: "1.5rem",
                      padding: "0.5rem 0"
                    }}>
                      <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "120px" }}>Email:</span>
                      <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.email}</span>
                    </div>
                    <button 
                      className="btn btn-secondary"
                      onClick={handleEditClick}
                      style={{
                        transition: "transform 0.15s ease",
                        cursor: "pointer",
                        border: "1px solid var(--gray-300)",
                        borderRadius: "6px"
                      }}
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className="form-label" style={{ fontWeight: "bold", color: "var(--gray-700)" }}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        value={editForm.name}
                        onChange={handleEditChange}
                        style={{ marginTop: "0.25rem" }}
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className="form-label" style={{ fontWeight: "bold", color: "var(--gray-700)" }}>Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-input"
                        value={editForm.age}
                        onChange={handleEditChange}
                        style={{ marginTop: "0.25rem" }}
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className="form-label" style={{ fontWeight: "bold", color: "var(--gray-700)" }}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        style={{ marginTop: "0.25rem" }}
                      />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label className="form-label" style={{ fontWeight: "bold", color: "var(--gray-700)" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        value={editForm.email}
                        onChange={handleEditChange}
                        style={{ marginTop: "0.25rem" }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button 
                        className="btn btn-primary"
                        onClick={handleSaveProfile}
                        style={{
                          transition: "transform 0.15s ease",
                          cursor: "pointer"
                        }}
                      >
                        Save Changes
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                        style={{
                          transition: "transform 0.15s ease",
                          cursor: "pointer",
                          border: "1px solid var(--gray-300)"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Treatment Info */}
            <div className="card" style={{
              transition: "box-shadow 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}>
              <div className="card-header" style={{ textAlign: "center", paddingBottom: "1rem" }}>
                <h3 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Treatment Information
                </h3>
                <div style={{
                  width: "60px",
                  height: "3px",
                  backgroundColor: "var(--primary-600)",
                  margin: "0 auto",
                  borderRadius: "2px"
                }}></div>
              </div>
              <div className="card-body">
                <div style={{ 
                  display: "flex", 
                  alignItems: "center",
                  marginBottom: "1rem",
                  padding: "0.5rem 0"
                }}>
                  <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "150px" }}>Health Problem:</span>
                  <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.problem}</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center",
                  marginBottom: "1rem",
                  padding: "0.5rem 0"
                }}>
                  <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "150px" }}>Prescribed Therapy:</span>
                  <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.therapyType}</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center",
                  marginBottom: "1rem",
                  padding: "0.5rem 0"
                }}>
                  <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "150px" }}>Assigned Therapist:</span>
                  <span style={{ fontWeight: "500", marginLeft: "1rem" }}>{patientData.assignedTherapist || "Not assigned yet"}</span>
                </div>
                <div style={{ 
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 0"
                }}>
                  <span style={{ fontWeight: "bold", color: "var(--gray-700)", minWidth: "150px" }}>Treatment Status:</span>
                  <div style={{ marginLeft: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.6rem 1.2rem",
                        borderRadius: "1.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        letterSpacing: "0.025em",
                        backgroundColor: (() => {
                          switch(patientData.status) {
                            case "ongoing": return "linear-gradient(135deg, #10b981, #059669)";
                            case "completed": return "linear-gradient(135deg, #3b82f6, #1d4ed8)";
                            case "pending": return "linear-gradient(135deg, #f59e0b, #d97706)";
                            default: return "linear-gradient(135deg, #6b7280, #4b5563)";
                          }
                        })(),
                        color: "white",
                        boxShadow: (() => {
                          switch(patientData.status) {
                            case "ongoing": return "0 4px 12px rgba(16, 185, 129, 0.3)";
                            case "completed": return "0 4px 12px rgba(59, 130, 246, 0.3)";
                            case "pending": return "0 4px 12px rgba(245, 158, 11, 0.3)";
                            default: return "0 4px 12px rgba(107, 114, 128, 0.3)";
                          }
                        })(),
                        border: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "default"
                      }}
                    >
                      {patientData.status === "ongoing" && (
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          animation: "shimmer 2s infinite"
                        }}></div>
                      )}
                      <span style={{ 
                        fontSize: "1rem",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                        zIndex: 2,
                        position: "relative"
                      }}>
                        {(() => {
                          switch(patientData.status) {
                            case "ongoing": return "🔄";
                            case "completed": return "✅";
                            case "pending": return "⏳";
                            default: return "❓";
                          }
                        })()}
                      </span>
                      <span style={{ 
                        zIndex: 2, 
                        position: "relative",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "0.875rem"
                      }}>
                        {patientData?.status || "Unknown"}
                      </span>
                    </span>
                    
                    {/* Status Description and Progress */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{
                        fontSize: "0.75rem",
                        color: "var(--gray-600)",
                        fontStyle: "italic",
                        maxWidth: "200px"
                      }}>
                        {(() => {
                          switch(patientData.status) {
                            case "ongoing": return "Treatment is currently in progress";
                            case "completed": return "All sessions have been completed successfully";
                            case "pending": return "Waiting for treatment to begin";
                            default: return "Status information unavailable";
                          }
                        })()}
                      </div>
                      
                      {/* Mini Progress Bar for Status */}
                      {patientData.status === "ongoing" && (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.7rem",
                          color: "var(--gray-500)"
                        }}>
                          <div style={{
                            width: "60px",
                            height: "4px",
                            backgroundColor: "var(--gray-200)",
                            borderRadius: "2px",
                            overflow: "hidden"
                          }}>
                            <div style={{
                              width: `${(patientData.completedSessions / patientData.sessions) * 100}%`,
                              height: "100%",
                              backgroundColor: "#10b981",
                              borderRadius: "2px",
                              transition: "width 0.3s ease"
                            }}></div>
                          </div>
                          <span>{patientData.completedSessions}/{patientData.sessions} sessions</span>
                        </div>
                      )}
                      
                      {patientData.status === "completed" && (
                        <div style={{
                          fontSize: "0.7rem",
                          color: "var(--success-600)",
                          fontWeight: "500"
                        }}>
                          🎉 Treatment completed on schedule
                        </div>
                      )}
                      
                      {patientData.status === "pending" && patientData.nextAppointment && (
                        <div style={{
                          fontSize: "0.7rem",
                          color: "var(--warning-600)",
                          fontWeight: "500"
                        }}>
                          📅 Next: {new Date(patientData.nextAppointment).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Treatment Timeline */}
                <div style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  backgroundColor: "var(--gray-50)",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--gray-200)"
                }}>
                  <h4 style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "var(--gray-700)",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    📋 Treatment Timeline
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {/* Timeline Steps */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
                      {/* Booking Step */}
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}>
                        <div style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: "#10b981",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem"
                        }}>
                          ✓
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "var(--gray-600)" }}>Booked</span>
                      </div>
                      
                      {/* Connection Line */}
                      <div style={{
                        flex: 1,
                        height: "2px",
                        backgroundColor: patientData.status !== "pending" ? "#10b981" : "var(--gray-300)",
                        borderRadius: "1px"
                      }}></div>
                      
                      {/* In Progress Step */}
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}>
                        <div style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: patientData.status === "ongoing" || patientData.status === "completed" ? "#10b981" : "var(--gray-300)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          color: "white"
                        }}>
                          {patientData.status === "ongoing" ? "🔄" : patientData.status === "completed" ? "✓" : "○"}
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "var(--gray-600)" }}>In Progress</span>
                      </div>
                      
                      {/* Connection Line */}
                      <div style={{
                        flex: 1,
                        height: "2px",
                        backgroundColor: patientData.status === "completed" ? "#10b981" : "var(--gray-300)",
                        borderRadius: "1px"
                      }}></div>
                      
                      {/* Completed Step */}
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}>
                        <div style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: patientData.status === "completed" ? "#10b981" : "var(--gray-300)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          color: "white"
                        }}>
                          {patientData.status === "completed" ? "🎉" : "○"}
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "var(--gray-600)" }}>Completed</span>
                      </div>
                    </div>
                    
                    {/* Treatment Dates */}
                    <div style={{
                      fontSize: "0.7rem",
                      color: "var(--gray-500)",
                      textAlign: "right"
                    }}>
                      <div>Started: {new Date(patientData.bookingDate).toLocaleDateString()}</div>
                      {patientData.nextAppointment && patientData.status !== "completed" && (
                        <div>Next: {new Date(patientData.nextAppointment).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                </div>
                  
                <style jsx>{`
                  @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                  }
                `}</style>
              </div>
            </div>
          </div>
        )}

        {/* Booking Tab */}
        {activeTab === "booking" && (
          <div>
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div className="card" style={{ marginBottom: '2rem' }}>
                <div className="card-header">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                    Your Upcoming Bookings
                  </h3>
                </div>
                <div className="card-body">
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {upcomingBookings.map(booking => (
                      <div key={booking.id} style={{
                        padding: '1rem',
                        border: '1px solid var(--primary-200)',
                        borderRadius: '0.5rem',
                        backgroundColor: 'var(--primary-50)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-700)' }}>
                              {booking.therapyType}
                            </h4>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: 'var(--primary-600)' }}>
                              <strong>Date:</strong> {booking.slotDate}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: 'var(--primary-600)' }}>
                              <strong>Time:</strong> {booking.slotTime}
                            </p>
                            <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: 'var(--primary-600)' }}>
                              <strong>Therapist:</strong> {booking.therapistName}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ 
                              fontSize: '1.25rem', 
                              fontWeight: 'bold', 
                              color: 'var(--success-600)',
                              marginBottom: '0.5rem'
                            }}>
                              ${booking.therapyPrice}
                            </div>
                            <span className="badge badge-success">Confirmed</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Available Slots Calendar */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Available Therapy Slots
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                  
                </p>
              </div>
              <div className="card-body">
                <SlotGrid onSlotSelect={handleSlotSelect} viewMode="patient" />
              </div>
            </div>

            {/* Traditional Booking Form */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Quick Booking Request
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                  Or submit a general booking request and we'll contact you
                </p>
              </div>
              <div className="card-body">
                <form onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Therapy Type</label>
                      <select
                        name="therapyType"
                        className="form-select"
                        value={bookingForm.therapyType}
                        onChange={handleBookingChange}
                        required
                      >
                        <option value="">Select therapy type</option>
                        {therapyTypes.map((therapy) => (
                          <option key={therapy} value={therapy}>
                            {therapy}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        className="form-input"
                        value={bookingForm.preferredDate}
                        onChange={handleBookingChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Time</label>
                      <select
                        name="preferredTime"
                        className="form-select"
                        value={bookingForm.preferredTime}
                        onChange={handleBookingChange}
                        required
                      >
                        <option value="">Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Additional Notes</label>
                      <textarea
                        name="notes"
                        className="form-textarea"
                        rows="3"
                        value={bookingForm.notes}
                        onChange={handleBookingChange}
                        placeholder="Any specific requirements or notes..."
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit Booking Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab with Graphs */}
        {activeTab === "progress" && (
          <div>
            {/* Progress Overview */}
            <div className="card mb-6">
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Treatment Progress
                </h3>
              </div>
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <span style={{ fontSize: "1.125rem", fontWeight: "500" }}>
                    Overall Progress
                  </span>
                  <span
                    style={{ fontSize: "1.125rem", color: "var(--primary-600)" }}
                  >
                    {patientData.completedSessions}/{patientData.sessions}{" "}
                    sessions
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    backgroundColor: "var(--gray-200)",
                    borderRadius: "6px",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        (patientData.completedSessions /
                          patientData.sessions) *
                        100
                      }%`,
                      height: "100%",
                      backgroundColor: "var(--success-500)",
                      borderRadius: "6px",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
                <p style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                  You have completed{" "}
                  {Math.round(
                    (patientData.completedSessions / patientData.sessions) * 100
                  )}
                  % of your treatment plan.
                </p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="card mb-6">
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Session Progress Graph
                </h3>
              </div>
              <div className="card-body" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="improvement"
                      stroke="#16a34a"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Next Appointment Section */}
            {patientData.nextAppointment && (
              <div className="card mb-6">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "var(--primary-100)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem",
                      }}
                    >
                      📅
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "bold",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Next Appointment
                      </h4>
                      <p
                        style={{
                          color: "var(--gray-600)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {new Date(patientData.nextAppointment).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p
                        style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}
                      >
                        Therapist: {patientData.assignedTherapist}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Section */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Session Feedback
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", margin: "0.5rem 0 0 0" }}>
                  Help us improve by rating your last therapy session
                </p>
              </div>
              <div className="card-body">
                {feedbackSubmitted ? (
                  <div style={{
                    textAlign: "center",
                    padding: "2rem",
                    backgroundColor: "var(--success-50)",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--success-200)"
                  }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                    <h4 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "var(--success-700)", marginBottom: "0.5rem" }}>
                      Feedback Submitted Successfully!
                    </h4>
                    <p style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                      Thank you for your valuable feedback. It helps us provide better care.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: "600", marginBottom: "0.75rem" }}>
                        How was your last session? *
                      </label>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", justifyContent: "center" }}>
                        {[1, 2, 3, 4, 5].map((star) => {
                          // Show yellow if star is within selected rating
                          const isSelected = star <= sessionRating;
                          
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(star)}
                              style={{
                                background: "none",
                                border: "2px solid transparent",
                                fontSize: "2rem",
                                cursor: "pointer",
                                color: isSelected ? "#fbbf24" : "#e5e7eb",
                                borderRadius: "0.5rem",
                                padding: "0.25rem",
                                filter: isSelected ? "drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))" : "none",
                              }}
                              title={`${star} star${star > 1 ? 's' : ''}`}
                            >
                              {isSelected ? "⭐" : "☆"}
                            </button>
                          );
                        })}
                      </div>
                      {sessionRating > 0 && (
                        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                          <span style={{ 
                            fontSize: "0.875rem", 
                            color: "var(--primary-600)", 
                            fontWeight: "500",
                            backgroundColor: "var(--primary-50)",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "1rem"
                          }}>
                            {sessionRating === 1 && "Poor - Needs improvement"}
                            {sessionRating === 2 && "Fair - Below expectations"}
                            {sessionRating === 3 && "Good - Satisfactory"}
                            {sessionRating === 4 && "Very Good - Above expectations"}
                            {sessionRating === 5 && "Excellent - Outstanding experience"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: "600" }}>
                        Your Feedback *
                      </label>
                      <textarea
                        className="form-textarea"
                        rows="4"
                        placeholder="Share your experience, how you're feeling, and any suggestions for improvement..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        style={{
                          border: feedbackText.trim() === "" ? "1px solid var(--gray-300)" : "1px solid var(--success-400)",
                          transition: "border-color 0.2s ease"
                        }}
                      />
                      <div style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginTop: "0.25rem" }}>
                        {feedbackText.length}/500 characters
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => {
                          setSessionRating(0);
                          setFeedbackText("");
                          setHoveredRating(0);
                        }}
                      >
                        Clear
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={sessionRating === 0 || feedbackText.trim() === ""}
                        style={{
                          opacity: (sessionRating === 0 || feedbackText.trim() === "") ? 0.6 : 1,
                          cursor: (sessionRating === 0 || feedbackText.trim() === "") ? "not-allowed" : "pointer"
                        }}
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Precautions Tab */}
        {activeTab === "precautions" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Pre-Therapy Precautions
                </h3>
              </div>
              <div className="card-body">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li className="border-b py-2">
                    ✅ Avoid heavy meals 2 hours before therapy
                  </li>
                  <li className="border-b py-2">
                    ✅ Wear comfortable, loose clothing
                  </li>
                  <li className="border-b py-2">
                    ✅ Inform about any allergies or medications
                  </li>
                  <li className="border-b py-2">
                    ✅ Arrive 15 minutes early for preparation
                  </li>
                  <li className="border-b py-2">
                    ✅ Stay hydrated but avoid excessive water
                  </li>
                  <li className="py-2">✅ Get adequate rest the night before</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Post-Therapy Care
                </h3>
              </div>
              <div className="card-body">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li className="border-b py-2">
                    🌿 Rest for at least 30 minutes after therapy
                  </li>
                  <li className="border-b py-2">
                    🌿 Drink warm water to aid detoxification
                  </li>
                  <li className="border-b py-2">
                    🌿 Avoid cold foods and beverages
                  </li>
                  <li className="border-b py-2">
                    🌿 Take a warm shower after 2-3 hours
                  </li>
                  <li className="border-b py-2">
                    🌿 Avoid strenuous activities for the day
                  </li>
                  <li className="py-2">
                    🌿 Follow prescribed dietary guidelines
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Food Diet Tab */}
        {activeTab === "fooddiet" && (
          <div>
            {patientFoodDiet ? (
              <div className="card">
                {/* Diet Plan Header */}
                <div className="card-header" style={{ textAlign: "center", paddingBottom: "1rem" }}>
                  <h3 style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    color: "var(--primary-700)"
                  }}>
                    Doctor Prescribed Diet Plan
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--gray-600)", margin: 0 }}>
                    Customized by your doctor for optimal therapy results
                  </p>
                </div>
                
                <div className="card-body">
                  {/* Doctor Info and Status */}
                  <div style={{ 
                    backgroundColor: "var(--primary-50)",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    marginBottom: "1.5rem",
                    border: "1px solid var(--primary-200)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem", color: "var(--primary-700)" }}>
                          👨‍⚕️ Assigned by: {patientFoodDiet.createdBy}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--gray-600)", margin: 0 }}>
                          Last updated: {new Date(patientFoodDiet.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{
                        backgroundColor: "var(--success-600)",
                        color: "white",
                        padding: "0.375rem 0.75rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        fontWeight: "600"
                      }}>
                        ACTIVE
                      </div>
                    </div>
                  </div>

                  {/* Doctor's Notes */}
                  {patientFoodDiet.doctorNotes && (
                    <div style={{
                      backgroundColor: "var(--warning-50)",
                      padding: "0.75rem",
                      borderRadius: "0.375rem",
                      borderLeft: "3px solid var(--warning-500)",
                      marginBottom: "1.5rem"
                    }}>
                      <p style={{ fontSize: "0.75rem", color: "var(--warning-700)", margin: 0 }}>
                        <strong>⚠️ Doctor's Instructions:</strong> {patientFoodDiet.doctorNotes}
                      </p>  
                      
                    </div>
                  )}

                  {/* Simplified Diet Summary */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ 
                      fontSize: "1rem", 
                      fontWeight: "bold", 
                      marginBottom: "1rem",
                      color: "var(--primary-600)"
                    }}>
                      📋 Your Diet Summary
                    </h4>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      {/* Key Foods to Eat */}
                      <div style={{
                        border: "1px solid var(--success-200)",
                        borderRadius: "0.5rem",
                        padding: "0.75rem",
                        backgroundColor: "var(--success-50)"
                      }}>
                        <h5 style={{ 
                          fontSize: "0.875rem", 
                          fontWeight: "bold",
                          color: "var(--success-700)",
                          marginBottom: "0.5rem"
                        }}>
                          ✅ Key Foods to Include
                        </h5>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {/* Show only morning and lunch foods as summary */}
                          {patientFoodDiet.mealPlan.morning?.recommended.slice(0, 2).map((food, index) => (
                            <li key={index} style={{ 
                              padding: "0.125rem 0", 
                              fontSize: "0.75rem",
                              color: "var(--gray-700)"
                            }}>
                              • {food}
                            </li>
                          ))}
                          {patientFoodDiet.mealPlan.lunch?.recommended.slice(0, 2).map((food, index) => (
                            <li key={index} style={{ 
                              padding: "0.125rem 0", 
                              fontSize: "0.75rem",
                              color: "var(--gray-700)"
                            }}>
                              • {food}
                            </li>
                          ))}
                          <li style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontStyle: "italic", padding: "0.125rem 0" }}>
                            ...and more as per meal schedule
                          </li>
                        </ul>
                      </div>

                      {/* Key Foods to Avoid */}
                      <div style={{
                        border: "1px solid var(--danger-200)",
                        borderRadius: "0.5rem",
                        padding: "0.75rem",
                        backgroundColor: "var(--danger-50)"
                      }}>
                        <h5 style={{ 
                          fontSize: "0.875rem", 
                          fontWeight: "bold",
                          color: "var(--danger-700)",
                          marginBottom: "0.5rem"
                        }}>
                          ❌ Foods to Avoid
                        </h5>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {patientFoodDiet.restrictions.slice(0, 4).map((restriction, index) => (
                            <li key={index} style={{ 
                              padding: "0.125rem 0", 
                              fontSize: "0.75rem",
                              color: "var(--gray-700)"
                            }}>
                              • {restriction}
                            </li>
                          ))}
                          {patientFoodDiet.restrictions.length > 4 && (
                            <li style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontStyle: "italic", padding: "0.125rem 0" }}>
                              +{patientFoodDiet.restrictions.length - 4} more restrictions
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Key Guidelines */}
                  <div style={{
                    backgroundColor: "var(--info-50)",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "1px solid var(--info-200)"
                  }}>
                    <h5 style={{ 
                      fontSize: "0.875rem", 
                      fontWeight: "bold",
                      color: "var(--info-700)",
                      marginBottom: "0.5rem"
                    }}>
                      💡 Important Guidelines
                    </h5>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {patientFoodDiet.generalGuidelines.slice(0, 4).map((guideline, index) => (
                        <p key={index} style={{ 
                          fontSize: "0.75rem",
                          color: "var(--gray-700)",
                          margin: 0,
                          padding: "0.125rem 0"
                        }}>
                          ✓ {guideline}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Contact Doctor Notice */}
                  <div style={{
                    backgroundColor: "var(--warning-50)",
                    padding: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "1px solid var(--warning-200)",
                    marginTop: "1rem",
                    textAlign: "center"
                  }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--warning-700)", margin: 0 }}>
                      <strong>⚠️ Important:</strong> This diet plan is specifically designed for your treatment. 
                      Contact {patientFoodDiet.createdBy} for any modifications or questions.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body text-center" style={{ padding: "2rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>👨‍⚕️</div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Waiting for Doctor's Diet Plan
                  </h3>
                  <p style={{ color: "var(--gray-600)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
                    Your doctor will assign a personalized food diet plan based on your therapy type and health condition.
                  </p>
                  
                  <div style={{
                    backgroundColor: "var(--primary-50)",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--primary-200)"
                  }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "var(--primary-700)", marginBottom: "0.5rem" }}>
                      🔄 What happens next?
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left" }}>
                      <li style={{ fontSize: "0.75rem", color: "var(--gray-700)", padding: "0.25rem 0" }}>
                        ✓ Doctor reviews your therapy progress
                      </li>
                      <li style={{ fontSize: "0.75rem", color: "var(--gray-700)", padding: "0.25rem 0" }}>
                        ✓ Customized diet plan is created
                      </li>
                      <li style={{ fontSize: "0.75rem", color: "var(--gray-700)", padding: "0.25rem 0" }}>
                        ✓ You'll be notified when it's ready
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedSlot && (
          <BookingModal
            selectedSlot={selectedSlot}
            onBookingComplete={handleBookingComplete}
            onCancel={handleBookingCancel}
          />
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
