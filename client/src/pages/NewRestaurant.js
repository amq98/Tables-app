// client/src/pages/NewRestaurant.js

import React from 'react';
import RestaurantForm from '../components/RestaurantForm';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const NewRestaurant = () => {
  const navigate = useNavigate();

  const handleCreateRestaurant = async (data) => {
    try {
      await api.createRestaurant(data);
      navigate('/');
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  return (
    <div>
      <h1>Add New Restaurant</h1>
      <RestaurantForm onSubmit={handleCreateRestaurant} />
    </div>
  );
};

export default NewRestaurant;
