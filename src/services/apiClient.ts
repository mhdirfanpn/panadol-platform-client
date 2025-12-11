import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:8080/api/super-admin';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add X-User-Id header
apiClient.interceptors.request.use(
  (config) => {
    // Get user ID from localStorage (assuming super admin ID is 1)
    const userId = localStorage.getItem('userId') || '1';
    config.headers['X-User-Id'] = userId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

