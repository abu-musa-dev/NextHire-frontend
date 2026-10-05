import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

export default function NewSeoServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetch("https://next-haire-backend-now.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setServices(data);
        } else if (Array.isArray(data?.services)) {
          setServices(data.services);
        } else if (Array.isArray(data?.data)) {
          setServices(data.data);
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setServices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const seoServices = Array.isArray(services)
    ? services.filter((service) => service?.category === "SEO Specialist")
    : [];

  return (
    <section
      className={`py-16 transition duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">
            New services in SEO
          </h2>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Service is highly appreciated by users
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading services...
          </div>
        ) : seoServices.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No SEO services found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {seoServices.slice(0, 3).map((service, index) => (
              <Link
                to={`/service/${service?._id || service?.id || index}`}
                key={service?._id || service?.id || index}
                className={`rounded-xl border overflow-hidden shadow hover:shadow-lg transition block ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : service?.featured
                    ? "bg-white border-yellow-400"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    src={service?.image || "https://via.placeholder.com/300"}
                    alt={service?.title || "Service"}
                    className="w-full h-52 object-cover"
                  />
                  <button
                    className={`absolute top-3 right-3 p-1 rounded-full shadow ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    <Heart size={18} />
                  </button>
                  {service?.featured && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded shadow">
                      ★
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-sm text-green-500 font-medium">
                    {service?.category || "Uncategorized"}
                  </p>
                  <h3
                    className={`text-md font-semibold mt-1 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {service?.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={
                        service?.user?.avatar ||
                        "https://via.placeholder.com/40"
                      }
                      alt={service?.user?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {service?.user?.name || "Unknown"}
                      </p>
                      <div className="flex items-center text-sm text-green-500 gap-1">
                        <FaStar className="text-sm" />
                        <span>{service?.user?.rating || 0}</span>
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-500"
                          }
                        >
                          ({service?.user?.reviews || 0} Review
                          {(service?.user?.reviews || 0) > 1 ? "s" : ""})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border-t mt-4 pt-3 text-left text-sm ${
                      darkMode
                        ? "text-gray-300 border-gray-600"
                        : "text-gray-600"
                    }`}
                  >
                    From{" "}
                    <span className="text-green-600 font-semibold text-base">
                      ${service?.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}