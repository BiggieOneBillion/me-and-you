import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3050/api', // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// export default api;