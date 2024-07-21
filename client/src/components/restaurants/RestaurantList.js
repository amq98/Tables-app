import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/restaurants/RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.fetchRestaurants();
        setRestaurants(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteRestaurant(id);
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="restaurant-list">
      <h1>Restaurants</h1>
      <Link to="/restaurants/new" className="add-restaurant-button">
        Add New Restaurant
      </Link>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-item">
            <h2 className="restaurant-name">{restaurant.name}</h2>
            <p className="restaurant-detail">Address: {restaurant.address}</p>
            <p className="restaurant-detail">Cuisine: {restaurant.cuisine}</p>
            <p className="restaurant-detail">Rating: {restaurant.rating}</p>
            <Link to={`/restaurants/${restaurant.id}/edit`} className="edit-button">
              Edit
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDelete(restaurant.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No restaurants found</p>
      )}
    </div>
  );
};

export default RestaurantList;
