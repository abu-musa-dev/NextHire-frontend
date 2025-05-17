import React from 'react';

const MissionSection = () => {
  return (
    <section className="text-center py-16 px-4 md:px-20 bg-white">
      <p className="text-sm font-semibold text-gray-700 uppercase mb-2">Our Mission</p>
      <p className="text-xl md:text-2xl italic text-gray-800 max-w-3xl mx-auto mb-10">
        We mission is to empower every healthcare professional to find their perfect job opportunity, faster and easier than ever before.
      </p>

      <hr className="border-gray-300 mb-10" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-gray-700 font-medium mb-1">Employees</p>
          <h3 className="text-3xl font-bold text-green-700">20+</h3>
        </div>
        <div>
          <p className="text-gray-700 font-medium mb-1">Projects</p>
          <h3 className="text-3xl font-bold text-green-700">150+</h3>
        </div>
        <div>
          <p className="text-gray-700 font-medium mb-1">Customers</p>
          <h3 className="text-3xl font-bold text-green-700">200+</h3>
        </div>
        <div>
          <p className="text-gray-700 font-medium mb-1">Awards</p>
          <h3 className="text-3xl font-bold text-green-700">5+</h3>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
