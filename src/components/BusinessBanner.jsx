import React from "react";

const BusinessBanner = () => {
  return (
    <div className="relative bg-[#006D5B] rounded-xl overflow-hidden px-6 md:px-16 py-12 flex flex-col md:flex-row items-center text-white">
      {/* Decorative Top-Left Swirl */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><path d=%22M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2%22 stroke=%22%23A3E635%22 stroke-width=%222%22 fill=%22none%22/></svg>')] bg-no-repeat bg-center z-10" />

      {/* Left Text & Button */}
      <div className="z-20 w-full md:w-1/2 space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug text-white">
          Find the talent needed to get<br /> your business growing.
        </h2>
        <p className="text-lg text-green-100">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor.
        </p>
        <button className="inline-block bg-white text-[#006D5B] font-medium px-6 py-3 rounded-full hover:shadow-lg transition">
          Get Started
        </button>

        {/* Hexagon Graphic */}
        <div className="mt-6 w-16 h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Right Image */}
      <div className="z-20 w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Business Talent"
          className="max-w-sm md:max-w-md object-contain"
        />
        {/* Dot Pattern Behind Image (Optional - mimic design) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:10px_10px] opacity-20 pointer-events-none" />
      </div>

      {/* Decorative Wavy Line */}
      <div className="absolute bottom-8 right-16 w-12 h-4 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2216%22><path d=%22M0 8 Q12 0 24 8 T48 8%22 stroke=%22%23C1F77C%22 stroke-width=%223%22 fill=%22none%22/></svg>')] bg-no-repeat z-10" />
    </div>
  );
};

export default BusinessBanner;
