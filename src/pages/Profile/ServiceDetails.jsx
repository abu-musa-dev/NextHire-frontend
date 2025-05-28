import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext";
import Login from "../Auth/Login";
import CustomSpinner from "../../components/shared/CustomSpinner";

const stripePromise = loadStripe(
  "pk_test_51RP7yDPxJ2tzs3FjjIXxvHucL6O0fWhA0VwPQ945DclhCMcJfHevKlIbEjRQAE13n8ZK3jENF5fJVqBiG2n1PQpS00LMAdJeHQ"
);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount,
      });
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [paid, setPaid] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setLoadingSpinner(false);
    }, 2000);

    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        setService(data.find((s) => s.id === Number(id)));
      });

    return () => clearTimeout(timer);
  }, [id]);

  if (loadingSpinner) {
    return <CustomSpinner />;
  }

  if (authLoading) return <p>Checking authentication...</p>;

  if (!user || user.role !== "Employer") {
    return (
      <div className={`max-w-3xl mx-auto p-8 mt-20 ${darkMode ? "bg-gray-900 text-white" : ""}`}>
        <div className="bg-red-100 text-red-700 rounded-lg text-center font-semibold shadow p-6 mb-6">
          Access Denied. Only logged-in employers can view this page.
        </div>
        <Login />
      </div>
    );
  }

  if (!service) return <p>Loading service details...</p>;

  return (
    <div
      className={`min-h-screen px-4 py-10 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto mt-10 mb-10 p-8 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
        <p className="mb-6">Category: {service.category}</p>

        {!paid ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={service.price * 100} onSuccess={() => setPaid(true)} />
          </Elements>
        ) : (
          <div className="p-6 bg-green-100 text-green-800 rounded-lg text-center">
            Payment Successful! Thank you.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
