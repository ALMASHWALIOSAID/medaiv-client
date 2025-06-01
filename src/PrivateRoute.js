// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
}
