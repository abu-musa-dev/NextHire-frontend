import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext"; // ✅ Import DarkMode context

const FreelancerCard = ({ freelancer, id, darkMode }) => (
  <div
    className={`rounded-xl shadow-md p-6 w-full max-w-sm transition-colors ${
      darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white"
    }`}
  >
    <div className="flex items-center space-x-4 mb-4">
      <img
        src={freelancer.img}
        alt={freelancer.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{freelancer.name}</h3>
        <p className="text-green-500 font-medium">{freelancer.role}</p>
        <div
          className={`flex items-center text-sm space-x-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>{freelancer.location}</span>
          <span>•</span>
          <span className="text-green-600 font-semibold">
            ★ {freelancer.rating}
          </span>
        </div>
      </div>
    </div>

    <p className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
      {freelancer.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {freelancer.tags.map((tag, index) => (
        <span
          key={index}
          className={`text-sm px-3 py-1 rounded-full ${
            darkMode
              ? "bg-gray-700 text-gray-200"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="text-xl font-bold text-green-600">{freelancer.price}</div>

    <Link to={`/freelancer/${id}`}>
      <button
        className={`mt-4 w-full border rounded-full py-2 transition ${
          darkMode
            ? "border-green-400 text-green-400 hover:bg-green-900"
            : "border-green-600 text-green-600 hover:bg-green-50"
        }`}
      >
        View Profile
      </button>
    </Link>
  </div>
);

export default function TopFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const { darkMode } = useDarkMode(); // ✅ Get darkMode value

  useEffect(() => {
    fetch("http://localhost:5000/freelancers")
      .then((res) => res.json())
      .then((data) => setFreelancers(data))
      .catch((err) => console.error("Failed to load freelancers:", err));
  }, []);

  return (
    <div
      className={`py-12 px-4 max-w-7xl mx-auto transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Top rated freelancer</h2>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>
          Top rated freelancer of the week
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {freelancers.map((freelancer, index) => (
          <FreelancerCard
            key={index}
            freelancer={freelancer}
            id={index}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
}
