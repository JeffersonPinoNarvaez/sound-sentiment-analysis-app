import axios from 'axios';
import { configurations } from '../config';

const baseURL = configurations.services.url;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': configurations.services.headers.content_type,
  },
});

api.interceptors.request.use(config => {
  return config;
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default api;
