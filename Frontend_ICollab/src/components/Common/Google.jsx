import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send Google token to the backend
      const res = await axios.post("http://localhost:5000/api/auth/google", { credential });
      console.log("Login Success:", res.data);

      // Save access token to local storage
      localStorage.setItem("accessToken", res.data.accessToken);

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
