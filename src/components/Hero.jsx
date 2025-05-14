import React from 'react';

const Hero = () => {
  const imageUrls = [
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-370.svg',
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-373.svg',
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-372.svg',
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-378.svg',
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-368.svg',
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-371.svg',
    'https://civi.uxper.co/freelance/wp-content/uploads/sites/4/2022/10/Ellipse-369.svg',
  ];

  const imagePositions = [
    { size: 120, top: '10%', left: '10%' },
    { size: 70, top: '5%', left: '70%' },
    { size: 90, top: '30%', left: '80%' },
    { size: 80, top: '60%', left: '10%' },
    { size: 130, top: '40%', left: '30%' },
    { size: 90, top: '60%', left: '70%' },
    { size: 100, top: '20%', left: '50%' },
  ];

  return (
    <section className="bg-[#fdf8ed] min-h-screen flex items-center justify-center px-6 py-12">
      <div className="mx-auto w-3/4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find a <span className="text-green-600 italic">freelancer</span> <br />
            you'll love
          </h1>
          <p className="text-gray-600 mb-8">
            Over 1200+ expert freelancers are waiting for you
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-md flex items-center p-2 w-full max-w-xl mb-4">
            <input
              type="text"
              placeholder="Service title..."
              className="flex-grow px-4 py-2 outline-none bg-transparent text-gray-700"
            />
            <select className="bg-transparent px-4 py-2 outline-none text-gray-700">
              <option>All Categories</option>
            </select>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition">
              Search
            </button>
          </div>

          {/* Popular Searches */}
          <p className="text-sm text-gray-600">
            Popular Searches: <span className="font-semibold text-black">WordPress</span>,{' '}
            <span className="font-semibold text-black">Audio Production & Editing</span>
          </p>
        </div>

        {/* Right Image Bubbles */}
        <div className="relative mt-12 md:mt-0 md:ml-16 w-full max-w-lg h-[500px]">
          {imagePositions.map((img, index) => (
            <img
              key={index}
              src={imageUrls[index]}
              alt={`Freelancer ${index}`}
              className="rounded-full object-cover absolute shadow-lg"
              style={{
                width: `${img.size}px`,
                height: `${img.size}px`,
                top: img.top,
                left: img.left,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
