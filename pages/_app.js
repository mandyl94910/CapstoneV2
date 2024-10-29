import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MessageProvider } from "../context/MessageContext";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QBpyuCdc6M7JQRmFrFgrt1YCO0hrVm9kz3upoRGO9nF95lsrQubHW2pjyU7Z85QwtcyV4A7c2wuemnjHlxsSPbS00RcBMChwy"
);

function MyApp({ Component, pageProps }) {
  return (
    <MessageProvider>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    </MessageProvider>
  );
}

export default MyApp;
