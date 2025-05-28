import React from 'react';
import MissionSection from '../home/MissionSection';
import TeamSection from '../home/TeamSection';
import Locations from '../home/Locations';
import Testimonials from '../home/testimonials';
import { useDarkMode } from '../../context/DarkModeContext';  // path adjust করো

const AboutUs = () => {
  const { darkMode } = useDarkMode();

  return (
    <section
      className={`text-center py-12 px-4 md:px-20 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <p className={`text-sm font-semibold mb-2 uppercase ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }`}>
        About Us
      </p>

      <h2 className={`text-2xl md:text-3xl font-bold mb-10 ${
        darkMode ? "text-gray-100" : "text-gray-900"
      }`}>
        We are transforming the way healthcare hires
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Left Image */}
        <div className="w-[280px] md:w-[300px]">
          <img
            src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/aubout-us-left.webp"
            alt="About Left"
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Middle Image (Shorter height) */}
        <div className="w-[280px] md:w-[300px]">
          <img
            src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/aubout-us-mid.webp"
            alt="About Mid"
            className="rounded-xl w-full h-[520px] object-cover"
          />
        </div>

        {/* Right Image */}
        <div className="w-[280px] md:w-[300px]">
          <img
            src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/aubout-us-right.webp"
            alt="About Right"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </div>

      <MissionSection />
      <TeamSection />
      <Locations />
      <Testimonials />
    </section>
  );
};

export default AboutUs;
