import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import useAlert from "../../Common/UseAlert";

const Google = () => {
  const [showSuccess, showWarning, showError] = useAlert();
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await googleAuth({ credential });
      console.log("Google Login Response:", response);
      console.log("Redirecting to home after google login");
      navigate("/");
    } catch (error) {
      showError(error.message);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
    </div>
  );
};

export default Google;
