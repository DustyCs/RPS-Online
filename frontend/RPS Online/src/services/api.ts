import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://rps-online-h2c8.onrender.com/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;