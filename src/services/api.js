// frontend/src/services/api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000/api'; // Your backend API base URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the token to every request if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle unauthorized errors (e.g., token expired)
api.interceptors.response.use(
  (response) => {
    return response; // Handle successful responses normally
  },
  (error) => {
    if (error.response) {
      // Handle specific errors based on status code
      if (error.response.status === 401) {
        console.error('Unauthorized access, redirecting to login (or handling)');
        localStorage.removeItem('token'); // Remove the token if it's invalid or expired
        // window.location.href = '/login'; // Uncomment if you want to redirect to the login page
      } else if (error.response.status === 404) {
        console.error('Resource not found');
      } else if (error.response.status === 500) {
        console.error('Server error, please try again later');
      }
    }
    return Promise.reject(error); // Reject promise with error for further handling
  }
);

const apiService = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default apiService;
