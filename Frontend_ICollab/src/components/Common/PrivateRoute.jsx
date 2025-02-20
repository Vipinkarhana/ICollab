/**
 * @file PrivateRoute.js
 * @brief Handles protected routes by checking user authentication.
 * @details This component restricts access to certain routes based on authentication status.
 *          If the user is authenticated, it renders the requested component; otherwise, it redirects to the login page.
 * @returns {JSX.Element} The protected route or a redirect to login.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @brief Checks if the user is authenticated.
 * @details This function verifies the presence of an access token in localStorage.
 * @returns {boolean} True if the user is authenticated, otherwise false.
 */
const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken'); 
};

/**
 * @class PrivateRoute
 * @brief Component that guards routes and ensures only authenticated users can access them.
 * @param {Object} props Component properties.
 * @param {JSX.Element} props.element The component to render if the user is authenticated.
 * @returns {JSX.Element} The given component or a redirect to the login page.
 */
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;