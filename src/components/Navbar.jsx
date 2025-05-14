import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const { user, logout } = useAuth();  // Accessing context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");  // Redirect if no user is found
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();  // Use logout function from context
    navigate("/home");
  };

  return (
    <nav className="bg-[#f2f7f6] shadow px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center text-2xl font-bold text-gray-800">
        <span className="text-green-700 text-3xl mr-1">Next</span>Hire
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6 text-gray-700 font-medium">
        <li><Link to="/home" className="hover:text-green-700">Home</Link></li>
        <li><Link to="/jobs" className="hover:text-green-700">Jobs</Link></li>
        <li><Link to="/candidates" className="hover:text-green-700">Candidates</Link></li>
        <li><Link to="/pages" className="hover:text-green-700">Pages</Link></li>
        <li><Link to="/blogs" className="hover:text-green-700">Blogs</Link></li>

        {user && user.role === "Employer" && (
          <li>
            <Link to="/dashboard/employer" className="hover:text-green-700">
              Employer Dashboard
            </Link>
          </li>
        )}

        {user && user.role === "Candidate" && (
          <li>
            <Link to="/dashboard/candidate" className="hover:text-green-700">
              Candidate Dashboard
            </Link>
          </li>
        )}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {!user ? (
          <Link to="/login" className="text-gray-700 hover:text-green-700 font-medium">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Logout
          </button>
        )}

        <Link to="/post-job">
          <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition">
            Post a job
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
