import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Therapy types with pricing
const therapyTypesData = [
  { id: 1, name: 'Abhyanga', duration: 60, price: 150 },
  { id: 2, name: 'Shirodhara', duration: 45, price: 200 },
  { id: 3, name: 'Panchakarma Detox', duration: 90, price: 300 },
  { id: 4, name: 'Marma Therapy', duration: 60, price: 180 },
  { id: 5, name: 'Ayurvedic Massage', duration: 75, price: 220 }
];

// Generate time slots for the next 7 days
const generateTimeSlots = () => {
  const slots = [];
  const today = new Date();
  
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    
    // Generate slots from 9 AM to 6 PM
    for (let hour = 9; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const slotTime = new Date(currentDate);
        slotTime.setHours(hour, minute, 0, 0);
        
        slots.push({
          id: `${currentDate.toDateString()}-${hour}-${minute}`,
          date: currentDate.toDateString(),
          time: slotTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          datetime: slotTime,
          isBooked: Math.random() > 0.7, // 30% chance of being pre-booked
          therapistId: Math.floor(Math.random() * 3) + 1,
          therapistName: ['Dr. Sharma', 'Dr. Patel', 'Dr. Kumar'][Math.floor(Math.random() * 3)],
          booking: null
        });
      }
    }
  }
  
  return slots;
};

export const BookingProvider = ({ children }) => {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize slots on component mount
    setSlots(generateTimeSlots());
  }, []);

  const bookSlot = (slotId, bookingData) => {
    setSlots(prevSlots => 
      prevSlots.map(slot => 
        slot.id === slotId 
          ? { 
              ...slot, 
              isBooked: true, 
              booking: {
                id: Date.now(),
                ...bookingData,
                bookedAt: new Date(),
                status: 'confirmed'
              }
            }
          : slot
      )
    );

    // Add to bookings list
    const newBooking = {
      id: Date.now(),
      slotId,
      ...bookingData,
      bookedAt: new Date(),
      status: 'confirmed'
    };
    
    setBookings(prev => [...prev, newBooking]);

    // Add notification
    const slot = slots.find(s => s.id === slotId);
    addNotification({
      id: Date.now(),
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: `Your ${bookingData.therapyType} session is booked for ${slot?.date} at ${slot?.time}`,
      timestamp: new Date(),
      read: false,
      recipient: 'patient'
    });

    // Notify therapist
    addNotification({
      id: Date.now() + 1,
      type: 'new_booking',
      title: 'New Booking Received',
      message: `${bookingData.patientName} booked ${bookingData.therapyType} for ${slot?.date} at ${slot?.time}`,
      timestamp: new Date(),
      read: false,
      recipient: 'therapist'
    });

    return newBooking;
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const getAvailableSlots = () => {
    return slots.filter(slot => !slot.isBooked && slot.datetime > new Date());
  };

  const getBookedSlots = () => {
    return slots.filter(slot => slot.isBooked);
  };

  const getUpcomingBookings = (patientName) => {
    return bookings.filter(booking => 
      booking.patientName === patientName && 
      new Date(booking.datetime) > new Date()
    );
  };

  const value = {
    slots,
    bookings,
    notifications,
    therapyTypes: therapyTypesData,
    bookSlot,
    addNotification,
    markNotificationAsRead,
    getAvailableSlots,
    getBookedSlots,
    getUpcomingBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
