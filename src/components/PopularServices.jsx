import React, { useEffect, useState } from "react";
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

  const sortedServices = React.useMemo(() => {
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
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Popular service</h2>
        <p className="text-gray-500">Service is highly appreciated by users</p>

        <div className="mt-6 flex justify-center gap-4">
          {["Featured", "Newest", "Top rate"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full font-semibold ${
                filter === item
                  ? "bg-green-700 text-white"
                  : "border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with 3 columns, no horizontal scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedServices.length > 0 ? (
          sortedServices.slice(0, 3).map((service) => (
            <Link
              to={`/services/${service.id}`}
              key={service.id}
              className="bg-white rounded-xl border hover:shadow-lg transition"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <p className="text-green-700 font-semibold text-sm">{service.category}</p>
                <h3 className="font-semibold text-lg text-gray-800 mt-1">{service.title}</h3>

                <div className="flex items-center gap-3 mt-4">
                  <img src={service.user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{service.user.name}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star size={14} className="text-green-600 mr-1" />
                      {service.user.rating} ({service.user.reviews} Review)
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 border-t pt-2">
                  From <span className="text-green-700 font-bold text-lg">${service.price}</span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No services found.</p>
        )}
      </div>
    </section>
  );
};

export default PopularServices;
