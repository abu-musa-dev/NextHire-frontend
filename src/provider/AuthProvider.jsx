import React, { createContext, useState, useContext } from 'react';

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app and share the auth data
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const login = (data) => {
    setAuthData(data); // Set auth data when logged in
  };

  const logout = () => {
    setAuthData(null); // Clear auth data when logged out
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
