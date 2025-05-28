import React, { useEffect, useState, useMemo } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext"; // নিশ্চিত করো path ঠিক আছে

const PopularServices = () => {
  const { darkMode } = useDarkMode(); // ডার্ক মোড কন্টেক্সট থেকে স্টেট আনো
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("Featured");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/services")
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

  const handleFilterClick = (item) => {
    if (item === filter) return;
    setLoading(true);
    setTimeout(() => {
      setFilter(item);
      setLoading(false);
    }, 2000);
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 py-16 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Popular Services</h2>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          Browse services loved by our community
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["Featured", "Newest", "Top rate"].map((item) => (
            <button
              key={item}
              onClick={() => handleFilterClick(item)}
              className={`px-5 py-2.5 rounded-full font-medium transition text-sm ${
                filter === item
                  ? "bg-green-600 text-white shadow-md"
                  : darkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
              disabled={loading}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <svg
            className="animate-spin h-10 w-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sortedServices.length > 0 ? (
            sortedServices.slice(0, 3).map((service) => (
              <Link
                to={`/services/${service.id}`}
                key={service.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-xl ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                }`}
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

                  <h3 className={`text-lg font-semibold line-clamp-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {service.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={service.user.avatar}
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{service.user.name}</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        {service.user.rating} ({service.user.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t pt-3 text-sm flex justify-between items-center text-gray-500 dark:text-gray-400">
                    <span>Starting at</span>
                    <span className="text-green-600 font-semibold text-lg">${service.price}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">No services found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default PopularServices;
