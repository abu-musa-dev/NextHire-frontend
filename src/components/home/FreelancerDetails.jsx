import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext"; // Auth context
import CustomSpinner from "../shared/CustomSpinner"; // Custom spinner

export default function FreelancerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // context থেকে user
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ২ সেকেন্ড delay + fetch data
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => {
      fetch("/freelancers.json")
        .then((res) => res.json())
        .then((data) => {
          const selected = data[parseInt(id)];
          setFreelancer(selected);
          setLoading(false);
        });
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading || !freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CustomSpinner />
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      html: `<p>Your message to <strong>${freelancer.name}</strong> has been sent successfully.</p>`,
      confirmButtonColor: "#22c55e",
    });

    setFormData({ name: "", email: "", message: "" });
    setShowMessageForm(false);
  };

  const handleMessageClick = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You must be logged in to send a message.",
        confirmButtonText: "Login Now",
        confirmButtonColor: "#22c55e",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      setShowMessageForm(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 relative">
      <Link
        to="/"
        className="text-green-600 underline mb-4 inline-block hover:text-green-800 transition"
      >
        ← Back to list
      </Link>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={freelancer.img}
              alt={freelancer.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{freelancer.name}</h2>
              <p className="text-green-600 font-medium">{freelancer.role}</p>
              <p className="text-sm text-gray-500">
                {freelancer.location} • ★ {freelancer.rating}
              </p>
            </div>
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            onClick={handleMessageClick}
          >
            Message
          </button>
        </div>

        <div className="mt-6">
          <p className="text-gray-700 leading-relaxed">{freelancer.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {freelancer.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6 text-xl font-bold text-green-600">{freelancer.price}</div>
      </div>

      {/* Message Form */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowMessageForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-lg"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Send a message to {freelancer.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
