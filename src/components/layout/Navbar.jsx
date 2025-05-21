import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Jobs", path: "/jobs" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ];

  const isActive = (path) => location.pathname === path;

  const getBgClasses = () => {
    if (darkMode) return "bg-gray-900 text-white";
    if (location.pathname === "/home") return "bg-[#fdf8ed] text-gray-800";
    return "bg-white text-gray-800";
  };

  return (
    <nav className={`${getBgClasses()} fixed top-0 left-0 w-full z-50 shadow px-4 md:px-8 py-4 transition-colors`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold flex items-center">
          <span className="text-green-700 text-3xl mr-1">Next</span>Hire
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav Links + Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-green-700 font-medium ${
                isActive(path) ? "text-green-700 font-semibold" : ""
              }`}
            >
              {name}
            </Link>
          ))}

          {user?.role === "Employer" && (
            <Link to="/dashboard/employer" className="hover:text-green-700 font-medium">
              Employer Dashboard
            </Link>
          )}

          {user?.role === "Candidate" && (
            <Link to="/dashboard/candidate" className="hover:text-green-700 font-medium">
              Candidate Dashboard
            </Link>
          )}

          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {!user ? (
            <Link to="/login" className="hover:text-green-700 font-medium">Login</Link>
          ) : (
            <button onClick={handleLogout} className="hover:text-green-700 font-medium">Logout</button>
          )}

          {user?.role === "Employer" && (
            <Link to="/post-job">
              <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
                Post a Job
              </button>
            </Link>
          )}

          {user?.role === "Candidate" && (
            <Link to="/update-profile">
              <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
                Update Profile
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu Overlay */}
      {menuOpen && (
        <div
          className={`fixed inset-0 top-[64px] z-40 bg-white ${darkMode ? "bg-gray-900 text-white" : ""} transition duration-300`}
        >
          <ul className="flex flex-col items-start px-6 py-6 gap-4">
            {navLinks.map(({ name, path }) => (
              <li key={path} className="w-full">
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full py-2 ${
                    isActive(path) ? "text-green-700 font-semibold" : "hover:text-green-700"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}

            {user?.role === "Employer" && (
              <li>
                <Link to="/dashboard/employer" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-700">
                  Employer Dashboard
                </Link>
              </li>
            )}

            {user?.role === "Candidate" && (
              <li>
                <Link to="/dashboard/candidate" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-700">
                  Candidate Dashboard
                </Link>
              </li>
            )}

            {!user ? (
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-700">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-green-700"
                >
                  Logout
                </button>
              </li>
            )}

            {user?.role === "Employer" && (
              <li className="mt-4">
                <Link to="/post-job">
                  <button className="w-full bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition">
                    Post a Job
                  </button>
                </Link>
              </li>
            )}

            {user?.role === "Candidate" && (
              <li className="mt-4">
                <Link to="/update-profile">
                  <button className="w-full bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition">
                    Update Profile
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
