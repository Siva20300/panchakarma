const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Patient = require('../models/Patient');
const Treatment = require('../models/Treatment');
const Booking = require('../models/Booking');
const FoodDiet = require('../models/FoodDiet');
const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Treatment.deleteMany({});
    await Booking.deleteMany({});
    await FoodDiet.deleteMany({});
    await Feedback.deleteMany({});
    await Notification.deleteMany({});
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

// Seed users
const seedUsers = async () => {
  try {
    const users = [
      // Admin
      {
        name: 'Admin User',
        email: 'admin@panchakarma.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 9999999999',
        isActive: true,
        emailVerified: true
      },
      // Doctors
      {
        name: 'Dr. Rajesh Kumar',
        email: 'doctor@panchakarma.com',
        password: 'doctor123',
        role: 'doctor',
        phone: '+91 9876543210',
        specialization: 'Panchakarma Specialist',
        experience: '15 years',
        qualification: 'BAMS, MD (Panchakarma)',
        isActive: true,
        emailVerified: true
      },
      {
        name: 'Dr. Priya Nair',
        email: 'priya.nair@panchakarma.com',
        password: 'doctor123',
        role: 'doctor',
        phone: '+91 9876543211',
        specialization: 'Ayurvedic Medicine',
        experience: '12 years',
        qualification: 'BAMS, MD (Kayachikitsa)',
        isActive: true,
        emailVerified: true
      },
      // Therapists
      {
        name: 'Priya Sharma',
        email: 'therapist@panchakarma.com',
        password: 'therapist123',
        role: 'therapist',
        phone: '+91 9876543220',
        specialization: 'Abhyanga & Shirodhara',
        experience: '8 years',
        qualification: 'Certified Panchakarma Therapist',
        isActive: true,
        emailVerified: true
      },
      {
        name: 'Ravi Kumar',
        email: 'ravi.kumar@panchakarma.com',
        password: 'therapist123',
        role: 'therapist',
        phone: '+91 9876543221',
        specialization: 'Pizhichil & Njavarakizhi',
        experience: '12 years',
        qualification: 'Advanced Panchakarma Therapist',
        isActive: true,
        emailVerified: true
      },
      // Patients
      {
        name: 'Amit Patel',
        email: 'patient@panchakarma.com',
        password: 'patient123',
        role: 'patient',
        phone: '+91 9876543210',
        age: 35,
        gender: 'male',
        address: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India'
        },
        isActive: true,
        emailVerified: true
      },
      {
        name: 'Sunita Reddy',
        email: 'sunita.reddy@example.com',
        password: 'patient123',
        role: 'patient',
        phone: '+91 9876543211',
        age: 42,
        gender: 'female',
        address: {
          street: '456 Park Avenue',
          city: 'Hyderabad',
          state: 'Telangana',
          zipCode: '500001',
          country: 'India'
        },
        isActive: true,
        emailVerified: true
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        password: 'patient123',
        role: 'patient',
        phone: '+91 9876543212',
        age: 28,
        gender: 'male',
        address: {
          street: '789 Garden Road',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          country: 'India'
        },
        isActive: true,
        emailVerified: true
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Seed patients
const seedPatients = async (users) => {
  try {
    const patientUsers = users.filter(user => user.role === 'patient');
    const doctorUser = users.find(user => user.role === 'doctor');
    const therapistUser = users.find(user => user.role === 'therapist');

    const patients = patientUsers.map((user, index) => ({
      user: user._id,
      problems: [
        ['Chronic back pain', 'Stress'],
        ['Arthritis', 'Joint pain'],
        ['Digestive issues', 'Fatigue']
      ][index] || ['General wellness'],
      primaryProblem: [
        'Chronic back pain and stress',
        'Arthritis and joint pain',
        'Digestive issues and fatigue'
      ][index] || 'General wellness',
      assignedDoctor: doctorUser._id,
      assignedTherapist: index < 2 ? therapistUser._id : null,
      status: ['ongoing', 'completed', 'pending'][index] || 'pending',
      meetingPreference: 'offline',
      height: { value: 170 + index * 5, unit: 'cm' },
      weight: { value: 70 + index * 5, unit: 'kg' },
      prakriti: ['vata-pitta', 'pitta-kapha', 'vata'][index] || 'vata',
      lifestyle: {
        occupation: ['Software Engineer', 'Teacher', 'Business Owner'][index] || 'Professional',
        workingHours: '9-5',
        sleepPattern: 'Regular',
        exerciseRoutine: 'Moderate',
        stressLevel: 6 + index,
        smokingStatus: 'never',
        alcoholConsumption: 'occasional'
      },
      dietaryPreferences: 'vegetarian',
      progressMetrics: [
        {
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          painLevel: 7 - index,
          energyLevel: 5 + index,
          sleepQuality: 6 + index,
          overallWellbeing: 6 + index,
          notes: 'Initial assessment'
        }
      ]
    }));

    const createdPatients = await Patient.insertMany(patients);
    console.log(`${createdPatients.length} patients created`);
    return createdPatients;
  } catch (error) {
    console.error('Error seeding patients:', error);
  }
};

// Seed treatments
const seedTreatments = async (users, patients) => {
  try {
    const doctorUser = users.find(user => user.role === 'doctor');
    const therapistUser = users.find(user => user.role === 'therapist');

    const treatments = [
      {
        patient: patients[0]._id,
        doctor: doctorUser._id,
        therapist: therapistUser._id,
        treatmentType: 'Abhyanga + Shirodhara',
        therapyTypes: ['Abhyanga', 'Shirodhara'],
        description: 'Comprehensive stress relief program with oil massage and head therapy',
        objectives: ['Reduce stress', 'Improve sleep quality', 'Relieve muscle tension'],
        duration: {
          weeks: 2,
          sessionsPerWeek: 3,
          totalSessions: 6
        },
        status: 'ongoing',
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        expectedEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        cost: {
          totalAmount: 15000,
          paidAmount: 10000,
          currency: 'INR',
          paymentStatus: 'partial'
        },
        sessions: [
          {
            sessionNumber: 1,
            scheduledDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
            actualDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
            therapist: therapistUser._id,
            therapyType: 'Abhyanga',
            duration: 60,
            status: 'completed',
            postSessionNotes: 'Patient responded well to treatment',
            completedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
          }
        ]
      }
    ];

    const createdTreatments = await Treatment.insertMany(treatments);
    console.log(`${createdTreatments.length} treatments created`);
    return createdTreatments;
  } catch (error) {
    console.error('Error seeding treatments:', error);
  }
};

// Seed bookings
const seedBookings = async (users, patients) => {
  try {
    const therapistUser = users.find(user => user.role === 'therapist');
    const doctorUser = users.find(user => user.role === 'doctor');

    const bookings = [
      {
        patient: patients[0]._id,
        therapist: therapistUser._id,
        doctor: doctorUser._id,
        therapyType: 'Abhyanga + Shirodhara',
        appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        appointmentTime: '10:00',
        duration: 90,
        status: 'confirmed',
        reasonForVisit: 'Regular therapy session',
        meetingMode: 'offline',
        urgencyLevel: 'medium'
      },
      {
        patient: patients[1]._id,
        therapist: therapistUser._id,
        doctor: doctorUser._id,
        therapyType: 'Pizhichil',
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        appointmentTime: '14:00',
        duration: 60,
        status: 'pending',
        reasonForVisit: 'Arthritis treatment',
        meetingMode: 'offline',
        urgencyLevel: 'high'
      }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log(`${createdBookings.length} bookings created`);
    return createdBookings;
  } catch (error) {
    console.error('Error seeding bookings:', error);
  }
};

// Seed food diets
const seedFoodDiets = async (users, patients) => {
  try {
    const doctorUser = users.find(user => user.role === 'doctor');

    const foodDiets = [
      {
        patient: patients[0]._id,
        createdBy: doctorUser._id,
        title: 'Anti-Inflammatory Diet Plan',
        description: 'Customized diet plan to reduce inflammation and support panchakarma treatment',
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        generalGuidelines: [
          {
            guideline: 'Eat warm, freshly cooked food',
            importance: 'high',
            explanation: 'Warm food aids digestion and supports healing'
          },
          {
            guideline: 'Drink warm water throughout the day',
            importance: 'medium',
            explanation: 'Helps with detoxification and hydration'
          }
        ],
        restrictions: [
          {
            item: 'Cold and frozen foods',
            reason: 'Can disturb digestion',
            severity: 'moderate',
            alternatives: ['Room temperature foods', 'Warm alternatives']
          }
        ],
        mealPlan: {
          breakfast: {
            recommended: [
              {
                food: 'Warm oatmeal with fruits',
                quantity: '1 bowl',
                benefits: 'Provides fiber and energy',
                preparation: 'Cook with milk and add fresh fruits'
              }
            ],
            avoid: ['Cold cereals', 'Ice cream'],
            timing: '7:00-8:00 AM',
            notes: 'Start the day with warm, nourishing food'
          },
          lunch: {
            recommended: [
              {
                food: 'Rice with dal and vegetables',
                quantity: '1 plate',
                benefits: 'Complete protein and nutrients',
                preparation: 'Cook with minimal spices'
              }
            ],
            avoid: ['Heavy fried foods', 'Cold salads'],
            timing: '12:00-1:00 PM',
            notes: 'Main meal of the day'
          }
        },
        ayurvedicPrinciples: {
          dosha: 'vata-pitta',
          tastes: {
            increase: [
              { taste: 'sweet', reason: 'Balances vata and pitta' },
              { taste: 'bitter', reason: 'Reduces pitta' }
            ],
            decrease: [
              { taste: 'pungent', reason: 'Can increase pitta' }
            ]
          }
        }
      }
    ];

    const createdFoodDiets = await FoodDiet.insertMany(foodDiets);
    console.log(`${createdFoodDiets.length} food diets created`);
    return createdFoodDiets;
  } catch (error) {
    console.error('Error seeding food diets:', error);
  }
};

// Seed notifications
const seedNotifications = async (users) => {
  try {
    const patientUser = users.find(user => user.role === 'patient');
    const therapistUser = users.find(user => user.role === 'therapist');

    const notifications = [
      {
        recipient: patientUser._id,
        type: 'appointment_reminder',
        title: 'Appointment Reminder',
        message: 'You have an appointment tomorrow at 10:00 AM for Abhyanga therapy',
        priority: 'high',
        channels: [{ type: 'in-app' }],
        scheduledFor: new Date()
      },
      {
        recipient: therapistUser._id,
        type: 'new_booking',
        title: 'New Booking Assigned',
        message: 'A new patient has been assigned to you for Shirodhara treatment',
        priority: 'medium',
        channels: [{ type: 'in-app' }],
        scheduledFor: new Date()
      }
    ];

    const createdNotifications = await Notification.insertMany(notifications);
    console.log(`${createdNotifications.length} notifications created`);
    return createdNotifications;
  } catch (error) {
    console.error('Error seeding notifications:', error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Starting database seeding...');
    
    // Clear existing data
    await clearDatabase();
    
    // Seed data in order
    const users = await seedUsers();
    const patients = await seedPatients(users);
    const treatments = await seedTreatments(users, patients);
    const bookings = await seedBookings(users, patients);
    const foodDiets = await seedFoodDiets(users, patients);
    const notifications = await seedNotifications(users);
    
    console.log('Database seeding completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@panchakarma.com / admin123');
    console.log('Doctor: doctor@panchakarma.com / doctor123');
    console.log('Therapist: therapist@panchakarma.com / therapist123');
    console.log('Patient: patient@panchakarma.com / patient123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
