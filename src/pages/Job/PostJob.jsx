import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    logoUrl: "",
    price: "",
    category: "", // Added category field
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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

    // Form validation including category
    if (
      !form.title ||
      !form.location ||
      !form.type ||
      !form.description ||
      !form.price ||
      !form.logoUrl ||
      !form.category // check category
    ) {
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
          createdAt: new Date().toISOString(), // Added createdAt
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
          category: "", // reset category too
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
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📄 Post a New Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
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

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Category</label>
          <input
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
            rows="4"
            required
          />
        </div>

        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
          <input
            name="logoUrl"
            type="text"
            value={form.logoUrl}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary / Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
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
