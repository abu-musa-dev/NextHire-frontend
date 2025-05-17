import React from "react";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "TRIAL",
    price: "Free",
    duration: "/month",
    features: [
      "1 service posting",
      "1 featured service",
      "1 jobs applied",
      "1 jobs wishlist",
      "1 company follow",
    ],
    buttonStyle: "border border-gray-400 text-gray-800 bg-white hover:bg-gray-50",
    recommended: false,
  },
  {
    name: "EXTENDED",
    price: "$350.00",
    duration: "/year",
    features: [
      "88 service posting",
      "60 featured service",
      "88 jobs applied",
      "78 jobs wishlist",
      "90 company follow",
    ],
    buttonStyle: "bg-green-600 text-white hover:bg-green-700",
    recommended: true,
  },
  {
    name: "BASIC",
    price: "$120.00",
    duration: "/year",
    features: [
      "7 service posting",
      "7 featured service",
      "5 jobs applied",
      "5 jobs wishlist",
      "2 company follow",
    ],
    buttonStyle: "border border-gray-400 text-gray-800 bg-white hover:bg-gray-50",
    recommended: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-[#f0f4f8] py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
        <p className="text-lg text-gray-600">
          Our simple, per-job pricing scales with you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-lg p-8 transition-transform transform hover:scale-105 duration-300 ${
              plan.recommended ? "border-2 border-yellow-400" : "border border-gray-200"
            }`}
          >
            {plan.recommended && (
              <span className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                Recommended
              </span>
            )}

            <h3 className="text-sm font-semibold text-green-600 uppercase mb-3">
              {plan.name}
            </h3>
            <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
            <div className="text-sm text-gray-500 mb-6">{plan.duration}</div>

            <ul className="space-y-3 text-gray-700 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-full font-semibold text-sm ${plan.buttonStyle}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}