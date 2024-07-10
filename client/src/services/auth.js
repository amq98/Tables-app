import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};
