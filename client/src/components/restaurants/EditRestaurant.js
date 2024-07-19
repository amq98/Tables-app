// client/src/pages/EditRestaurant.js

import React from 'react';
import RestaurantForm from '../components/RestaurantForm';
import { useParams } from 'react-router-dom';

const EditRestaurant = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Restaurant</h1>
      <RestaurantForm restaurantId={id} />
    </div>
  );
};

export default EditRestaurant;
