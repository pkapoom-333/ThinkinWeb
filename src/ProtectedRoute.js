import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./Components/Contexts/AuthContext";
const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/createProfile" />;
  }
  return children;
};

export default ProtectedRoute;
