import React from 'react';
// import MissionSection from './MissionSection';
// import TeamSection from './TeamSection';
// import Locations from './Locations';
// import Testimonials from './testimonials';


const AboutUs = () => {
  return (
    <section className="text-center py-12 px-4 md:px-20 bg-white">
      <p className="text-sm font-semibold text-gray-600 mb-2 uppercase">About Us</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-10">
        We are transforming the way healthcare hires
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Left Image */}
        <div className="w-[280px] md:w-[300px]">
          <img
            src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/aubout-us-left.webp"
            alt="About Left"
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Middle Image (Shorter height) */}
        <div className="w-[280px] md:w-[300px]">
          <img
            src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/aubout-us-mid.webp"
            alt="About Mid"
            className="rounded-xl w-full h-[520px] object-cover"
          />
        </div>

        {/* Right Image */}
        <div className="w-[280px] md:w-[300px]">
          <img
            src="https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/11/aubout-us-right.webp"
            alt="About Right"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </div>
      {/* <MissionSection></MissionSection>
      <TeamSection></TeamSection>
      <Locations></Locations>
      <Testimonials></Testimonials> */}
    </section>
    
  );
};

export default AboutUs;
