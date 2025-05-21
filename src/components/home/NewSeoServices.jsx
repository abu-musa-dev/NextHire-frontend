import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";  // import Link

export default function NewSeoServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const seoServices = services.filter(
    (service) => service.category === "SEO Specialist"
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">New services in SEO</h2>
          <p className="text-gray-500 mt-2">Service is highly appreciated by users</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {seoServices.slice(0, 3).map((service, index) => (
            <Link
              to={`/service/${service.id}`}   // Link to details page
              key={service.id}
              className={`rounded-xl border ${
                service.featured ? "border-yellow-400" : "border-gray-200"
              } overflow-hidden shadow hover:shadow-lg transition bg-white block`}
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow">
                  <Heart size={18} className="text-gray-500" />
                </button>
                {service.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded shadow">
                    ★
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-sm text-green-700 font-medium">
                  {service.category ? service.category : "Uncategorized"}
                </p>
                <h3 className="text-md font-semibold text-gray-800 mt-1">
                  {service.title}
                </h3>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={service.user.avatar}
                    alt={service.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">{service.user.name}</p>
                    <div className="flex items-center text-sm text-green-600 gap-1">
                      <FaStar className="text-sm" />
                      <span>{service.user.rating}</span>
                      <span className="text-gray-500">
                        ({service.user.reviews} Review
                        {service.user.reviews > 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t mt-4 pt-3 text-left text-sm text-gray-600">
                  From{" "}
                  <span className="text-green-700 font-semibold text-base">
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
