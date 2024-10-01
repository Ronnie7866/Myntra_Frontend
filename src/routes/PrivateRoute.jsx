import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// PrivateRoute with Role Checking
const PrivateRoute = ({ children, requireRole }) => {
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user.role !== requireRole) {
    return <Navigate to="/login" />;
  }

  // If everything is valid, render the children
  return children;
};

export default PrivateRoute;
