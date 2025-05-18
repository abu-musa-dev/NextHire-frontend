import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star } from "lucide-react";

const Services = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category") || "";
    setSelectedCategory(categoryFromURL);
  }, [location.search]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? service.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">All Services</h2>
        <p className="text-gray-600 mt-2 text-base">Explore all available services</p>

        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {selectedCategory && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            Showing results for category: <strong>{selectedCategory}</strong>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
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
                  <span className="text-green-600 font-semibold text-lg">
                    ${service.price}
                  </span>
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

export default Services;
