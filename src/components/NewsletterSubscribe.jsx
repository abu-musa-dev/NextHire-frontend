import React from "react";

const NewsletterSubscribe = () => {
  return (
    <div className="flex items-center justify-center gap-8 px-8 py-6 bg-white">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-green-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2v-5a2 2 0 00-2-2H3a2 2 0 00-2 2v5a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-black leading-tight">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-600">
            We'll keep you updated with the best new jobs.
          </p>
        </div>
      </div>
      <form className="flex items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-72 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        <button
          type="submit"
          className="bg-green-800 text-white px-6 py-3 rounded-full hover:bg-green-900 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;
