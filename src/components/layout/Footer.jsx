import React from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { useDarkMode } from '../../context/DarkModeContext'; // ✅ Import dark mode context

const Footer = () => {
  const { darkMode } = useDarkMode(); // ✅ Get dark mode value

  return (
    <footer
      className={`px-8 py-12 border-t transition-colors ${
        darkMode
          ? 'bg-gray-900 text-gray-300 border-gray-700'
          : 'bg-white text-gray-800 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">About Us</h4>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris
            risus, lobortis a commodo at, varius sit amet ipsum.
          </p>
          <p className="mb-1 font-semibold">T. (00) 658 54332</p>
          <p className="font-semibold">E. next@hire.co</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>About us</li>
            <li>Career</li>
            <li>Blogs</li>
            <li>FAQ’s</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1">
            <li>Jobs</li>
            <li>Companies</li>
            <li>Candidates</li>
            <li>Pricing</li>
            <li>Partner</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Help center</li>
            <li>Updates</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Connect</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaLinkedin /> Linkedin
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter /> Twitter
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube /> Youtube
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`text-center text-xs mt-12 ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}
      >
        © 2025 Next-Hire. All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
