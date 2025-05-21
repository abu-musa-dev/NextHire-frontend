import React from "react";
import { CheckCircle } from "lucide-react";

const FreelanceBanner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 md:px-20 py-14 bg-white relative overflow-hidden">
      
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 space-y-6 z-10 text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          A whole world of <span className="text-green-700">freelance talent</span><br />
          at your fingertips
        </h1>
        
        <div className="space-y-5 text-gray-800 text-base sm:text-lg">
          {[
            {
              title: "Save budget",
              desc: "Find high-quality services at every price point.",
            },
            {
              title: "Completed quickly",
              desc: "Find the right freelancer for your project within minutes.",
            },
            {
              title: "Safe and secure",
              desc: "We always protect your data and privacy.",
            },
            {
              title: "24/7 support",
              desc: "Our support team is ready to help anytime, anywhere.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1 w-5 h-5 shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-gray-900">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition duration-300 text-lg font-medium shadow-md mt-4"
          aria-label="Get started with freelance services"
        >
          Get Started
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center relative z-10 mb-8 md:mb-0">
        <img
          src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Group-48095751.webp"
          alt="Freelancer Woman Illustration"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg"
        />
      </div>

      {/* Background Shapes */}
      <div className="absolute right-0 top-10 md:top-0 w-[350px] h-[350px] bg-[#f5ded2] rounded-[50%] md:rounded-[30%] z-0 translate-x-1/2 md:translate-x-1/4" />
      <div className="absolute bottom-10 left-[60%] w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full z-0" />
      <div className="absolute top-16 left-[60%] w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rotate-45 z-0" />
      <div className="absolute bottom-28 right-[25%] w-3 h-3 sm:w-4 sm:h-4 bg-purple-600 rounded-full z-0" />
    </div>
  );
};

export default FreelanceBanner;
