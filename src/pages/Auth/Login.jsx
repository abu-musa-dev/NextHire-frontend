import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user info");
      }

      const data = await response.json();

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
        title: `Welcome, ${data.userInfo.name || 'User'}!`,
        html: `<p class="text-lg text-gray-700">You have successfully logged in as <strong>${data.role}</strong>.</p>`,
        showConfirmButton: true,
        confirmButtonText: "Continue",
        width: 450,
        padding: "2rem",
        backdrop: `rgba(0,0,0,0.6) left top no-repeat`,
        timer: undefined,
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
    <div className=" flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6 border-b w-full pb-2">
            <span className="font-semibold text-black border-b-2 border-black">
              Log in
            </span>
            <Link to="/signup">
              <span className="text-gray-400 cursor-pointer">Sign Up</span>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-100 p-3 rounded-md mb-4 text-sm">
          <p>
            <span className="text-gray-700">Username:</span>{" "}
            <span className="text-green-700 font-medium">Employer</span> or{" "}
            <span className="text-green-700 font-medium">Candidate</span>
          </p>
          <p>
            <span className="text-gray-700">Password:</span>{" "}
            <span className="text-green-700 font-medium">musa123</span>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-2 relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              required
            />
            <div
              className="absolute right-3 top-9 text-gray-500 cursor-pointer"
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
            Sign in with Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
