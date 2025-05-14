import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="bg-black text-white text-sm px-6 py-2 flex justify-between items-center">
      {/* Left - Subscribe Text */}
      <div className="flex items-center gap-2">
        <span role="img" aria-label="alert">
          🦊
        </span>
        <span>Subscribe for job alerts by email!</span>
      </div>

      {/* Right - Contact Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <FaPhoneAlt className="text-white" />
          <span>(00) 658 54332</span>
        </div>
        <div className="flex items-center gap-1">
          <MdEmail className="text-white" />
          <span>hello@uxper.co</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
