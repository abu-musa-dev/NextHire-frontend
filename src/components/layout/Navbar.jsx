import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Jobs", path: "/jobs" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#f2f7f6] text-gray-800"} shadow px-4 md:px-8 py-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <span className="text-green-700 text-3xl mr-1">Next</span>Hire
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`md:flex gap-6 font-medium absolute md:static ${darkMode ? "bg-gray-900 text-white" : "bg-[#f2f7f6] text-gray-700"} top-16 left-0 w-full md:w-auto px-6 md:px-0 py-6 md:py-0 transition-all duration-300 ${menuOpen ? "block" : "hidden"} md:block`}>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`block py-2 hover:text-green-700 ${isActive(link.path) ? "text-green-700 font-semibold" : ""}`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {user?.role === "Employer" && (
            <li>
              <Link to="/dashboard/employer" className="block py-2 hover:text-green-700">
                Employer Dashboard
              </Link>
            </li>
          )}

          {user?.role === "Candidate" && (
            <li>
              <Link to="/dashboard/candidate" className="block py-2 hover:text-green-700">
                Candidate Dashboard
              </Link>
            </li>
          )}

          {/* Logout/Login on Mobile */}
          <li className="md:hidden">
            {!user ? (
              <Link to="/login" className="block py-2 hover:text-green-700">
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block py-2 hover:text-green-700"
              >
                Logout
              </button>
            )}
          </li>
        </ul>

        {/* Right Side (Desktop Only) */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {!user ? (
            <Link to="/login" className="hover:text-green-700 font-medium">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:text-green-700 font-medium">
              Logout
            </button>
          )}

          {user?.role === "Employer" && (
            <Link to="/post-job">
              <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Post a Job
              </button>
            </Link>
          )}

          {user?.role === "Candidate" && (
            <Link to="/update-profile">
              <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition">
                Update Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
