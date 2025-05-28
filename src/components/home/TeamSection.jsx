import React, { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext"; // তোমার পাথ অনুযায়ী ঠিক করো

const TeamSection = () => {
  const { darkMode } = useDarkMode();

  const teamMembers = [
    {
      name: "Abu Musa",
      title: "Co-Founder",
      image: "https://i.imgur.com/phZP5Rm.png",
    },
    {
      name: "Julian Wan",
      title: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    },
    {
      name: "Nicolas Horn",
      title: "UX / UI Designer",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    },
    {
      name: "Sophia Lee",
      title: "Product Manager",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
    {
      name: "Daniel Kim",
      title: "Software Engineer",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
    {
      name: "Maya Singh",
      title: "Data Scientist",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleMembers = showAll ? teamMembers : teamMembers.slice(0, 3);

  return (
    <div
      className={`py-12 px-4 text-center transition-colors duration-300 max-w-7xl mx-auto ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h4
        className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Our Leaders
      </h4>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-8">
        Championing change across our company
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center items-center">
        {visibleMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {member.title}
            </p>
            <div className={`flex gap-4 mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className={`mt-10 px-6 py-2 rounded-full border transition ${
          darkMode
            ? "border-gray-600 hover:bg-gray-700"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        {showAll ? "Show Less" : "View Full Team"}
      </button>
    </div>
  );
};

export default TeamSection;
