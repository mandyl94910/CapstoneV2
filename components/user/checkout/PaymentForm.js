import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

/**
 * PaymentForm Component
 * Handles payment submission using Stripe's CardElement.
 * @param {string} clientSecret - The client secret returned from Stripe for the PaymentIntent.
 * @param {function} onPaymentSuccess - Callback function invoked upon successful payment.
 */
const PaymentForm = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe(); // Initialize Stripe hook
  const elements = useElements(); // Get access to the Stripe elements (CardElement)
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // State for displaying error messages

  /**
   * handleSubmit - Handles form submission and payment processing
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while processing payment
    setErrorMessage(""); // Clear any previous error messages

    // Check if Stripe and Elements are loaded
    if (!stripe || !elements) {
      setLoading(false); // Reset loading state if Stripe is not ready
      return; // Exit function if Stripe is not properly initialized
    }

    const cardElement = elements.getElement(CardElement); // Get CardElement from Stripe elements

    // Confirm the payment with Stripe using the clientSecret
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement, // Use CardElement as the payment method
        },
      }
    );

    // Handle any errors returned by Stripe
    if (error) {
      console.error("Payment failed:", error); // Log the error for debugging
      setErrorMessage(error.message); // Update the UI with the error message
    }
    // If payment is successful, trigger the success callback
    else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent); // Log success for debugging
      alert("Payment was successful! Thank you."); // Inform the user of the success
      onPaymentSuccess(paymentIntent); // Call the success callback with the paymentIntent
    }

    setLoading(false); // Reset loading state after payment attempt
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-2xl font-bold mb-6 mt-10">Payment</h1>

      {/* Card input field using Stripe's CardElement */}
      <div className="flex flex-col mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px", // Adjust font size
                color: "#000", // Set text color to black
              },
              invalid: {
                color: "#fa755a", // Set text color for invalid input
              },
            },
            hidePostalCode: true, // Hide the postal code field (useful for non-US payments)
          }}
        />
      </div>

      {/* Display error messages if any */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      {/* Submit button with loading indicator */}
      <button
        type="submit"
        disabled={!stripe || loading} // Disable button if Stripe isn't ready or if loading
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        {loading ? "Processing..." : "Pay"}{" "}
        {/* Show 'Processing...' when loading */}
      </button>
    </form>
  );
};

export default PaymentForm;
