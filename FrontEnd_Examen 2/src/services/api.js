// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5084/";

// Instancia para JSON
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ApiKey': '12345',
  }
});

// Instancia para FormData
const api_form_data = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  }
});

// Interceptor para añadir el token a todas las peticiones
const addTokenInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Interceptor para manejar respuestas y errores de autenticación
const addResponseInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Si el token ha expirado o es inválido
      if (error.response?.status === 401) {
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        // Redirigir al login solo si no estamos ya en login
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
  );
};

// Aplicar interceptors a ambas instancias
addTokenInterceptor(api);
addTokenInterceptor(api_form_data);
addResponseInterceptor(api);
addResponseInterceptor(api_form_data);

// Exportar las instancias
export { api, api_form_data };
export default api;