/**
 * @file useAlert.js
 * @brief Custom hook for displaying alert messages using SweetAlert2.
 * @details Provides three types of alerts: success, warning, and error. 
 *          Each alert can be customized with a message.
 * @author ICollab
 * @date 2025-02-20
 */

import { useCallback } from "react";
import Swal from "sweetalert2";

/**
 * @function useAlert
 * @brief Custom hook to display different types of alerts.
 * @returns {Array} An array containing functions for success, warning, and error alerts.
 */
const useAlert = () => {
    /**
   * @brief Displays a success alert.
   * @param {string} message The success message to display.
   */
  const showSuccess = useCallback((message) => {
    Swal.fire({
      title: "Success!",
      text: message || "This is a custom success message.",
      icon: "success",
      confirmButtonText: "OK",
    });
  }, []);

    /**
   * @brief Displays a warning alert with a confirmation dialog.
   * @param {string} message The warning message to display.
   */
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

    /**
   * @brief Displays an error alert.
   * @param {string} message The error message to display.
   */
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
