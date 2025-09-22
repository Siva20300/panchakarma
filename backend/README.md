# Panchakarma Management System - Backend API

A comprehensive backend API for managing Panchakarma treatments, built with Node.js, Express, and MongoDB.

## Features

- **User Management**: Registration, authentication, and role-based access control
- **Patient Management**: Patient records, medical history, and progress tracking
- **Booking System**: Appointment scheduling, availability checking, and management
- **Treatment Plans**: Comprehensive treatment planning and session tracking
- **Food Diet Management**: Personalized diet plans and adherence tracking
- **Feedback System**: Patient and therapist feedback collection and analytics
- **Notification System**: Real-time notifications for all stakeholders
- **Therapist Management**: Therapist profiles, schedules, and patient assignments

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Email**: Nodemailer

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd panchakarma-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/panchakarma
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Users
- `GET /api/users` - Get all users (Admin/Doctor)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (Admin)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create patient record
- `PUT /api/patients/:id` - Update patient
- `PUT /api/patients/:id/assign-doctor` - Assign doctor
- `PUT /api/patients/:id/assign-therapist` - Assign therapist
- `POST /api/patients/:id/progress` - Add progress metric

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/available-slots` - Get available time slots
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/:id/reschedule` - Reschedule booking
- `PUT /api/bookings/:id/confirm` - Confirm booking

### Treatments
- `GET /api/treatments` - Get all treatments
- `GET /api/treatments/:id` - Get treatment by ID
- `POST /api/treatments` - Create treatment plan
- `PUT /api/treatments/:id` - Update treatment
- `POST /api/treatments/:id/sessions` - Add session
- `PUT /api/treatments/:id/sessions/:sessionId/complete` - Complete session

### Food Diets
- `GET /api/food-diets` - Get all diet plans
- `GET /api/food-diets/my-diet` - Get patient's diet plan
- `POST /api/food-diets` - Create diet plan
- `PUT /api/food-diets/:id` - Update diet plan
- `POST /api/food-diets/my-diet/adherence` - Add adherence entry

### Feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/my-feedbacks` - Get user's feedback
- `POST /api/feedback` - Create feedback
- `PUT /api/feedback/:id/patient-feedback` - Submit patient feedback
- `PUT /api/feedback/:id/therapist-feedback` - Submit therapist feedback

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread-count` - Get unread count
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/mark-all-read` - Mark all as read

### Therapists
- `GET /api/therapists` - Get all therapists
- `GET /api/therapists/:id` - Get therapist by ID
- `GET /api/therapists/:id/schedule` - Get therapist schedule
- `GET /api/therapists/:id/patients` - Get therapist's patients

## Authentication & Authorization

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **Admin**: Full system access
- **Doctor**: Can manage patients, treatments, and diet plans
- **Therapist**: Can view assigned patients, update sessions, and provide feedback
- **Patient**: Can view own records, book appointments, and provide feedback

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}, // Response data
  "pagination": {} // For paginated responses
}
```

## Validation

Request validation is handled using Express Validator. All endpoints validate:
- Required fields
- Data types
- Format constraints
- Business rules

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **Input Validation**: Comprehensive input validation
- **Password Hashing**: Bcrypt password hashing
- **JWT Authentication**: Secure token-based authentication

## Database Models

### User
- Basic user information
- Role-based access
- Authentication data

### Patient
- Medical history
- Treatment progress
- Lifestyle information

### Booking
- Appointment scheduling
- Session management
- Status tracking

### Treatment
- Treatment plans
- Session details
- Progress tracking

### FoodDiet
- Personalized diet plans
- Adherence tracking
- Progress monitoring

### Feedback
- Patient feedback
- Therapist observations
- Quality metrics

### Notification
- System notifications
- Multi-channel delivery
- Read status tracking

## Development

### Running Tests
```bash
npm test
```

### Code Linting
```bash
npm run lint
```

### Database Seeding
```bash
npm run seed
```

## Deployment

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set secure JWT secrets
4. Configure email service
5. Set up reverse proxy (nginx)
6. Enable SSL/TLS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
