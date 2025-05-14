import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { role, user } = useAuth(); // Get user and role from context
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome {role} Dashboard</h1>
      <p>User: {user?.email}</p>
      {/* Add more dashboard content here */}
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};

export default Dashboard;
