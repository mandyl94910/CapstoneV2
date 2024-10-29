const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Stripe secret key from .env.local

// Payment Intent Create Function 
const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error(error.message);
  }
};

module.exports = { createPaymentIntent };
