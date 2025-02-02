import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await googleAuth({ credential });
      console.log("Redirecting to home after google login");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
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
