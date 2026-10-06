import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 'useAuth

const PrivateRoute = ({ allowedRoles }) => {
  const { user, role } = useAuth(); 

  if (!user) {
  
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;  
};

export default PrivateRoute;
