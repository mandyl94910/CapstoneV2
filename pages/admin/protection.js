import React, { useState } from "react";
import Header from "../../components/admin/Header";

const ProtectionPage = () => {
  const [pin, setPin] = useState(["", "", "", ""]);

  // PIN input
  const handlePinChange = (e, index) => {
    const newPin = [...pin];
    newPin[index] = e.target.value;
    setPin(newPin);

    // focus moving after pin input
    if (e.target.value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Protection" />
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-8xl mb-8">Enter PIN</h1>
          <div className="flex space-x-6 mb-40">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(e, index)}
                className="w-16 h-16 text-2xl text-center rounded bg-indigo-300 text-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPage;
