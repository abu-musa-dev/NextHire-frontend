import { MapPin } from 'lucide-react';

export default function Locations() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-8 bg-white">
      {/* Text Section */}
      <div className="w-full max-w-sm text-left md:text-left text-center md:text-start">
        <p className="text-sm font-semibold text-gray-500 uppercase">Our Locations</p>
        <h2 className="text-2xl font-bold mt-2 mb-6">Find us at our global hubs</h2>

        {/* Chicago */}
        <div className="flex justify-center md:justify-start items-start mb-6">
          <MapPin className="w-5 h-5 text-gray-700 mt-1 mr-2" />
          <div>
            <h3 className="font-semibold">Chicago</h3>
            <p className="text-sm text-gray-600">
              8205 Santa Monica Blvd<br />
              Suite 84561, CA 90069
            </p>
          </div>
        </div>

        {/* Amsterdam */}
        <div className="flex justify-center md:justify-start items-start">
          <MapPin className="w-5 h-5 text-gray-700 mt-1 mr-2" />
          <div>
            <h3 className="font-semibold">Amsterdam</h3>
            <p className="text-sm text-gray-600">
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
