// src/pages/ServiceDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // useAuth হুক import করো

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
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", { amount });
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

  const { user, loading: authLoading } = useAuth(); // useAuth হুক থেকে user আর loading নেওয়া

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => {
        setService(data.find((s) => s.id === Number(id)));
      });
  }, [id]);

  if (authLoading) return <p>Checking authentication...</p>;

  // ইউজার লগইন করা আছে কিনা এবং রোল চেক করা
  if (!user || user.role !== "Employer") {
    return (
      <div className="max-w-3xl mx-auto p-8 mt-20 bg-red-100 text-red-700 rounded-lg text-center font-semibold shadow">
        Access Denied. Only logged-in employers can view this page.
      </div>
    );
  }

  if (!service) return <p>Loading service details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
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
  );
};

export default ServiceDetails;
