import axios from 'axios';

export const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
});
