import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function FreelancerDetails() {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    fetch("/freelancers.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data[parseInt(id)];
        setFreelancer(selected);
      });
  }, [id]);

  if (!freelancer) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/" className="text-green-600 underline mb-4 inline-block">← Back to list</Link>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4">
          <img src={freelancer.img} alt={freelancer.name} className="w-20 h-20 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{freelancer.name}</h2>
            <p className="text-green-600">{freelancer.role}</p>
            <p className="text-sm text-gray-500">
              {freelancer.location} • ★ {freelancer.rating}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700">{freelancer.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {freelancer.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 text-xl font-bold text-green-600">{freelancer.price}</div>
      </div>
    </div>
  );
}
