import axios from 'axios';
import { getAuthToken } from '../../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1',
});

api.interceptors.request.use((config: any) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      sessionStorage.removeItem(import.meta.env.VITE_WEB_STORAGE_ID);
      document.location.href = '/auth/login';
    }

    return Promise.reject(error);
  },
);

export { api };
