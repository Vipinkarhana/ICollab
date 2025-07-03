import React from 'react';
import { CheckCircle } from 'lucide-react';

const SubmissionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Your data has been submitted and sent for verification and approval.
            As your data gets approval from our side, you'll be able to use full
            incubator's functionalities.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;