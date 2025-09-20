import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';

const SlotGrid = ({ onSlotSelect, viewMode = 'patient' }) => {
  const { slots } = useBooking();
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  // Initialize selectedDate when slots are loaded
  useEffect(() => {
    if (slots && slots.length > 0) {
      const today = new Date().toDateString();
      const availableDates = [...new Set(slots.map(slot => slot.date))].sort((a, b) => new Date(a) - new Date(b));
      
      // If today is not available, select the first available date
      if (!availableDates.includes(today) && availableDates.length > 0) {
        setSelectedDate(availableDates[0]);
      }
    }
  }, [slots]);

  // Show loading if slots haven't been generated yet
  if (!slots || slots.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: 'var(--gray-500)',
        fontSize: '1rem'
      }}>
        Loading available slots...
      </div>
    );
  }

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const dates = Object.keys(slotsByDate).sort((a, b) => new Date(a) - new Date(b));
  
  // Use selectedDate directly, but ensure it exists in our dates
  const actualSelectedDate = selectedDate;
  const selectedDateSlots = slotsByDate[actualSelectedDate] || [];
  
  // Debug: Add console logs to see what's happening
  console.log('Available dates:', dates);
  console.log('Selected date:', selectedDate);
  console.log('Actual selected date:', actualSelectedDate);
  console.log('Slots for selected date:', selectedDateSlots);

  const getSlotStyle = (slot) => {
    const baseStyle = {
      padding: '0.75rem',
      margin: '0.25rem',
      borderRadius: '0.5rem',
      border: '2px solid',
      cursor: slot.isBooked ? 'not-allowed' : 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      textAlign: 'center',
      minHeight: '60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    };

    if (slot.isBooked) {
      return {
        ...baseStyle,
        backgroundColor: '#fee2e2',
        borderColor: '#ef4444',
        color: '#dc2626',
        opacity: 0.7
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#dcfce7',
        borderColor: '#22c55e',
        color: '#16a34a'
      };
    }
  };

  const handleSlotClick = (slot) => {
    if (!slot.isBooked && onSlotSelect) {
      onSlotSelect(slot);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Date Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: 'var(--gray-900)'
        }}>
          Select Date
        </h4>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          {dates.map(date => {
            const dateObj = new Date(date);
            const isToday = date === new Date().toDateString();
            const isSelected = date === actualSelectedDate;
            
            return (
              <button
                key={date}
                onClick={() => {
                  console.log('Clicking date:', date);
                  setSelectedDate(date);
                }}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--primary-600)' : 'var(--gray-300)',
                  backgroundColor: isSelected ? 'var(--primary-600)' : 'white',
                  color: isSelected ? 'white' : 'var(--gray-700)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  minWidth: '100px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div>{dateObj.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div>{dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                {isToday && <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Today</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot Status Legend */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        marginBottom: '1rem',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: '#dcfce7',
            border: '2px solid #22c55e',
            borderRadius: '0.25rem'
          }}></div>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            backgroundColor: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: '0.25rem'
          }}></div>
          <span style={{ fontSize: '0.875rem', color: 'var(--gray-700)' }}>Booked</span>
        </div>
      </div>

      {/* Slots Grid */}
      <div>
        <h4 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: 'var(--gray-900)'
        }}>
          Available Time Slots - {new Date(actualSelectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h4>
        
        {selectedDateSlots.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: 'var(--gray-500)',
            fontSize: '1rem'
          }}>
            No slots available for this date
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {selectedDateSlots.map(slot => (
              <div
                key={slot.id}
                style={getSlotStyle(slot)}
                onClick={() => handleSlotClick(slot)}
              >
                <div style={{ fontWeight: '600' }}>{slot.time}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {slot.therapistName}
                </div>
                {slot.isBooked && (
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {viewMode === 'therapist' && slot.booking ? slot.booking.patientName : 'Booked'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{ 
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: 'var(--gray-50)',
        borderRadius: '0.375rem',
        border: '1px solid var(--gray-200)'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
          <span>
            <strong>Available:</strong> {selectedDateSlots.filter(s => !s.isBooked).length}
          </span>
          <span>
            <strong>Booked:</strong> {selectedDateSlots.filter(s => s.isBooked).length}
          </span>
          <span>
            <strong>Total:</strong> {selectedDateSlots.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlotGrid;
