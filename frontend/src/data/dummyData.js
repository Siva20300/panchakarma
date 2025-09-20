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

// Detailed patient data for treatment tracking
export const detailedPatientData = [
  {
    id: 1,
    name: 'Amit Patel',
    age: 35,
    phone: '+91 9876543210',
    email: 'amit@example.com',
    problems: ['Chronic Back Pain', 'Stress', 'Sleep Issues'],
    treatmentPlan: 'Abhyanga + Shirodhara (14 sessions)',
    assignedTherapist: 'Priya Sharma',
    status: 'ongoing',
    meetingType: 'offline',
    meetingPreference: 'In-person consultation preferred',
    overallProgress: 65,
    completedSessions: 9,
    totalSessions: 14,
    therapyProgress: [
      {
        name: 'Abhyanga Massage',
        progress: 70,
        sessionsCompleted: 7,
        totalSessions: 10,
        color: '#10b981'
      },
      {
        name: 'Shirodhara Therapy',
        progress: 50,
        sessionsCompleted: 2,
        totalSessions: 4,
        color: '#3b82f6'
      }
    ],
    healthMetrics: [
      {
        name: 'Pain Level',
        description: 'Back pain intensity (1-10 scale)',
        status: 'Improved',
        value: '3/10 (was 8/10)'
      },
      {
        name: 'Sleep Quality',
        description: 'Hours of restful sleep',
        status: 'Improved',
        value: '7 hours (was 4 hours)'
      },
      {
        name: 'Stress Level',
        description: 'Self-reported stress (1-10 scale)',
        status: 'Improved',
        value: '4/10 (was 9/10)'
      },
      {
        name: 'Flexibility',
        description: 'Range of motion assessment',
        status: 'Stable',
        value: 'Moderate improvement'
      }
    ],
    upcomingSessions: [
      {
        therapy: 'Abhyanga Massage',
        date: 'Jan 22, 2025',
        time: '10:00 AM',
        duration: '60 minutes',
        therapist: 'Priya Sharma'
      },
      {
        therapy: 'Shirodhara Therapy',
        date: 'Jan 24, 2025',
        time: '2:00 PM',
        duration: '45 minutes',
        therapist: 'Priya Sharma'
      }
    ],
    feedbackHistory: [
      {
        sessionNumber: 9,
        therapy: 'Abhyanga Massage',
        date: 'Jan 18, 2025',
        therapist: 'Priya Sharma',
        rating: 5,
        patientComment: 'Excellent session! My back pain has reduced significantly. The therapist was very skilled and attentive to my problem areas.',
        painLevel: 3,
        energyLevel: 8,
        sleepQuality: 8,
        mood: 'Relaxed'
      },
      {
        sessionNumber: 8,
        therapy: 'Shirodhara Therapy',
        date: 'Jan 16, 2025',
        therapist: 'Priya Sharma',
        rating: 5,
        patientComment: 'Very calming and peaceful. I felt deeply relaxed during and after the session. My stress levels have decreased noticeably.',
        painLevel: 4,
        energyLevel: 7,
        sleepQuality: 7,
        mood: 'Peaceful'
      },
      {
        sessionNumber: 7,
        therapy: 'Abhyanga Massage',
        date: 'Jan 14, 2025',
        therapist: 'Priya Sharma',
        rating: 4,
        patientComment: 'Good session, though I experienced some initial discomfort. The therapist adjusted the pressure accordingly.',
        painLevel: 5,
        energyLevel: 6,
        sleepQuality: 6,
        mood: 'Hopeful'
      }
    ],
    sessionDetails: [
      {
        sessionNumber: 9,
        date: 'Jan 18, 2025',
        time: '10:00 AM',
        therapy: 'Abhyanga Massage',
        therapist: 'Priya Sharma',
        duration: '60 minutes',
        status: 'Completed',
        notes: 'Focused on lower back. Patient reported significant pain relief.'
      },
      {
        sessionNumber: 8,
        date: 'Jan 16, 2025',
        time: '2:00 PM',
        therapy: 'Shirodhara Therapy',
        therapist: 'Priya Sharma',
        duration: '45 minutes',
        status: 'Completed',
        notes: 'Patient achieved deep relaxation state. Stress levels visibly reduced.'
      },
      {
        sessionNumber: 10,
        date: 'Jan 22, 2025',
        time: '10:00 AM',
        therapy: 'Abhyanga Massage',
        therapist: 'Priya Sharma',
        duration: '60 minutes',
        status: 'Scheduled',
        notes: 'Continue focus on lower back and shoulders.'
      }
    ],
    therapistNotes: [
      {
        sessionNumber: 9,
        date: 'Jan 18, 2025',
        therapy: 'Abhyanga Massage',
        therapist: 'Priya Sharma',
        observations: 'Patient shows excellent progress. Muscle tension in lower back has reduced by approximately 60%. Range of motion improved.',
        recommendations: 'Continue current treatment plan. Consider adding gentle yoga exercises.',
        nextFocus: 'Maintain focus on lower back, add shoulder work in next session.'
      },
      {
        sessionNumber: 8,
        date: 'Jan 16, 2025',
        therapy: 'Shirodhara Therapy',
        therapist: 'Priya Sharma',
        observations: 'Patient achieved deep meditative state within 10 minutes. Stress indicators (facial tension, breathing) normalized.',
        recommendations: 'Continue Shirodhara sessions. Patient responds very well to this therapy.',
        nextFocus: 'Maintain current approach, possibly extend session duration slightly.'
      }
    ]
  },
  {
    id: 2,
    name: 'Sunita Reddy',
    age: 42,
    phone: '+91 9876543211',
    email: 'sunita@example.com',
    problems: ['Arthritis', 'Joint Pain', 'Inflammation'],
    treatmentPlan: 'Pizhichil + Njavarakizhi (21 sessions)',
    assignedTherapist: 'Ravi Kumar',
    status: 'ongoing',
    meetingType: 'online',
    meetingPreference: 'Video consultation for follow-up',
    overallProgress: 80,
    completedSessions: 17,
    totalSessions: 21,
    therapyProgress: [
      {
        name: 'Pizhichil Therapy',
        progress: 85,
        sessionsCompleted: 11,
        totalSessions: 13,
        color: '#8b5cf6'
      },
      {
        name: 'Njavarakizhi',
        progress: 75,
        sessionsCompleted: 6,
        totalSessions: 8,
        color: '#f59e0b'
      }
    ],
    healthMetrics: [
      {
        name: 'Joint Pain',
        description: 'Overall joint discomfort level',
        status: 'Improved',
        value: '2/10 (was 7/10)'
      },
      {
        name: 'Morning Stiffness',
        description: 'Duration of morning joint stiffness',
        status: 'Improved',
        value: '15 mins (was 2 hours)'
      },
      {
        name: 'Mobility',
        description: 'Range of motion in affected joints',
        status: 'Improved',
        value: 'Significant improvement'
      },
      {
        name: 'Inflammation',
        description: 'Visible swelling in joints',
        status: 'Improved',
        value: 'Minimal swelling'
      }
    ],
    upcomingSessions: [
      {
        therapy: 'Pizhichil Therapy',
        date: 'Jan 21, 2025',
        time: '11:00 AM',
        duration: '75 minutes',
        therapist: 'Ravi Kumar'
      },
      {
        therapy: 'Njavarakizhi',
        date: 'Jan 23, 2025',
        time: '3:00 PM',
        duration: '60 minutes',
        therapist: 'Ravi Kumar'
      }
    ],
    feedbackHistory: [
      {
        sessionNumber: 17,
        therapy: 'Pizhichil Therapy',
        date: 'Jan 19, 2025',
        therapist: 'Ravi Kumar',
        rating: 5,
        patientComment: 'Amazing results! My joint pain has almost disappeared. I can move much more freely now.',
        painLevel: 2,
        energyLevel: 8,
        sleepQuality: 8,
        mood: 'Optimistic'
      },
      {
        sessionNumber: 16,
        therapy: 'Njavarakizhi',
        date: 'Jan 17, 2025',
        therapist: 'Ravi Kumar',
        rating: 4,
        patientComment: 'The warm rice bolus treatment feels wonderful. My joints feel much more flexible after each session.',
        painLevel: 3,
        energyLevel: 7,
        sleepQuality: 7,
        mood: 'Comfortable'
      }
    ],
    sessionDetails: [
      {
        sessionNumber: 17,
        date: 'Jan 19, 2025',
        time: '11:00 AM',
        therapy: 'Pizhichil Therapy',
        therapist: 'Ravi Kumar',
        duration: '75 minutes',
        status: 'Completed',
        notes: 'Excellent response to treatment. Joint mobility significantly improved.'
      },
      {
        sessionNumber: 18,
        date: 'Jan 21, 2025',
        time: '11:00 AM',
        therapy: 'Pizhichil Therapy',
        therapist: 'Ravi Kumar',
        duration: '75 minutes',
        status: 'Scheduled',
        notes: 'Continue current protocol. Patient nearing completion.'
      }
    ],
    therapistNotes: [
      {
        sessionNumber: 17,
        date: 'Jan 19, 2025',
        therapy: 'Pizhichil Therapy',
        therapist: 'Ravi Kumar',
        observations: 'Remarkable improvement in joint flexibility. Patient can now perform full range of motion without discomfort.',
        recommendations: 'Complete remaining sessions as planned. Consider maintenance therapy monthly.',
        nextFocus: 'Maintain current approach for final sessions.'
      }
    ]
  },
  {
    id: 3,
    name: 'Vikram Singh',
    age: 28,
    phone: '+91 9876543212',
    email: 'vikram@example.com',
    problems: ['Digestive Issues', 'Fatigue', 'Poor Appetite'],
    treatmentPlan: 'Virechana + Basti (10 sessions)',
    assignedTherapist: 'Dr. Anjali Mehta',
    status: 'ongoing',
    meetingType: 'offline',
    meetingPreference: 'Physical examination required',
    overallProgress: 40,
    completedSessions: 4,
    totalSessions: 10,
    therapyProgress: [
      {
        name: 'Virechana (Purgation)',
        progress: 50,
        sessionsCompleted: 2,
        totalSessions: 4,
        color: '#ef4444'
      },
      {
        name: 'Basti (Enema)',
        progress: 33,
        sessionsCompleted: 2,
        totalSessions: 6,
        color: '#06b6d4'
      }
    ],
    healthMetrics: [
      {
        name: 'Digestion',
        description: 'Digestive comfort and efficiency',
        status: 'Improved',
        value: 'Much better'
      },
      {
        name: 'Energy Level',
        description: 'Daily energy and vitality',
        status: 'Improved',
        value: '7/10 (was 4/10)'
      },
      {
        name: 'Appetite',
        description: 'Desire and ability to eat',
        status: 'Improved',
        value: 'Normal appetite restored'
      },
      {
        name: 'Bowel Movement',
        description: 'Regularity and comfort',
        status: 'Improved',
        value: 'Regular and comfortable'
      }
    ],
    upcomingSessions: [
      {
        therapy: 'Virechana Therapy',
        date: 'Jan 23, 2025',
        time: '9:00 AM',
        duration: '90 minutes',
        therapist: 'Dr. Anjali Mehta'
      },
      {
        therapy: 'Basti Treatment',
        date: 'Jan 25, 2025',
        time: '10:00 AM',
        duration: '60 minutes',
        therapist: 'Dr. Anjali Mehta'
      }
    ],
    feedbackHistory: [
      {
        sessionNumber: 4,
        therapy: 'Basti Treatment',
        date: 'Jan 18, 2025',
        therapist: 'Dr. Anjali Mehta',
        rating: 4,
        patientComment: 'The treatment is helping my digestion significantly. I feel more energetic and my appetite has improved.',
        painLevel: 1,
        energyLevel: 7,
        sleepQuality: 7,
        mood: 'Hopeful'
      },
      {
        sessionNumber: 3,
        therapy: 'Virechana Therapy',
        date: 'Jan 16, 2025',
        therapist: 'Dr. Anjali Mehta',
        rating: 3,
        patientComment: 'The detox process was intense but I can feel the benefits. My digestion is much better now.',
        painLevel: 2,
        energyLevel: 6,
        sleepQuality: 6,
        mood: 'Determined'
      }
    ],
    sessionDetails: [
      {
        sessionNumber: 4,
        date: 'Jan 18, 2025',
        time: '10:00 AM',
        therapy: 'Basti Treatment',
        therapist: 'Dr. Anjali Mehta',
        duration: '60 minutes',
        status: 'Completed',
        notes: 'Patient tolerated treatment well. Digestive improvements noted.'
      },
      {
        sessionNumber: 5,
        date: 'Jan 23, 2025',
        time: '9:00 AM',
        therapy: 'Virechana Therapy',
        therapist: 'Dr. Anjali Mehta',
        duration: '90 minutes',
        status: 'Scheduled',
        notes: 'Continue detoxification protocol.'
      }
    ],
    therapistNotes: [
      {
        sessionNumber: 4,
        date: 'Jan 18, 2025',
        therapy: 'Basti Treatment',
        therapist: 'Dr. Anjali Mehta',
        observations: 'Patient responding well to Panchakarma protocol. Digestive fire (Agni) is strengthening.',
        recommendations: 'Continue current treatment plan. Patient should maintain prescribed diet.',
        nextFocus: 'Complete Virechana series, then focus on Basti treatments.'
      }
    ]
  },
  {
    id: 4,
    name: 'Meera Krishnan',
    age: 38,
    phone: '+91 9876543213',
    email: 'meera@example.com',
    problems: ['Migraine', 'Anxiety', 'Insomnia'],
    treatmentPlan: 'Shirodhara + Nasya (12 sessions)',
    assignedTherapist: 'Dr. Pradeep Nair',
    status: 'ongoing',
    meetingType: 'online',
    meetingPreference: 'Flexible - online or offline',
    overallProgress: 75,
    completedSessions: 9,
    totalSessions: 12,
    therapyProgress: [
      {
        name: 'Shirodhara Therapy',
        progress: 80,
        sessionsCompleted: 6,
        totalSessions: 8,
        color: '#14b8a6'
      },
      {
        name: 'Nasya Treatment',
        progress: 75,
        sessionsCompleted: 3,
        totalSessions: 4,
        color: '#f97316'
      }
    ],
    healthMetrics: [
      {
        name: 'Migraine Frequency',
        description: 'Number of migraine episodes per week',
        status: 'Improved',
        value: '1 per week (was 4 per week)'
      },
      {
        name: 'Sleep Quality',
        description: 'Quality and duration of sleep',
        status: 'Improved',
        value: '8 hours restful (was 4 hours)'
      },
      {
        name: 'Anxiety Level',
        description: 'Self-reported anxiety intensity',
        status: 'Improved',
        value: '3/10 (was 8/10)'
      },
      {
        name: 'Mental Clarity',
        description: 'Focus and concentration ability',
        status: 'Improved',
        value: 'Significantly clearer'
      }
    ],
    upcomingSessions: [
      {
        therapy: 'Shirodhara Therapy',
        date: 'Jan 22, 2025',
        time: '4:00 PM',
        duration: '50 minutes',
        therapist: 'Dr. Pradeep Nair'
      },
      {
        therapy: 'Nasya Treatment',
        date: 'Jan 24, 2025',
        time: '11:00 AM',
        duration: '30 minutes',
        therapist: 'Dr. Pradeep Nair'
      }
    ],
    feedbackHistory: [
      {
        sessionNumber: 9,
        therapy: 'Shirodhara Therapy',
        date: 'Jan 19, 2025',
        therapist: 'Dr. Pradeep Nair',
        rating: 5,
        patientComment: 'Incredible relief! My migraines have reduced dramatically and I am sleeping much better. This therapy is life-changing.',
        painLevel: 1,
        energyLevel: 9,
        sleepQuality: 9,
        mood: 'Peaceful'
      },
      {
        sessionNumber: 8,
        therapy: 'Nasya Treatment',
        date: 'Jan 17, 2025',
        therapist: 'Dr. Pradeep Nair',
        rating: 4,
        patientComment: 'The nasal treatment helps clear my head and reduces the pressure that usually leads to migraines.',
        painLevel: 2,
        energyLevel: 8,
        sleepQuality: 8,
        mood: 'Clear-headed'
      }
    ],
    sessionDetails: [
      {
        sessionNumber: 9,
        date: 'Jan 19, 2025',
        time: '4:00 PM',
        therapy: 'Shirodhara Therapy',
        therapist: 'Dr. Pradeep Nair',
        duration: '50 minutes',
        status: 'Completed',
        notes: 'Excellent response. Patient achieved deep relaxation quickly.'
      },
      {
        sessionNumber: 10,
        date: 'Jan 22, 2025',
        time: '4:00 PM',
        therapy: 'Shirodhara Therapy',
        therapist: 'Dr. Pradeep Nair',
        duration: '50 minutes',
        status: 'Scheduled',
        notes: 'Continue current protocol. Near completion of treatment plan.'
      }
    ],
    therapistNotes: [
      {
        sessionNumber: 9,
        date: 'Jan 19, 2025',
        therapy: 'Shirodhara Therapy',
        therapist: 'Dr. Pradeep Nair',
        observations: 'Patient shows remarkable improvement. Migraine frequency reduced by 75%. Sleep patterns normalized.',
        recommendations: 'Complete remaining sessions. Consider monthly maintenance therapy.',
        nextFocus: 'Maintain current approach for final sessions.'
      }
    ]
  }
];

// Therapist Notifications for Doctor Dashboard
export const therapistNotifications = [
  {
    id: 1,
    therapistName: 'Priya Sharma',
    therapistId: 1,
    patientName: 'Amit Patel',
    patientId: 1,
    message: 'Patient completed session 3 successfully. Showing good progress with reduced back pain.',
    type: 'session_update',
    timestamp: '2025-01-18T14:30:00Z',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 2,
    therapistName: 'Rajesh Gupta',
    therapistId: 2,
    patientName: 'Sunita Reddy',
    patientId: 2,
    message: 'Patient missed scheduled appointment today. Please reschedule.',
    type: 'appointment_missed',
    timestamp: '2025-01-18T10:15:00Z',
    isRead: false,
    priority: 'high'
  },
  {
    id: 3,
    therapistName: 'Anjali Nair',
    therapistId: 3,
    patientName: 'Vikram Singh',
    patientId: 3,
    message: 'Patient experiencing mild discomfort after Virechana. Monitoring closely.',
    type: 'health_concern',
    timestamp: '2025-01-18T09:45:00Z',
    isRead: false,
    priority: 'high'
  },
  {
    id: 4,
    therapistName: 'Priya Sharma',
    therapistId: 1,
    patientName: 'Meera Krishnan',
    patientId: 4,
    message: 'Excellent response to Shirodhara therapy. Migraine frequency reduced significantly.',
    type: 'positive_update',
    timestamp: '2025-01-17T16:20:00Z',
    isRead: true,
    priority: 'low'
  },
  {
    id: 5,
    therapistName: 'Rajesh Gupta',
    therapistId: 2,
    patientName: 'Amit Patel',
    patientId: 1,
    message: 'Requesting doctor consultation for treatment plan adjustment.',
    type: 'consultation_request',
    timestamp: '2025-01-17T11:30:00Z',
    isRead: false,
    priority: 'medium'
  }
];
