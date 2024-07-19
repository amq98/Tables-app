// client/src/routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './pages/RestaurantList';
import NewRestaurant from './pages/NewRestaurant';
import EditRestaurant from './pages/EditRestaurant';
import Register from './components/Register';
import Login from './components/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurants/new" element={<NewRestaurant />} />
        <Route path="/restaurants/:id/edit" element={<EditRestaurant />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
