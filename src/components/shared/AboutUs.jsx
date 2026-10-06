import React from 'react';
import MissionSection from '../home/MissionSection';
import TeamSection from '../home/TeamSection';
import Locations from '../home/Locations';
import Testimonials from '../home/testimonials';
import { useDarkMode } from '../../context/DarkModeContext';

const AboutUs = () => {
  const { darkMode } = useDarkMode();

  return (
    <section
      className={`text-center py-16 px-4 md:px-20 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <p className={`text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wider ${
        darkMode ? "text-emerald-400" : "text-emerald-600"
      }`}>
        About Us
      </p>

      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-12 max-w-2xl mx-auto ${
        darkMode ? "text-white" : "text-gray-900"
      }`}>
        We are transforming the way healthcare hires
      </h2>

      {/* Hero Images Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-6xl mx-auto">
        {/* Left Image */}
        <div className="w-full sm:w-[280px] md:w-[320px]">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
            alt="Healthcare professionals consultation"
            className="rounded-2xl w-full h-[380px] md:h-[420px] object-cover shadow-lg hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Middle Image */}
        <div className="w-full sm:w-[280px] md:w-[340px]">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
            alt="Lead Doctor"
            className="rounded-2xl w-full h-[440px] md:h-[500px] object-cover shadow-xl hover:scale-[1.02] transition-transform duration-300 border-2 border-emerald-500/20"
          />
        </div>

        {/* Right Image */}
        <div className="w-full sm:w-[280px] md:w-[320px]">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
            alt="Medical team working together"
            className="rounded-2xl w-full h-[380px] md:h-[420px] object-cover shadow-lg hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </div>

      {/* --- Chicago & Amsterdam Offices Section --- */}
      <div className="mt-20 max-w-5xl mx-auto px-4">
        <h3 className={`text-xl sm:text-2xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}>
          Our Global Offices
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chicago Office */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              alt="Chicago Office"
              className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">USA</span>
              <h4 className="text-white text-xl sm:text-2xl font-bold">Chicago Office</h4>
            </div>
          </div>

          {/* Amsterdam Office */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80"
              alt="Amsterdam Office"
              className="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Netherlands</span>
              <h4 className="text-white text-xl sm:text-2xl font-bold">Amsterdam Office</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <MissionSection />
        <TeamSection />
        <Locations />
        <Testimonials />
      </div>
    </section>
  );
};

export default AboutUs;