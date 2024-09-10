import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// PrivateRoute with Role Checking
const PrivateRoute = ({ children, requireRole }) => {
  const { token, user } = useSelector((state) => state.auth);

  // Redirect if not authenticated or role doesn't match
  if (!token || user.role !== requireRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
