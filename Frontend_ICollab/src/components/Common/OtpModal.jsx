// src/components/ProfilePage/OTPModal.jsx
import React, { useState } from "react";

const OTPModal = ({ isVisible, onClose, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only 1 digit
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    onVerify(otpValue);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90vw] sm:w-[400px]">
        <h2 className="text-xl font-semibold text-center mb-4">Enter OTP</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          We've sent a 6-digit verification code to your registered email/phone.
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              maxLength={1}
              className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
