/* // src/axiosConfig.js
import axios from 'axios';

// Configure Axios interceptors
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axios; */