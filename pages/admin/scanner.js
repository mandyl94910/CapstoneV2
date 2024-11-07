// pages/admin/scanner.js
import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import { useRouter } from "next/router";

const Scanner = () => {
  const [barcode, setBarcode] = useState(null);
  const [productInfo, setProductInfo] = useState(null); // Store scanned product information
  const scannerRef = useRef(null);
  const router = useRouter(); // Use useRouter for the go back functionality

  useEffect(() => {
    // Initialize Quagga
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "user", // Use front camera
          },
        },
        decoder: {
          readers: ["code_128_reader"], // Barcode format
        },
      },
      (err) => {
        if (err) {
          console.error("Failed to initialize Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setBarcode(data.codeResult.code);
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  // Function to send the barcode to the server
  const handleSubmit = async () => {
    if (barcode) {
      try {
        const response = await fetch(`/api/products/searchByBarcode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ barcode }),
        });

        const result = await response.json();
        if (result.message) {
          setProductInfo(null);
          alert(result.message);
        } else {
          setProductInfo(result);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
  };

  // Go back function
  const goBack = () => {
    router.back();
  };

  return (
    <div className="scanner-page flex flex-col items-center justify-between min-h-screen p-6">
      <div className="flex flex-row items-start justify-center w-full">
        {/* Left: Camera scan area */}
        <div className="camera-section w-1/2 h-96 bg-gray-200 flex items-center justify-center rounded-lg">
          <div ref={scannerRef} style={{ width: "100%", height: "100%" }}></div>
        </div>

        {/* Right: Product information area */}
        <div className="info-section w-1/2 ml-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Scan Result</h2>
          {barcode ? (
            <div>
              <p>
                Detected Barcode:{" "}
                <span className="font-semibold">{barcode}</span>
              </p>
              <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Fetch Product
              </button>
            </div>
          ) : (
            <p>Please scan a barcode.</p>
          )}

          {productInfo && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Product Information</h3>
              <p>Name: {productInfo.name}</p>
              <p>Price: ${productInfo.price}</p>
              <p>Description: {productInfo.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom-fixed Back button */}
      <button
        onClick={goBack}
        className="mt-8 px-10 py-3 bg-gray-500 text-white rounded fixed bottom-0"
      >
        Go Back
      </button>
    </div>
  );
};

export default Scanner;
