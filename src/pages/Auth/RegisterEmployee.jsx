import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import Swal from "sweetalert2";
import { useDarkMode } from "../../context/DarkModeContext";

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // Add/remove dark class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900");
    } else {
      document.body.classList.remove("bg-gray-900");
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const { firstName, lastName, username, email, password } = form;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      const formData = {
        uid: user.uid,
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        role: "Employer",
      };

      console.log("Sending formData:", formData);
      const res = await axios.post("https://next-haire-backend-now.vercel.app/employers/register", formData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to NextHire!",
        confirmButtonColor: "#10B981",
        background: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });

      console.log("Registered Employer:", res.data);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.error || "Something went wrong!",
        confirmButtonColor: "#EF4444",
        background: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`w-full max-w-sm p-6 rounded-lg shadow-md border ${
          darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <div
            className={`flex space-x-6 border-b w-full pb-2 ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <Link to="/login">
              <span className={darkMode ? "text-gray-400" : "text-gray-400"}>Log in</span>
            </Link>
            <span
              className={`font-semibold border-b-2 ${
                darkMode ? "text-white border-white" : "text-black border-black"
              }`}
            >
              Sign Up
            </span>
          </div>
          <button
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-black"
            }`}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <Link to="/candidate" className="flex-1">
            <button
              className={`w-full py-2 rounded-md text-sm font-medium border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-400 hover:text-white"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              👤 Candidate
            </button>
          </Link>
          <button
            className="flex-1 py-2 rounded-md text-sm font-medium border bg-green-700 text-white"
            disabled
          >
            💼 Employer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-green-500 placeholder-gray-400 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-green-500 placeholder-gray-400 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
                }`}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="johndoe123"
              className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-green-500 placeholder-gray-400 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
              }`}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-green-500 placeholder-gray-400 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
              }`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-green-500 placeholder-gray-400 ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-full font-medium"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployee;
