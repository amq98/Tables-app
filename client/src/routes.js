import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RestaurantsPage from './pages/restaurants/RestaurantsPage';
import NewRestaurantPage from './pages/restaurants/NewRestaurantPage';
import EditRestaurantPage from './pages/restaurants/EditRestaurantPage';
import DashboardPage from './pages/admin/DashboardPage';
import WelcomePage from './pages/WelcomePage';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/new" element={<NewRestaurantPage />} />
        <Route path="/restaurants/:id/edit" element={<EditRestaurantPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
