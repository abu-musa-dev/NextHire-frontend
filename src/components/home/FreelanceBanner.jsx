import React from "react";

const FreelanceBanner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white relative overflow-hidden">
      
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 space-y-6 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          A whole world of freelance talent<br /> at your fingertips
        </h1>
        <ul className="space-y-4 text-gray-800 text-[17px]">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✔</span>
            <div>
              <strong>Save budget</strong><br />
              Find high-quality services at every price point.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✔</span>
            <div>
              <strong>Completed quickly</strong><br />
              Find the right freelancer for your project within minutes.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✔</span>
            <div>
              <strong>Safe and secure</strong><br />
              We always protect your data and privacy.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✔</span>
            <div>
              <strong>24/7 support</strong><br />
              Our 24/7 support team is ready to help anytime, anywhere.
            </div>
          </li>
        </ul>
        <button className="bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition duration-300">
          Get Start
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center relative z-10">
        <img
          src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Group-48095751.webp"
          alt="Freelancer Woman"
          className="w-full max-w-md md:max-w-lg"
        />
      </div>

      {/* Background Abstract Shapes */}
      <div className="absolute right-0 top-10 md:top-0 w-[400px] h-[400px] bg-[#f5ded2] rounded-[50%] md:rounded-[30%] z-0 translate-x-1/2 md:translate-x-1/4" />
      <div className="absolute bottom-10 left-[60%] w-4 h-4 bg-yellow-400 rounded-full z-0" />
      <div className="absolute top-16 left-[60%] w-4 h-4 bg-blue-500 rotate-45 z-0" />
      <div className="absolute bottom-28 right-[25%] w-4 h-4 bg-purple-600 rounded-full z-0" />
    </div>
  );
};

export default FreelanceBanner;
