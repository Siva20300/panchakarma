import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';

const BookingModal = ({ selectedSlot, onBookingComplete, onCancel }) => {
  const { bookSlot, therapyTypes } = useBooking();
  
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    therapyType: '',
    specialRequests: '',
    emergencyContact: '',
    medicalConditions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.therapyType) {
      newErrors.therapyType = 'Please select a therapy type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const selectedTherapy = therapyTypes.find(t => t.id === parseInt(formData.therapyType));
      
      const bookingData = {
        ...formData,
        therapyType: selectedTherapy.name,
        therapyDuration: selectedTherapy.duration,
        therapyPrice: selectedTherapy.price,
        slotDate: selectedSlot.date,
        slotTime: selectedSlot.time,
        datetime: selectedSlot.datetime,
        therapistName: selectedSlot.therapistName
      };

      const booking = bookSlot(selectedSlot.id, bookingData);
      
      if (onBookingComplete) {
        onBookingComplete(booking);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--gray-300)',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    transition: 'border-color 0.2s ease'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ef4444'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--gray-700)'
  };

  const errorStyle = {
    color: '#ef4444',
    fontSize: '0.75rem',
    marginTop: '0.25rem'
  };

  return (
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
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--gray-900)',
            marginBottom: '0.5rem'
          }}>
            Book Your Therapy Session
          </h3>
          <div style={{
            padding: '0.75rem',
            backgroundColor: 'var(--primary-50)',
            borderRadius: '0.375rem',
            border: '1px solid var(--primary-200)'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--primary-700)' }}>
              <strong>Selected Slot:</strong> {selectedSlot.date} at {selectedSlot.time}
            </p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--primary-600)' }}>
              <strong>Therapist:</strong> {selectedSlot.therapistName}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Patient Name */}
            <div>
              <label style={labelStyle}>Patient Name *</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                style={errors.patientName ? errorInputStyle : inputStyle}
                placeholder="Enter your full name"
              />
              {errors.patientName && <div style={errorStyle}>{errors.patientName}</div>}
            </div>

            {/* Email and Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={errors.email ? errorInputStyle : inputStyle}
                  placeholder="your@email.com"
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={errors.phone ? errorInputStyle : inputStyle}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
              </div>
            </div>

            {/* Therapy Type */}
            <div>
              <label style={labelStyle}>Therapy Type *</label>
              <select
                name="therapyType"
                value={formData.therapyType}
                onChange={handleInputChange}
                style={errors.therapyType ? errorInputStyle : inputStyle}
              >
                <option value="">Select a therapy type</option>
                {therapyTypes.map(therapy => (
                  <option key={therapy.id} value={therapy.id}>
                    {therapy.name} - {therapy.duration} min - ${therapy.price}
                  </option>
                ))}
              </select>
              {errors.therapyType && <div style={errorStyle}>{errors.therapyType}</div>}
            </div>

            {/* Emergency Contact */}
            <div>
              <label style={labelStyle}>Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Emergency contact name and phone"
              />
            </div>

            {/* Medical Conditions */}
            <div>
              <label style={labelStyle}>Medical Conditions / Allergies</label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                rows="2"
                style={inputStyle}
                placeholder="Please mention any medical conditions or allergies..."
              />
            </div>

            {/* Special Requests */}
            <div>
              <label style={labelStyle}>Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="2"
                style={inputStyle}
                placeholder="Any special requests for your session..."
              />
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '0.375rem',
              color: '#dc2626',
              fontSize: '0.875rem'
            }}>
              {errors.submit}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.25rem',
                border: '1px solid var(--gray-300)',
                backgroundColor: 'white',
                color: 'var(--gray-700)',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: isSubmitting 
                  ? 'var(--gray-400)' 
                  : 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                color: 'white',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </form>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default BookingModal;
