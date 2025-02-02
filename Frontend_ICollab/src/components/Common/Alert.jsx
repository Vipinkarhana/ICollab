import React from "react";
import Swal from "sweetalert2";

const AlertMessage = () => {
  const showAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "This is a custom alert message.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showWarning = () => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  };

  const showError = () => {
    Swal.fire({
      title: "Error!",
      text: "Something went wrong.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
        onClick={showAlert}
      >
        Show Success Alert
      </button>

      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        onClick={showWarning}
      >
        Show Warning Alert
      </button>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={showError}
      >
        Show Error Alert
      </button>
    </div>
  );
};

export default AlertMessage;
