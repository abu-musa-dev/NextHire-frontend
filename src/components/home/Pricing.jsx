import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Failed to load pricing data:", err));
  }, []);

  if (!plans.length) return <div className="text-center py-20">Loading...</div>;

  const handleGetStarted = (priceString) => {
    // priceString যেমন "$350.00" সেটাকে সেন্টে রুপান্তর করা
    // $350.00 => 35000 (cents)
    const amount = Math.round(
      parseFloat(priceString.replace(/[^0-9.]/g, "")) * 100
    );
    navigate("/payment", { state: { amount } });
  };

  return (
    <section className="bg-[#f0f4f8] py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Simple, transparent pricing
        </h2>
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
              onClick={() => handleGetStarted(plan.price)}
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
