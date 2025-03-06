import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const AuthRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard/notes" replace />;
  }
  return children;
};

export default AuthRoute;