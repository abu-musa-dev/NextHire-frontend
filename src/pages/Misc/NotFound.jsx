import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Hmm, that didn’t work.</h1>
      <p className="text-gray-600 mb-8 text-lg">The page you are looking for cannot be found</p>

      {/* 404 illustration */}
      <div className="relative mb-8">
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-yellow-300 leading-none">404</h1>
        <div className="absolute inset-0 flex justify-center items-center">
          
        </div>
      </div>

      <Link
        to="/"
        className="inline-block px-6 py-3 text-green-700 border border-green-600 rounded-full hover:bg-green-100 transition"
      >
        Go to home page →
      </Link>
    </div>
  );
};

export default NotFound;
