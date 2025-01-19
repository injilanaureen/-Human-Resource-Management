import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Replace this with your actual authentication check
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Example check

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
