import React, { useEffect, useState, useMemo } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("Featured");

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  const sortedServices = useMemo(() => {
    if (!services) return [];

    switch (filter) {
      case "Newest":
        return [...services].sort((a, b) => b.id - a.id);
      case "Top rate":
        return [...services].sort((a, b) => b.user.rating - a.user.rating);
      case "Featured":
      default:
        return services;
    }
  }, [services, filter]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Popular Services</h2>
        <p className="text-gray-600 mt-2 text-base">Browse services loved by our community</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["Featured", "Newest", "Top rate"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2.5 rounded-full font-medium transition text-sm ${
                filter === item
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedServices.length > 0 ? (
          sortedServices.slice(0, 3).map((service) => (
            <Link
              to={`/services/${service.id}`}
              key={service.id}
              className="bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-2">
                  {service.category}
                </span>

                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {service.title}
                </h3>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={service.user.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">{service.user.name}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      {service.user.rating} ({service.user.reviews} reviews)
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t pt-3 text-sm text-gray-500 flex justify-between items-center">
                  <span>Starting at</span>
                  <span className="text-green-600 font-semibold text-lg">${service.price}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No services found.</p>
        )}
      </div>
    </section>
  );
};

export default PopularServices;
