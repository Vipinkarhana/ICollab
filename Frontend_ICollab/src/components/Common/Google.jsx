import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Google = () => {
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send Google token to the backend
      const res = await axios.post("http://localhost:3000/api/auth/google", { credential });
      console.log("Login Success:", res.data);

      // Save access token to local storage
      localStorage.setItem("accessToken", res.data.accessToken);
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
