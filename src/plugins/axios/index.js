import axios from 'axios';
import API_ROUTES from './routes'; 

// Crear instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud (request)
api.interceptors.request.use(
  (config) => {
    // Usamos localStorage porque es lo que definiste en el interceptor
    const access_token = localStorage.getItem('access_token'); 
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta (response)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn('No autorizado. Redirigiendo al login...');
      } else if (status === 500) {
        console.error('Error interno del servidor');
      }
    } else {
      console.error('Error sin respuesta del servidor:', error.message);
    }

    return Promise.reject(error);
  }
);

api.routes = API_ROUTES; 

export default api;