import React, { useState } from "react";
import { Mail } from "lucide-react";
import Swal from "sweetalert2";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
      });
      return;
    }

    // এখানে তোমার সাবস্ক্রিপশন API কল বা লজিক বসাতে পারো
    // এখন শুধু success message দেখাচ্ছি

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `You have successfully subscribed with ${email}`,
      timer: 2500,
      showConfirmButton: false,
    });

    setEmail(""); // ইনপুট ক্লিয়ার করে দিবে
  };

  return (
    <section className="bg-white px-6 py-10 border-t-2 border-b-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex items-start gap-5 w-full md:w-1/2">
          <div className="w-14 h-14 rounded-full bg-green-800 flex items-center justify-center">
            <Mail className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Get the latest freelance jobs and updates right in your inbox.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-72 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 shadow-sm"
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition font-medium shadow"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
