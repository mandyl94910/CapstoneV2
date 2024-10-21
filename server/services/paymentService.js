const Stripe = require("stripe");
const stripe = Stripe("Stripe_Secret_Key(WILL UPDATE)"); // Stripe 비밀 키 설정

// Payment Intent 생성 함수
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
