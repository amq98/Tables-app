import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RestaurantsPage from './pages/restaurants/RestaurantsPage';
import NewRestaurantPage from './pages/restaurants/NewRestaurantPage';
import EditRestaurantPage from './pages/restaurants/EditRestaurantPage';
import DashboardPage from './pages/admin/DashboardPage';
import WelcomePage from './pages/WelcomePage';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restaurants" exact element={<RestaurantsPage />} />
        <Route path="/restaurants/new" element={<NewRestaurantPage />} />
        <Route path="/restaurants/:id/edit" element={<EditRestaurantPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
