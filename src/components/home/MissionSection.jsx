import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';  // পাথ তোমার প্রজেক্ট অনুসারে ঠিক করো

const MissionSection = () => {
  const { darkMode } = useDarkMode();

  return (
    <section
      className={`text-center py-16 px-4 md:px-20 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <p
        className={`text-sm font-semibold uppercase mb-2 ${
          darkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        Our Mission
      </p>

      <p
        className={`text-xl md:text-2xl italic max-w-3xl mx-auto mb-10 ${
          darkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        We mission is to empower every healthcare professional to find their perfect job opportunity, faster and easier than ever before.
      </p>

      <hr
        className={`mb-10 border ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p
            className={`font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Employees
          </p>
          <h3 className="text-3xl font-bold text-green-700">20+</h3>
        </div>
        <div>
          <p
            className={`font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Projects
          </p>
          <h3 className="text-3xl font-bold text-green-700">150+</h3>
        </div>
        <div>
          <p
            className={`font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Customers
          </p>
          <h3 className="text-3xl font-bold text-green-700">200+</h3>
        </div>
        <div>
          <p
            className={`font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Awards
          </p>
          <h3 className="text-3xl font-bold text-green-700">5+</h3>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
