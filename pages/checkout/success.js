import { useRouter } from "next/router";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter();
  const { amount, referenceNumber } = router.query; // Retrieve basic payment info

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {/* Logo */}
      <div className="mb-8">
        <Image src="/logo.png" alt="Logo" width={165} height={52} priority />
      </div>

      {/* Success Message */}
      <div className="text-3xl font-bold mb-2">Success!</div>
      <p className="text-lg mb-4">Your payment was successfully completed.</p>

      {/* Order Reference */}
      <p className="text-sm text-gray-500 mb-8">
        ORDER NUMBER: <strong>{referenceNumber || "N/A"}</strong>
      </p>

      {/* Display Amount (if available) */}
      {amount && (
        <div className="text-xl font-semibold mb-4">
          Total Amount:{" "}
          <span className="font-bold">${(amount / 100).toFixed(2)}</span>
        </div>
      )}

      {/* Home Button */}
      <div className="mt-12">
        <button
          onClick={() => router.push("/")}
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
