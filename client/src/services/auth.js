// client/src/services/auth.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const auth = {
  register: (data) => axios.post(`${API_URL}/register`, data),
  login: (data) => axios.post(`${API_URL}/login`, data),
};

export default auth;
