import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // AuthContext import
import { Menu, X } from "lucide-react"; // Hamburger icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#f2f7f6] shadow px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-green-700 text-3xl mr-1">Next</span>Hire
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex gap-6 text-gray-700 font-medium absolute md:static bg-[#f2f7f6] top-16 left-0 w-full md:w-auto px-6 md:px-0 py-6 md:py-0 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <li><Link to="/home" className="hover:text-green-700 block py-2">Home</Link></li>
          <li><Link to="/jobs" className="hover:text-green-700 block py-2">Jobs</Link></li>
          <li><Link to="/candidates" className="hover:text-green-700 block py-2">Candidates</Link></li>
          <li><Link to="/pages" className="hover:text-green-700 block py-2">Pages</Link></li>
          <li><Link to="/blogs" className="hover:text-green-700 block py-2">Blogs</Link></li>

          {user?.role === "Employer" && (
            <li>
              <Link to="/dashboard/employer" className="hover:text-green-700 block py-2">
                Employer Dashboard
              </Link>
            </li>
          )}

          {user?.role === "Candidate" && (
            <li>
              <Link to="/dashboard/candidate" className="hover:text-green-700 block py-2">
                Candidate Dashboard
              </Link>
            </li>
          )}

          {/* Logout or Login (shown on mobile inside menu) */}
          <li className="md:hidden">
            {!user ? (
              <Link to="/login" className="text-gray-700 hover:text-green-700 block py-2">
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-700 block py-2"
              >
                Logout
              </button>
            )}
          </li>
        </ul>

        {/* Right Side (Desktop Only) */}
        <div className="hidden md:flex items-center gap-6">
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

          {user?.role === "Employer" ? (
            <Link to="/post-job">
              <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Post a job
              </button>
            </Link>
          ) : user?.role === "Candidate" ? (
            <Link to="/update-profile">
              <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Update Profile
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
