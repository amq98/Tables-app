// client/src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = {
  fetchRestaurants: () => axios.get(`${API_URL}/restaurants`),
  createRestaurant: (data) => axios.post(`${API_URL}/restaurants`, data),
  getRestaurant: (id) => axios.get(`${API_URL}/restaurants/${id}`),
  updateRestaurant: (id, data) => axios.put(`${API_URL}/restaurants/${id}`, data),
  deleteRestaurant: (id) => axios.delete(`${API_URL}/restaurants/${id}`),
};

export default api;
