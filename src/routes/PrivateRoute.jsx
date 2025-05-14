import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 'useAuth' হুকটি আমদানি করুন

const PrivateRoute = ({ allowedRoles }) => {
  const { user, role } = useAuth(); // 'user' এবং 'role' অ্যাক্সেস করুন

  if (!user) {
    // লগইন না থাকলে, লগইন পেজে রিডিরেক্ট করুন
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // রোল মেল না হলে, নির্দিষ্ট পেজে রিডিরেক্ট করুন (যেমন, ড্যাশবোর্ড)
    return <Navigate to="/" />;
  }

  return <Outlet />;  // রুটের কম্পোনেন্টটি রেন্ডার করুন
};

export default PrivateRoute;
