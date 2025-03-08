import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // checking token

  return isAuthenticated ?  <Navigate to="/dashboard/notes" /> : children;
};

export default AuthRoute;