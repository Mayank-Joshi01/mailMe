import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api',
});

// Automatically attach the token if it exists in localStorage
API.interceptors.request.use((config) => {

  const token : any = localStorage.getItem('token') || 'null'; // ' token ' in local storage stored from AuthContext as const STORAGE_KEY = 'token'
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 2. The Auto-Logout Interceptor
API.interceptors.response.use(
  (response) => response, // If request succeeds, just return the data
  (error) => {
    // If the backend says the token is expired/invalid (401) or the user is forbidden (403), we log them out
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      console.warn("Session expired. Logging out...");
      
      // Destroy the local storage
      localStorage.removeItem('token'); // ' token ' in local storage stored from AuthContext as const STORAGE_KEY = 'token'
      
      // Force reload and redirect to login
      // Using window.location is perfectly safe here because it clears all React memory
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default API;