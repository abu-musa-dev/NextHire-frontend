import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext"; // ✅ import dark mode context

const Hero = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // ✅ get current dark mode state

  const imageUrls = [
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-370.svg",
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-373.svg",
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-372.svg",
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-378.svg",
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-368.svg",
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-371.svg",
    "https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-369.svg",
  ];

  const imagePositions = [
    { size: 120, top: "10%", left: "10%" },
    { size: 70, top: "5%", left: "70%" },
    { size: 90, top: "30%", left: "80%" },
    { size: 80, top: "60%", left: "10%" },
    { size: 130, top: "40%", left: "30%" },
    { size: 90, top: "60%", left: "70%" },
    { size: 100, top: "20%", left: "50%" },
  ];

  const handleStartClick = () => {
    navigate("/signup");
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-[#fdf8ed] to-[#fff]"
      }`}
    >
      {/* Glow effect */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-green-300 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-yellow-200 opacity-30 rounded-full blur-2xl"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 py-20">
        {/* Left Text Content */}
        <motion.div
          className="max-w-xl text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-4xl md:text-6xl font-extrabold leading-tight mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Hire your{" "}
            <span className="text-green-500 italic">dream freelancer</span>
          </h1>
          <p
            className={`text-lg mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Browse thousands of talented professionals ready to bring your
            vision to life.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button
              onClick={handleStartClick}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition"
            >
              Get Started
            </button>
            <button
              className={`px-6 py-3 rounded-full font-semibold shadow transition border ${
                darkMode
                  ? "bg-gray-900 text-green-400 border-green-500 hover:bg-gray-800"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Image Bubbles */}
        <motion.div
          className="relative w-full max-w-lg h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          {imagePositions.map((img, index) => (
            <motion.img
              key={index}
              src={imageUrls[index]}
              alt={`Freelancer ${index}`}
              className="rounded-full object-cover absolute shadow-lg"
              style={{
                width: `${img.size}px`,
                height: `${img.size}px`,
                top: img.top,
                left: img.left,
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
