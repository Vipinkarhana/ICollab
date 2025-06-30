// components/EditIncubatorModal.js
import React, { useEffect } from "react";
import { X } from "lucide-react";
import IncubatorForm from "../LandingPage/IncubatorForm";

const EditIncubatorModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-start sm:items-center pt-10 sm:pt-0 px-2 sm:px-6 overflow-y-auto">
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl sm:max-h-[90vh] overflow-y-auto border border-gray-200 animate-fadeIn"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 rounded-t-2xl z-10 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">
            Edit Incubator Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 bg-white p-1.5 rounded-full shadow-sm"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-4 sm:px-6 py-6 -mt-24 w-[110%] sm:w-full -ml-5 sm:ml-0">
          <IncubatorForm onClose={onClose} submitButtonText="Update Profile" />
        </div>
      </div>
    </div>
  );
};

export default EditIncubatorModal;
