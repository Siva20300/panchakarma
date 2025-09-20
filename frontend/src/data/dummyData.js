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

  }
];
