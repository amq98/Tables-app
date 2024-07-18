import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/RestaurantForm.css';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  cuisine: yup.string().required('Cuisine is required'),
  rating: yup.number().min(0).max(5).required('Rating is required'),
});

const RestaurantForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    address: '',
    cuisine: '',
    rating: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getRestaurant(id)
        .then((response) => {
          const { restaurant } = response.data;
          if (restaurant) {
            setInitialValues({
              name: restaurant.name,
              address: restaurant.address,
              cuisine: restaurant.cuisine,
              rating: restaurant.rating,
            });
          } else {
            console.error('No restaurant found:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching restaurant:', error);
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await api.updateRestaurant(id, values);
        } else {
          await api.createRestaurant(values);
        }
        navigate('/');
      } catch (error) {
        console.error('Error saving restaurant:', error);
      }
    },
  });

  return (
    <div className="restaurant-form-container">
      <h1>{id ? 'Edit Restaurant' : 'Add New Restaurant'}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.address && formik.errors.address ? 'input-error' : ''}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine</label>
          <input
            id="cuisine"
            name="cuisine"
            type="text"
            value={formik.values.cuisine}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.cuisine && formik.errors.cuisine ? 'input-error' : ''}
          />
          {formik.touched.cuisine && formik.errors.cuisine ? (
            <div className="error">{formik.errors.cuisine}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            type="number"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.rating && formik.errors.rating ? 'input-error' : ''}
          />
          {formik.touched.rating && formik.errors.rating ? (
            <div className="error">{formik.errors.rating}</div>
          ) : null}
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default RestaurantForm;
