import { MapPin } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext'; // তোমার কনটেক্সট পাথ অনুসারে ঠিক করো

export default function Locations() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'
      }`}
    >
      {/* Text Section */}
      <div className="w-full max-w-sm text-center md:text-left">
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-semibold uppercase`}>
          Our Locations
        </p>
        <h2 className="text-2xl font-bold mt-2 mb-6">Find us at our global hubs</h2>

        {/* Chicago */}
        <div className="flex justify-center md:justify-start items-start mb-6">
          <MapPin className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} w-5 h-5 mt-1 mr-2`} />
          <div>
            <h3 className="font-semibold">{darkMode ? 'text-gray-100' : 'text-gray-900'}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              8205 Santa Monica Blvd<br />
              Suite 84561, CA 90069
            </p>
          </div>
        </div>

        {/* Amsterdam */}
        <div className="flex justify-center md:justify-start items-start">
          <MapPin className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} w-5 h-5 mt-1 mr-2`} />
          <div>
            <h3 className="font-semibold">{darkMode ? 'text-gray-100' : 'text-gray-900'}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              H.J.E. Wenckebachweg<br />
              221 1021AM Amsterdam
            </p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <img
          src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/image-about-us-02.webp"
          alt="Chicago Office"
          className="w-48 md:w-64 rounded-xl object-cover"
        />
        <img
          src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/image-about-us-03.webp"
          alt="Amsterdam Office"
          className="w-48 md:w-64 rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
