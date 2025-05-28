import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useDarkMode } from "../../context/DarkModeContext";

const Login = () => {
  const { login } = useAuth();
  const { darkMode } = useDarkMode();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.identifier.value;
    const password = form.password.value;

    try {
      const response = await fetch("https://next-haire-backend-now.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user info");
      }

      const data = await response.json();
      const email = data.userInfo.email;

      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.userInfo));

      login({
        token: data.token,
        role: data.role,
        email: data.userInfo?.email,
        userData: data.userInfo,
      });

      await Swal.fire({
        icon: "success",
        title: `Welcome, ${data.userInfo.firstName || "User"}!`,
        html: `<p class="text-lg text-gray-300">You have successfully logged in as <strong>${data.role}</strong>.</p>`,
        showConfirmButton: true,
        confirmButtonText: "Continue",
        width: 450,
        padding: "2rem",
        background: darkMode ? "#1f2937" : "#fff", // dark bg for sweetalert if needed
        color: darkMode ? "#fff" : "#000",
      });

      if (data.role === "Employer") {
        navigate("/dashboard/employer");
      } else if (data.role === "Candidate") {
        navigate("/dashboard/candidate");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-sm p-6 rounded-lg shadow-md border ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div
            className={`flex space-x-6 border-b w-full pb-2 ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <span
              className={`font-semibold border-b-2 ${
                darkMode ? "text-white border-white" : "text-black border-black"
              }`}
            >
              Log in
            </span>
            <Link to="/signup">
              <span
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } cursor-pointer`}
              >
                Sign Up
              </span>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div
          className={`p-3 rounded-md mb-4 text-sm ${
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
          }`}
        >
          <p>
            <span className="font-medium">Username:</span>{" "}
            <span className="text-green-400 font-medium">Employer</span> or{" "}
            <span className="text-green-400 font-medium">Candidate</span>
          </p>
          <p>
            <span className="font-medium">Password:</span>{" "}
            <span className="text-green-400 font-medium">musa123</span>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter email or username"
              className={`w-full px-3 py-2 rounded-md border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              required
            />
          </div>

          <div className="mb-2 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className={`w-full px-3 py-2 rounded-md border pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              required
            />
            <div
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-full mt-4 hover:bg-green-800 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
