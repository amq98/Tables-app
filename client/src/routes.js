import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import Login from './components/Login';
import Register from './components/Register';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RestaurantList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Add more routes here */}
    </Routes>
  </Router>
);

export default AppRoutes;
