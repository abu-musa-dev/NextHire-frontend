import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    logoUrl: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useDarkMode();

  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) {
      Swal.fire({
        icon: "error",
        title: "Not logged in",
        text: "Please log in to post a job.",
      });
      navigate("/login");
    }
  }, [userEmail, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.location || !form.type || !form.description || !form.price || !form.logoUrl || !form.category) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          createdBy: userEmail,
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Job posted!",
        });
        setForm({
          title: "",
          location: "",
          type: "",
          description: "",
          logoUrl: "",
          price: "",
          category: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Please try again.",
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#f9fafb] text-gray-900"} p-8 min-h-screen`}>
      <h1 className="text-3xl font-bold mb-6">📄 Post a New Job</h1>
      <form onSubmit={handleSubmit} className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-xl shadow space-y-4`}>
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Job Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            required
          >
            <option value="">Select job type</option>
            <option value="On Site">On Site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Job Category</label>
          <input
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Job Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Company Logo URL</label>
          <input
            name="logoUrl"
            type="text"
            value={form.logoUrl}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Salary / Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className={`mt-1 w-full border px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;