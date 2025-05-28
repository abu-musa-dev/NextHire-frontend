import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext"; // ✅ DarkMode context import

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useDarkMode(); // ✅ use darkMode

  useEffect(() => {
    fetch("http://localhost:5000/pricing")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Failed to load pricing data:", err));
  }, []);

  if (!plans.length) return <div className={`text-center py-20 ${darkMode ? "text-white" : "text-gray-800"}`}>Loading...</div>;

  const handleGetStarted = (priceString) => {
    if (!user || user.role !== "Candidate") {
      navigate("/login");
      return;
    }

    const amount = Math.round(parseFloat(priceString.replace(/[^0-9.]/g, "")) * 100);
    navigate("/payment", { state: { amount } });
  };

  return (
    <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#f0f4f8] text-gray-800"} py-20 px-6 transition-colors`}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Simple, transparent pricing
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg`}>
          Our simple, per-job pricing scales with you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl shadow-lg p-8 transition-transform transform hover:scale-105 duration-300 ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border border-gray-200"
            } ${plan.recommended ? "border-2 border-yellow-400" : "border"}`}
          >
            {plan.recommended && (
              <span className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">
                Recommended
              </span>
            )}

            <h3 className="text-sm font-semibold text-green-500 uppercase mb-3">
              {plan.name}
            </h3>
            <div className="text-4xl font-bold mb-1">{plan.price}</div>
            <div className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm mb-6`}>
              {plan.duration}
            </div>

            <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-700"} mb-8`}>
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
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
