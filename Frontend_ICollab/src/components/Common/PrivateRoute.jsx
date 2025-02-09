import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken'); 
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;