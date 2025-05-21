import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="bg-black text-white text-sm px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      {/* Left - Subscribe Text */}
      <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
        <span role="img" aria-label="alert" className="text-lg">
          🦊
        </span>
        <span>Subscribe for job alerts by email!</span>
      </div>

      {/* Right - Contact Info */}
      <div className="flex items-center gap-6 justify-center sm:justify-end w-full sm:w-auto">
        <div className="flex items-center gap-1">
          <FaPhoneAlt className="text-white" />
          <span>(00) 658 54332</span>
        </div>
        <div className="flex items-center gap-1">
          <MdEmail className="text-white" />
          <span>next@hire.co</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
