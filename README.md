# AyurSutra - Panchakarma Patient Management & Therapy Scheduling Software

A comprehensive MERN stack web application for managing Panchakarma treatments, patient bookings, and therapy scheduling.

## 🌟 Features

### 👨‍⚕️ Doctor Dashboard (Admin Role)
- View all patient booking details (name, age, health problem, therapy type)
- View available therapists and their specialties
- Assign patient → therapist → therapy plan (number of sessions)
- Track therapy progress & feedback (from both patient & therapist)
- Send notifications to patients (booking confirmation, pre- & post-therapy precautions)

### 👩‍⚕️ Therapist Dashboard
- View assigned patients from doctor
- See patient details (problem, therapy type, number of sessions)
- Update therapy status (session done/pending)
- Submit feedback after each session

### 👤 Patient Dashboard (User Role)
- Fill profile (name, age, problem, etc.)
- Book therapy schedule (select date/time)
- Receive booking confirmation notification
- Automated reminders before therapy date
- View precautions (pre-procedure & post-procedure)
- Submit feedback after therapy
- View progress assigned by doctor

### 🔔 Notification System
- Trigger notifications on booking → confirmation
- Before schedule date → reminder
- After therapy → feedback request
- In-app notifications with different types (success, error, warning, info)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd panchakarma
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Credentials

### Doctor Login
- Email: `doctor@ayursutra.com`
- Password: any password

### Therapist Login
- Email: `therapist@ayursutra.com`
- Password: any password

### Patient Login
- Email: `patient@ayursutra.com`
- Password: any password

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **React Context** - State management
- **Axios** - HTTP client (ready for backend integration)

### Backend (Coming Soon)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Mongoose** - ODM

## 📁 Project Structure

```
panchakarma/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── NotificationComponent.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   ├── TherapistDashboard.jsx
│   │   │   └── PatientDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── data/
│   │   │   └── dummyData.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design with CSS custom properties
- **Responsive Design** - Mobile-first approach with responsive grid system
- **Color Scheme** - Indigo primary colors with Ayurvedic green accents
- **Accessibility** - Focus states, semantic HTML, and screen reader support
- **Animations** - Smooth transitions and hover effects
- **Typography** - Inter font family for modern readability

## 🔧 Available Scripts

In the frontend directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Pages & Routes

- `/` - Home page with features and about Panchakarma
- `/login` - Authentication page
- `/register` - User registration with role selection
- `/doctor-dashboard` - Doctor admin panel (protected)
- `/therapist-dashboard` - Therapist management panel (protected)
- `/patient-dashboard` - Patient portal (protected)

## 🔒 Authentication & Authorization

- **Role-based access control** - Different dashboards for different user roles
- **Protected routes** - Unauthorized users redirected to login
- **Local storage** - User session persistence
- **Context API** - Global authentication state management

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚧 Future Enhancements

- Backend API integration
- Real-time notifications
- Email notifications
- Payment integration
- Advanced reporting
- Multi-language support
- PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@ayursutra.com or create an issue in the repository.