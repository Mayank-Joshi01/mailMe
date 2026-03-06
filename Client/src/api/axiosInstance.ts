import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api',
});

// Automatically attach the token if it exists in localStorage
API.interceptors.request.use((config) => {
  const User : any = JSON.parse(localStorage.getItem('User') || 'null');
  
  if (User && config.headers) {
    config.headers.Authorization = `Bearer ${User.token}`;
  }
  return config;
});

export default API;