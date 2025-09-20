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
    therapyType: 'Abhyanga + Shirodhara',
    assignedTherapist: 'Priya Sharma',
    sessions: 7,
    completedSessions: 3,
    status: 'ongoing',
    nextAppointment: '2025-01-20',
    bookingDate: '2025-01-10'
  },
  {
    id: 2,
    name: 'Sunita Reddy',
    age: 42,
    phone: '+91 9876543211',
    email: 'sunita@example.com',
    problem: 'Arthritis and joint pain',
    therapyType: 'Pizhichil',
    assignedTherapist: 'Priya Sharma',
    sessions: 10,
    completedSessions: 10,
    status: 'completed',
    nextAppointment: null,
    bookingDate: '2024-12-15'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    age: 28,
    phone: '+91 9876543212',
    email: 'vikram@example.com',
    problem: 'Digestive issues and fatigue',
    therapyType: 'Virechana',
    assignedTherapist: null,
    sessions: 5,
    completedSessions: 0,
    status: 'pending',
    nextAppointment: '2025-01-22',
    bookingDate: '2025-01-18'
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

// Food Diet recommendations data
export const dummyFoodDiets = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Amit Patel',
    doctorId: 1,
    doctorName: 'Dr. Rajesh Kumar',
    lastUpdated: '2025-01-18',
    dietPlan: {
      morning: {
        time: '6:00 AM - 8:00 AM',
        foods: [
          'Warm water with lemon and honey',
          'Herbal tea (ginger or tulsi)',
          'Light breakfast: Upma or Poha with vegetables'
        ],
        avoid: ['Cold water', 'Heavy breakfast', 'Processed foods']
      },
      midMorning: {
        time: '10:00 AM - 11:00 AM',
        foods: [
          'Fresh seasonal fruits (not citrus)',
          'Coconut water',
          'Handful of soaked almonds'
        ],
        avoid: ['Citrus fruits', 'Cold beverages']
      },
      lunch: {
        time: '12:00 PM - 1:00 PM',
        foods: [
          'Rice with dal and ghee',
          'Steamed vegetables',
          'Buttermilk',
          'Green leafy vegetables'
        ],
        avoid: ['Spicy food', 'Fried items', 'Cold salads']
      },
      evening: {
        time: '4:00 PM - 5:00 PM',
        foods: [
          'Herbal tea',
          'Light snacks: Roasted nuts',
          'Warm milk with turmeric'
        ],
        avoid: ['Coffee', 'Heavy snacks', 'Cold drinks']
      },
      dinner: {
        time: '7:00 PM - 8:00 PM',
        foods: [
          'Light dinner: Khichdi or soup',
          'Steamed vegetables',
          'Warm water'
        ],
        avoid: ['Heavy meals', 'Late dinner', 'Raw foods']
      }
    },
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
    notes: 'Diet plan designed to reduce inflammation and improve digestion. Follow for 4 weeks and report progress.'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Sunita Reddy',
    doctorId: 1,
    doctorName: 'Dr. Rajesh Kumar',
    lastUpdated: '2024-12-20',
    dietPlan: {
      morning: {
        time: '6:00 AM - 8:00 AM',
        foods: [
          'Warm water with ginger',
          'Anti-inflammatory herbal tea',
          'Oats porridge with nuts'
        ],
        avoid: ['Cold beverages', 'Refined sugar']
      },
      midMorning: {
        time: '10:00 AM - 11:00 AM',
        foods: [
          'Fresh pomegranate juice',
          'Walnuts and dates',
          'Warm herbal tea'
        ],
        avoid: ['Processed snacks']
      },
      lunch: {
        time: '12:00 PM - 1:00 PM',
        foods: [
          'Brown rice with turmeric dal',
          'Anti-inflammatory vegetables',
          'Fresh curd',
          'Ghee in moderation'
        ],
        avoid: ['White rice', 'Excessive salt']
      },
      evening: {
        time: '4:00 PM - 5:00 PM',
        foods: [
          'Golden milk (turmeric latte)',
          'Roasted seeds',
          'Herbal tea'
        ],
        avoid: ['Sugary snacks']
      },
      dinner: {
        time: '7:00 PM - 8:00 PM',
        foods: [
          'Light vegetable soup',
          'Quinoa or millet',
          'Steamed broccoli'
        ],
        avoid: ['Heavy proteins', 'Late meals']
      }
    },
    generalGuidelines: [
      'Focus on anti-inflammatory foods',
      'Include omega-3 rich foods',
      'Maintain hydration with warm fluids',
      'Eat smaller, frequent meals',
      'Include turmeric in daily diet'
    ],
    restrictions: [
      'Avoid inflammatory foods',
      'No processed meats',
      'Limit dairy if it causes inflammation',
      'Avoid excessive sugar',
      'No alcohol'
    ],
    notes: 'Completed treatment. Maintain this diet for joint health and to prevent arthritis flare-ups.'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Vikram Singh',
    doctorId: 1,
    doctorName: 'Dr. Rajesh Kumar',
    lastUpdated: '2025-01-19',
    dietPlan: {
      morning: {
        time: '6:00 AM - 8:00 AM',
        foods: [
          'Warm water with rock salt',
          'Digestive herbal tea',
          'Light breakfast: Moong dal chilla'
        ],
        avoid: ['Heavy breakfast', 'Milk products']
      },
      midMorning: {
        time: '10:00 AM - 11:00 AM',
        foods: [
          'Fresh vegetable juice',
          'Digestive biscuits (homemade)',
          'Warm water'
        ],
        avoid: ['Citrus fruits', 'Raw foods']
      },
      lunch: {
        time: '12:00 PM - 1:00 PM',
        foods: [
          'White rice with simple dal',
          'Cooked vegetables',
          'Digestive churna after meals',
          'Warm water'
        ],
        avoid: ['Spicy food', 'Raw salads', 'Cold water']
      },
      evening: {
        time: '4:00 PM - 5:00 PM',
        foods: [
          'Digestive tea (cumin, coriander)',
          'Light snacks: Roasted moong',
          'Warm water'
        ],
        avoid: ['Heavy snacks', 'Cold beverages']
      },
      dinner: {
        time: '7:00 PM - 8:00 PM',
        foods: [
          'Light khichdi',
          'Steamed bottle gourd',
          'Warm water',
          'Digestive herbs'
        ],
        avoid: ['Heavy dinner', 'Raw foods', 'Late eating']
      }
    },
    generalGuidelines: [
      'Eat easily digestible foods',
      'Maintain regular meal times',
      'Drink warm water only',
      'Include digestive spices',
      'Eat in small quantities',
      'Rest after meals'
    ],
    restrictions: [
      'No raw foods or salads',
      'Avoid cold and frozen items',
      'No fermented foods initially',
      'Avoid overeating',
      'No late night meals'
    ],
    notes: 'Pre-treatment diet to prepare digestive system for Virechana therapy. Follow strictly for best results.'
  }
];
