import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51RP7yDPxJ2tzs3FjjIXxvHucL6O0fWhA0VwPQ945DclhCMcJfHevKlIbEjRQAE13n8ZK3jENF5fJVqBiG2n1PQpS00LMAdJeHQ"
);

function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    try {
      const { data } = await axios.post(
        "https://next-haire-backend-now.vercel.app/create-payment-intent",
        { amount }
      );
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

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 space-y-6"
      noValidate
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Payment Details
      </h2>

      <div className="border rounded-md p-4 focus-within:ring-2 focus-within:ring-green-500 transition">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && (
        <div className="text-red-600 font-medium bg-red-100 p-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 rounded-lg font-semibold text-white ${
          processing ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        } transition`}
      >
        {processing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" />
      
      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 mx-4 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="mb-6 text-gray-700">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  const [modalOpen, setModalOpen] = useState(false);

  if (!amount) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          No plan selected
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Pricing
        </button>
      </div>
    );
  }

  const handleSuccess = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">
          Complete Your Payment
        </h1>

        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccess={handleSuccess} />
        </Elements>
      </div>

      <SuccessModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
