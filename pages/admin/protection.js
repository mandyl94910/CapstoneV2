import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // useRouter import
import Header from "../../components/admin/Header";

const ProtectionPage = ({ correctPin, onSuccess, onFailure }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const router = useRouter(); // router 객체 생성

  // PIN 입력 핸들러
  const handlePinChange = (e, index) => {
    const newPin = [...pin];
    newPin[index] = e.target.value;
    setPin(newPin);

    // 다음 입력란으로 자동 이동
    if (e.target.value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    // 모든 PIN이 입력되었을 때만 검증
    if (pin.every((digit) => digit !== "")) {
      if (pin.join("") === correctPin) {
        alert("PIN verified successfully!");
        if (onSuccess) onSuccess(); // 성공 콜백 호출
        router.back(); // 이전 화면으로 돌아가기
      } else {
        if (onFailure) onFailure(); // 실패 콜백 호출
        setPin(["", "", "", ""]); // PIN이 틀리면 초기화
      }
    }
  }, [pin, correctPin, onSuccess, onFailure, router]);

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
