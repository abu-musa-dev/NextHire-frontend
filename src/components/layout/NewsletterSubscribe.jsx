import React, { useState } from "react";
import { Mail } from "lucide-react";
import Swal from "sweetalert2";
import { useDarkMode } from "../../context/DarkModeContext"; // path নিশ্চিত করো

const NewsletterSubscribe = () => {
  const { darkMode } = useDarkMode(); // কন্টেক্সট থেকে darkMode আনো
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
        background: darkMode ? "#1f2937" : undefined,
        color: darkMode ? "#fff" : undefined,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `You have successfully subscribed with ${email}`,
      timer: 2500,
      showConfirmButton: false,
      background: darkMode ? "#1f2937" : undefined,
      color: darkMode ? "#fff" : undefined,
    });

    setEmail("");
  };

  return (
    <section
      className={`px-4 sm:px-6 py-8 sm:py-10 border-t border-b transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-300"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6 sm:gap-8">
        {/* Left */}
        <div className="flex items-start gap-4 sm:gap-5 w-full md:w-1/2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-800 flex items-center justify-center">
            <Mail className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Subscribe to our newsletter
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Get the latest freelance jobs and updates right in your inbox.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full sm:w-72 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 shadow-sm transition-colors ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-200 focus:ring-green-500 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 focus:ring-green-700 placeholder-gray-500"
            }`}
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-5 py-3 rounded-full hover:bg-green-800 transition font-medium shadow w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
