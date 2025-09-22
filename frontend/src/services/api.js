import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ayursutra_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('ayursutra_token');
      localStorage.removeItem('ayursutra_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

// User API calls
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Patient API calls
export const patientAPI = {
  getAllPatients: () => api.get('/patients'),
  getPatientById: (id) => api.get(`/patients/${id}`),
  createPatient: (patientData) => api.post('/patients', patientData),
  updatePatient: (id, patientData) => api.put(`/patients/${id}`, patientData),
  deletePatient: (id) => api.delete(`/patients/${id}`),
};

// Therapist API calls
export const therapistAPI = {
  getAllTherapists: () => api.get('/therapists'),
  getTherapistById: (id) => api.get(`/therapists/${id}`),
  updateTherapist: (id, therapistData) => api.put(`/therapists/${id}`, therapistData),
};

// Booking API calls
export const bookingAPI = {
  getAllBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  updateBooking: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),
  getMyBookings: () => api.get('/bookings/my-bookings'),
};

// Treatment API calls
export const treatmentAPI = {
  getAllTreatments: () => api.get('/treatments'),
  getTreatmentById: (id) => api.get(`/treatments/${id}`),
  createTreatment: (treatmentData) => api.post('/treatments', treatmentData),
  updateTreatment: (id, treatmentData) => api.put(`/treatments/${id}`, treatmentData),
  deleteTreatment: (id) => api.delete(`/treatments/${id}`),
};

// Notification API calls
export const notificationAPI = {
  getAllNotifications: () => api.get('/notifications'),
  getNotificationById: (id) => api.get(`/notifications/${id}`),
  createNotification: (notificationData) => api.post('/notifications', notificationData),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

// Food Diet API calls
export const foodDietAPI = {
  getAllFoodDiets: () => api.get('/food-diets'),
  getFoodDietById: (id) => api.get(`/food-diets/${id}`),
  createFoodDiet: (dietData) => api.post('/food-diets', dietData),
  updateFoodDiet: (id, dietData) => api.put(`/food-diets/${id}`, dietData),
  deleteFoodDiet: (id) => api.delete(`/food-diets/${id}`),
  getPatientDiet: (patientId) => api.get(`/food-diets/patient/${patientId}`),
};

// Feedback API calls
export const feedbackAPI = {
  getAllFeedback: () => api.get('/feedback'),
  getFeedbackById: (id) => api.get(`/feedback/${id}`),
  createFeedback: (feedbackData) => api.post('/feedback', feedbackData),
  updateFeedback: (id, feedbackData) => api.put(`/feedback/${id}`, feedbackData),
  deleteFeedback: (id) => api.delete(`/feedback/${id}`),
};

export default api;
