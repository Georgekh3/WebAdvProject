import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

export default function AdminRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return getRole() === "admin" ? children : <Navigate to="/" replace />;
}
