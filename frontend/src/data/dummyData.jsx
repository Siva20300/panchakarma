// Dummy data for development
export const dummyUsers = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    email: 'doctor@ayursutra.com',
    role: 'doctor',
    specialization: 'Panchakarma Specialist'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'therapist@ayursutra.com',
    role: 'therapist',
    specialization: 'Abhyanga & Shirodhara'
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'patient@ayursutra.com',
    role: 'patient',
    age: 35,
    phone: '+91 9876543210'
  }
];

export const dummyPatients = [
  {
    id: 1,
    name: 'Amit Patel',
    age: 35,
    phone: '+91 9876543210',
    email: 'amit@example.com',
    problem: 'Chronic back pain and stress',
    problems: ['Stress', 'Joint Pain'],
    treatmentType: 'Abhyanga + Shirodhara',
    therapyType: 'Abhyanga + Shirodhara',
    assignedTherapist: 'Priya Sharma',
    sessions: 7,
    completedSessions: 3,
    status: 'ongoing',
    nextAppointment: '2025-01-20',
    bookingDate: '2025-01-10',
    meetingType: 'offline',
    meetingPreference: 'In-person consultation preferred'
  },
  {
    id: 2,
    name: 'Sunita Reddy',
    age: 42,
    phone: '+91 9876543211',
    email: 'sunita@example.com',
    problem: 'Arthritis and joint pain',
    problems: ['Arthritis', 'Joint Pain'],
    treatmentType: 'Pizhichil',
    therapyType: 'Pizhichil',
    assignedTherapist: 'Priya Sharma',
    sessions: 10,
    completedSessions: 10,
    status: 'completed',
    nextAppointment: null,
    bookingDate: '2024-12-15',
    meetingType: 'online',
    meetingPreference: 'Video consultation for follow-up'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    age: 28,
    phone: '+91 9876543212',
    email: 'vikram@example.com',
    problem: 'Digestive issues and fatigue',
    problems: ['Digestive Issues', 'Stress'],
    treatmentType: 'Virechana',
    therapyType: 'Virechana',
    assignedTherapist: null,
    sessions: 5,
    completedSessions: 0,
    status: 'pending',
    nextAppointment: '2025-01-22',
    bookingDate: '2025-01-18',
    meetingType: 'offline',
    meetingPreference: 'Physical examination required'
  }
];

export const dummyTherapists = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya@ayursutra.com',
    specialization: 'Abhyanga & Shirodhara',
    experience: '8 years',
    phone: '+91 9876543220',
    assignedPatients: [1, 2]
  },
  {
    id: 2,
    name: 'Ravi Kumar',
    email: 'ravi@ayursutra.com',
    specialization: 'Pizhichil & Njavarakizhi',
    experience: '12 years',
    phone: '+91 9876543221',
    assignedPatients: []
  }
];

export const dummyBookings = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Amit Patel',
    therapyType: 'Abhyanga + Shirodhara',
    date: '2025-01-20',
    time: '10:00 AM',
    status: 'confirmed',
    therapistId: 1,
    therapistName: 'Priya Sharma'
  },
  {
    id: 2,
    patientId: 3,
    patientName: 'Vikram Singh',
    therapyType: 'Virechana',
    date: '2025-01-22',
    time: '2:00 PM',
    status: 'pending',
    therapistId: null,
    therapistName: null
  }
];

export const dummyFeedback = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Amit Patel',
    therapistId: 1,
    therapistName: 'Priya Sharma',
    sessionDate: '2025-01-15',
    patientFeedback: 'Feeling much better after the session. Very relaxing.',
    therapistFeedback: 'Patient responded well to treatment. Recommend continuing.',
    rating: 5,
    date: '2025-01-15'
  }
];

export const therapyTypes = [
  'Abhyanga',
  'Shirodhara',
  'Pizhichil',
  'Njavarakizhi',
  'Virechana',
  'Basti',
  'Nasya',
  'Raktamokshana',
  'Abhyanga + Shirodhara',
  'Pizhichil + Njavarakizhi'
];

export const dummyFoodDiets = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Amit Patel',
    lastUpdated: '2025-01-15',
    generalGuidelines: [
      'Eat warm, freshly cooked food',
      'Drink warm water throughout the day',
      'Avoid cold and frozen foods',
      'Eat in a calm environment',
      'Chew food properly',
      'Maintain regular meal times'
    ],
    restrictions: [
      'No ice cream or cold desserts',
      'Avoid spicy and oily foods',
      'No carbonated drinks',
      'Limit caffeine intake',
      'Avoid eating late at night'
    ],
    mealPlan: {
      morning: {
        recommended: ['Warm water with lemon', 'Herbal tea', 'Light fruits like apple or pear'],
        avoid: ['Cold drinks', 'Citrus fruits on empty stomach']
      },
      midMorning: {
        recommended: ['Nuts and dates', 'Warm milk with turmeric', 'Fresh fruit juice (room temperature)'],
        avoid: ['Processed snacks', 'Cold beverages']
      },
      lunch: {
        recommended: ['Rice with dal', 'Steamed vegetables', 'Buttermilk', 'Ghee in moderation'],
        avoid: ['Heavy fried foods', 'Too much salt', 'Cold salads']
      },
      evening: {
        recommended: ['Herbal tea', 'Light snacks like roasted nuts', 'Warm soup'],
        avoid: ['Coffee', 'Heavy meals', 'Spicy snacks']
      },
      dinner: {
        recommended: ['Light khichdi', 'Vegetable soup', 'Warm milk before bed'],
        avoid: ['Heavy meals', 'Raw foods', 'Late night eating']
      }
    },
    doctorNotes: 'Focus on anti-inflammatory foods to help with joint pain. Maintain regular meal times for better digestion.',
    createdBy: 'Dr. Rajesh Kumar',
    createdDate: '2025-01-10'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Sunita Reddy',
    lastUpdated: '2024-12-20',
    generalGuidelines: [
      'Follow anti-inflammatory diet',
      'Include omega-3 rich foods',
      'Eat plenty of antioxidant-rich vegetables',
      'Stay hydrated with warm fluids',
      'Avoid inflammatory foods'
    ],
    restrictions: [
      'No refined sugar',
      'Avoid processed foods',
      'Limit red meat',
      'No alcohol',
      'Avoid nightshade vegetables if they cause inflammation'
    ],
    mealPlan: {
      morning: {
        recommended: ['Green tea', 'Oatmeal with berries', 'Turmeric latte'],
        avoid: ['Sugary cereals', 'White bread', 'Coffee on empty stomach']
      },
      midMorning: {
        recommended: ['Walnuts', 'Fresh berries', 'Herbal tea'],
        avoid: ['Packaged snacks', 'Sugary drinks']
      },
      lunch: {
        recommended: ['Quinoa salad', 'Grilled fish', 'Leafy green vegetables', 'Olive oil dressing'],
        avoid: ['Fried foods', 'White rice', 'Heavy sauces']
      },
      evening: {
        recommended: ['Green tea', 'Handful of almonds', 'Fresh fruit'],
        avoid: ['Processed snacks', 'Sugary treats']
      },
      dinner: {
        recommended: ['Vegetable soup', 'Steamed broccoli', 'Lean protein', 'Herbal tea'],
        avoid: ['Heavy meals', 'Late night snacking', 'Spicy foods']
      }
    },
    doctorNotes: 'Continue with anti-inflammatory diet. Patient has shown good response to current plan.',
    createdBy: 'Dr. Rajesh Kumar',
    createdDate: '2024-12-15'
  }
];

export const detailedPatientData = [
  {
    id: 4,
    name: 'Rajesh Gupta',
    age: 45,
    phone: '+91 9876543213',
    email: 'rajesh@example.com',
    problem: 'Chronic stress and insomnia',
    problems: ['Stress', 'Insomnia', 'Anxiety'],
    treatmentType: 'Shirodhara + Abhyanga',
    therapyType: 'Shirodhara + Abhyanga',
    assignedTherapist: 'Priya Sharma',
    sessions: 14,
    completedSessions: 8,
    totalSessions: 14,
    status: 'ongoing',
    nextAppointment: '2025-01-23',
    bookingDate: '2025-01-05',
    meetingType: 'offline',
    meetingPreference: 'In-person consultation preferred',
    treatmentPlan: 'Comprehensive stress relief program with Shirodhara and Abhyanga',
    medicalHistory: 'High blood pressure, work-related stress',
    allergies: 'None known',
    currentMedications: 'Antihypertensive medication',
    lifestyle: 'Sedentary job, irregular sleep patterns',
    dietaryRestrictions: 'Vegetarian, low sodium'
  },
  {
    id: 5,
    name: 'Meera Krishnan',
    age: 38,
    phone: '+91 9876543214',
    email: 'meera@example.com',
    problem: 'Post-pregnancy wellness and fatigue',
    problems: ['Fatigue', 'Stress', 'Body aches'],
    treatmentType: 'Abhyanga + Postnatal Care',
    therapyType: 'Abhyanga + Postnatal Care',
    assignedTherapist: 'Ravi Kumar',
    sessions: 10,
    completedSessions: 10,
    totalSessions: 10,
    status: 'completed',
    nextAppointment: null,
    bookingDate: '2024-11-20',
    meetingType: 'offline',
    meetingPreference: 'In-person consultation preferred',
    treatmentPlan: 'Postnatal recovery program with specialized Abhyanga',
    medicalHistory: 'Recent childbirth, mild postpartum depression',
    allergies: 'Sensitive to strong fragrances',
    currentMedications: 'Multivitamins, iron supplements',
    lifestyle: 'New mother, irregular sleep due to baby care',
    dietaryRestrictions: 'Lactose intolerant'
  },
  {
    id: 6,
    name: 'Arjun Nair',
    age: 52,
    phone: '+91 9876543215',
    email: 'arjun@example.com',
    problem: 'Diabetes management and circulation issues',
    problems: ['Diabetes', 'Poor circulation', 'Joint stiffness'],
    treatmentType: 'Udvartana + Pizhichil',
    therapyType: 'Udvartana + Pizhichil',
    assignedTherapist: null,
    sessions: 21,
    completedSessions: 0,
    totalSessions: 21,
    status: 'pending',
    nextAppointment: '2025-01-25',
    bookingDate: '2025-01-20',
    meetingType: 'offline',
    meetingPreference: 'Physical examination required',
    treatmentPlan: 'Diabetes management program with circulation improvement therapies',
    medicalHistory: 'Type 2 diabetes, hypertension, family history of heart disease',
    allergies: 'Allergic to certain oils (sesame)',
    currentMedications: 'Metformin, blood pressure medication',
    lifestyle: 'Moderately active, follows diabetic diet',
    dietaryRestrictions: 'Diabetic diet, low sugar, low carb'
  }
];

export const therapistNotifications = [
  {
    id: 'notif_1',
    type: 'new_assignment',
    title: 'New Patient Assignment',
    message: 'Dr. Rajesh Kumar has assigned a new patient (Rajesh Gupta) to therapist Priya Sharma for Shirodhara + Abhyanga treatment.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    patientId: 4,
    patientName: 'Rajesh Gupta',
    therapistId: 1,
    therapistName: 'Priya Sharma',
    doctorName: 'Dr. Rajesh Kumar',
    treatmentType: 'Shirodhara + Abhyanga',
    priority: 'high'
  },
  {
    id: 'notif_2',
    type: 'session_completed',
    title: 'Session Completed',
    message: 'Priya Sharma has completed a therapy session for patient Amit Patel. Session feedback is available for review.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    patientId: 1,
    patientName: 'Amit Patel',
    therapistId: 1,
    therapistName: 'Priya Sharma',
    sessionType: 'Abhyanga + Shirodhara',
    priority: 'medium'
  },
  {
    id: 'notif_3',
    type: 'treatment_progress',
    title: 'Treatment Progress Update',
    message: 'Patient Sunita Reddy has completed all 10 sessions of Pizhichil treatment. Treatment marked as completed.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    patientId: 2,
    patientName: 'Sunita Reddy',
    therapistId: 1,
    therapistName: 'Priya Sharma',
    treatmentType: 'Pizhichil',
    priority: 'low'
  },
  {
    id: 'notif_4',
    type: 'appointment_reminder',
    title: 'Upcoming Appointment',
    message: 'Reminder: Vikram Singh has an appointment scheduled for tomorrow at 2:00 PM. Patient status is still pending therapist assignment.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    patientId: 3,
    patientName: 'Vikram Singh',
    appointmentTime: '2:00 PM',
    appointmentDate: '2025-01-22',
    treatmentType: 'Virechana',
    priority: 'high'
  },
  {
    id: 'notif_5',
    type: 'therapist_availability',
    title: 'Therapist Schedule Update',
    message: 'Ravi Kumar has updated his availability schedule. New slots are now available for patient assignments.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: true,
    therapistId: 2,
    therapistName: 'Ravi Kumar',
    priority: 'low'
  },
  {
    id: 'notif_6',
    type: 'patient_feedback',
    title: 'Patient Feedback Received',
    message: 'Amit Patel has submitted feedback for his recent Abhyanga session. Rating: 5/5 stars.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: true,
    patientId: 1,
    patientName: 'Amit Patel',
    therapistId: 1,
    therapistName: 'Priya Sharma',
    rating: 5,
    sessionType: 'Abhyanga',
    priority: 'low'
  }
];
