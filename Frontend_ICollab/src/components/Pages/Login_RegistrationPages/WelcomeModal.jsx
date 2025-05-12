import React from "react";

const WelcomeModal = ({ onClose, onNext }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center animate-fade-in-down">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Please complete your details!
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Your profile is incomplete. Completing your details helps us serve you better.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Skip
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;