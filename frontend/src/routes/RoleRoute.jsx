import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ children, role }) => {
  const { user } = useAuth();
  return user?.role === role ? children : <Navigate to="/" />;
};

export default RoleRoute;
