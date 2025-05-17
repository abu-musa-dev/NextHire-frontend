import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Jahson Staham',
    title: 'CTO of Behand',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    message:
      '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ”',
  },
  {
    name: 'Selena Gomez',
    title: 'CTO of Behand',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    message:
      '“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ”',
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
        <h2 className="text-2xl font-semibold mb-8">What our customers says</h2>

        <div className="relative flex justify-center items-center gap-6">
          <button
            onClick={prevSlide}
            className="absolute left-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <p className="text-gray-600 mb-4">{testimonials[currentIndex].message}</p>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover"
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

          <button
            onClick={nextSlide}
            className="absolute right-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === currentIndex ? 'bg-green-600' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
