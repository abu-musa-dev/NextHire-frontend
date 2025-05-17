import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // import firebase configuration

import axios from "axios";
import Swal from "sweetalert2";

const RegisterJobSeeker = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Candidate");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Create a new user using Firebase Authentication
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email.value, form.password.value);
      const user = userCredential.user;

      // Firebase UID
      const uid = user.uid;

      // Prepare data for backend API
      const newJobSeeker = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        username: form.username.value,
        email: form.email.value,
        role: "Candidate", // Fixed role
        uid: uid, // Sending Firebase UID to the backend
      };

      // Send the data to your backend
      const res = await axios.post("http://localhost:5000/jobseekers/register", newJobSeeker);
      console.log("Registered Job Seeker:", res.data);

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to NextHire!",
        confirmButtonColor: "#10B981",
      });

      // Redirect to login after successful registration
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
      });
    }
  };

  return (
    <div>
      <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6 border-b w-full pb-2">
            <Link to="/login">
              <span className="text-gray-400 cursor-pointer">Log in</span>
            </Link>
            <span className="font-semibold text-black border-b-2 border-black">
              Sign Up
            </span>
          </div>
          <button className="text-2xl font-bold text-gray-400 hover:text-black">
            ×
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-md text-sm font-medium border ${role === "Candidate" ? "bg-green-700 text-white" : "bg-white text-gray-500"}`}
            onClick={() => setRole("Candidate")}
          >
            <span className="mr-1">👤</span> Candidate
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-md text-sm font-medium border ${role === "Employer" ? "bg-gray-100 text-black" : "bg-white text-gray-500"}`}
            onClick={() => setRole("Employer")}
          >
            <span className="mr-1">💼</span> <Link to="/signup">Employer</Link>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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

export default RegisterJobSeeker;
