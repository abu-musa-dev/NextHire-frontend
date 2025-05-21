import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Jahson Staham',
    title: 'CTO of Behand',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    message:
      'Working with this platform has been a game-changer. The hiring process is now faster and more efficient for our entire team.',
  },
  {
    name: 'Selena Gomez',
    title: 'Nurse Manager at MedicaCare',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    message:
      'I found the perfect opportunity within days. Their focus on healthcare hiring really makes a difference.',
  },
  {
    name: 'Michael Lee',
    title: 'HR Director at Wellness Inc.',
    image: 'https://randomuser.me/api/portraits/men/68.jpg',
    message:
      'Seamless, professional, and effective. Highly recommend this platform to any healthcare organization.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-[#f9fafb] py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm uppercase text-gray-500 mb-2">People Love Us</p>
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">What our customers say</h2>

        <div className="relative flex justify-center items-center gap-6">
          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 sm:left-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Testimonial Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-md transition-all duration-500 ease-in-out">
            <p className="text-gray-600 italic mb-4 transition-opacity duration-300">
              “{testimonials[currentIndex].message}”
            </p>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={testimonials[currentIndex].image}
                alt={`${testimonials[currentIndex].name} profile`}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div className="text-left">
                <h4 className="font-semibold text-gray-800">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-gray-500">{testimonials[currentIndex].title}</p>
              </div>
            </div>
            <div className="mt-4 text-green-600 text-right">
              <FaQuoteRight />
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="absolute -right-4 sm:right-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-green-600 scale-125' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
