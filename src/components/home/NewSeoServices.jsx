import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext"; // Import the context

export default function NewSeoServices() {
  const [services, setServices] = useState([]);
  const { darkMode } = useDarkMode(); // Use dark mode state

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const seoServices = services.filter(
    (service) => service.category === "SEO Specialist"
  );

  return (
    <section className={`py-16 transition duration-300 ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">New services in SEO</h2>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Service is highly appreciated by users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {seoServices.slice(0, 3).map((service) => (
            <Link
              to={`/service/${service.id}`}
              key={service.id}
              className={`rounded-xl border overflow-hidden shadow hover:shadow-lg transition block ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : service.featured
                  ? "bg-white border-yellow-400"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover"
                />
                <button className={`absolute top-3 right-3 p-1 rounded-full shadow ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-500"
                }`}>
                  <Heart size={18} />
                </button>
                {service.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded shadow">
                    ★
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-sm text-green-500 font-medium">
                  {service.category || "Uncategorized"}
                </p>
                <h3 className={`text-md font-semibold mt-1 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  {service.title}
                </h3>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={service.user.avatar}
                    alt={service.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}>
                      {service.user.name}
                    </p>
                    <div className="flex items-center text-sm text-green-500 gap-1">
                      <FaStar className="text-sm" />
                      <span>{service.user.rating}</span>
                      <span className={darkMode ? "text-gray-300" : "text-gray-500"}>
                        ({service.user.reviews} Review
                        {service.user.reviews > 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`border-t mt-4 pt-3 text-left text-sm ${
                  darkMode ? "text-gray-300 border-gray-600" : "text-gray-600"
                }`}>
                  From{" "}
                  <span className="text-green-600 font-semibold text-base">
                    ${service.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
