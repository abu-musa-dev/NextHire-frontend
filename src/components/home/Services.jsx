import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext"; // Adjust path as needed

const Services = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromURL = queryParams.get("category") || "";
    setSelectedCategory(categoryFromURL);
  }, [location.search]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
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
    <section
      className={`w-full min-h-screen px-4 py-16 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">All Services</h2>
          <p className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Explore all available services
          </p>

          <div className="mt-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition ${
                darkMode
                  ? "bg-gray-800 text-white border border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border border-gray-300"
              }`}
            />
          </div>

          {selectedCategory && (
            <p className="mt-4 text-sm text-green-500 font-medium">
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
                className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                      darkMode ? "text-green-400 bg-green-900" : "text-green-700 bg-green-100"
                    }`}
                  >
                    {service.category}
                  </span>

                  <h3
                    className={`text-lg font-semibold line-clamp-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={service.user.avatar}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {service.user.name}
                      </p>
                      <div
                        className={`flex items-center text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Star size={14} className="text-yellow-500 mr-1" />
                        {service.user.rating} ({service.user.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-4 border-t pt-3 text-sm flex justify-between items-center ${
                      darkMode ? "text-gray-400 border-gray-700" : "text-gray-500"
                    }`}
                  >
                    <span>Starting at</span>
                    <span className="text-green-600 font-semibold text-lg">
                      ${service.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={`text-center col-span-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No services found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
