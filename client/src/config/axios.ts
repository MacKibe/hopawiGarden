import axios from 'axios';
import type { AxiosInstance } from 'axios';
import useAuthStore from '../store/useAuthStore';

const api: AxiosInstance = axios.create({baseURL: "/api", timeout: 30000,});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;