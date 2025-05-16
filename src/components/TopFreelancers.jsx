import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const FreelancerCard = ({ freelancer, id }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm">
    <div className="flex items-center space-x-4 mb-4">
      <img
        src={freelancer.img}
        alt={freelancer.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{freelancer.name}</h3>
        <p className="text-green-600 font-medium">{freelancer.role}</p>
        <div className="flex items-center text-gray-500 text-sm space-x-2">
          <span>{freelancer.location}</span>
          <span>•</span>
          <span className="text-green-600 font-semibold">★ {freelancer.rating}</span>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-4">{freelancer.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {freelancer.tags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="text-xl font-bold text-green-600">{freelancer.price}</div>

    <Link to={`/freelancer/${id}`}>
      <button className="mt-4 w-full border border-green-600 text-green-600 rounded-full py-2 hover:bg-green-50 transition">
        View Profile
      </button>
    </Link>
  </div>
);

export default function TopFreelancers() {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    fetch("/freelancers.json")
      .then((res) => res.json())
      .then((data) => setFreelancers(data))
      .catch((err) => console.error("Failed to load freelancers:", err));
  }, []);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Top rated freelancer</h2>
        <p className="text-gray-500 mt-2">Top rated freelancer of the week</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {freelancers.map((freelancer, index) => (
          <FreelancerCard key={index} freelancer={freelancer} id={index} />
        ))}
      </div>
    </div>
  );
}
