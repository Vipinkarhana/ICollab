import { useCallback } from "react";
import Swal from "sweetalert2";

const useAlert = () => {
  const showSuccess = useCallback((message) => {
    Swal.fire({
      title: "Success!",
      text: message || "This is a custom success message.",
      icon: "success",
      confirmButtonText: "OK",
    });
  }, []);

  const showWarning = useCallback((message) => {
    Swal.fire({
      title: "Warning!",
      text: message || "Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  }, []);

  const showError = useCallback((message) => {
    Swal.fire({
      title: "Error!",
      text: message || "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }, []);

  return [showSuccess, showWarning, showError ];
};

export default useAlert;
