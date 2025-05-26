import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Check if there's a user and token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));  // Parse user data from localStorage
      setRole(JSON.parse(storedUser)?.role);  // Retrieve role from stored user data
    }
  }, []);

  const login = (userData) => {
    setUser(userData.userData);
    setToken(userData.token);
    setRole(userData.role);

    // Save token and user info in localStorage for persistence across refreshes
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);

    // Remove token and user info from localStorage on logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

    const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, updateUser  }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
