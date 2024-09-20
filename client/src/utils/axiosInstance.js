import axios from 'axios';
import BACKEND_API_URL from './config';

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
});

// Add token to every request if logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
