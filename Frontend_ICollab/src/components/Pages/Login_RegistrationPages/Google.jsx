import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useAlert from "../../Common/UseAlert";
import { useDispatch } from 'react-redux';
import { googleLogin } from "../../../Redux/Slices/UserSlice"; 


const Google = () => {
  const dispatch = useDispatch();
  const [showSuccess, showWarning, showError] = useAlert();
  const navigate = useNavigate();
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;


      const response = await dispatch(googleLogin({ credential })).unwrap();
      
      if (response.role === "admin") {
        window.location.href = import.meta.env.VITE_ADMIN_DOMAIN;
      } else {
        navigate("/home");
      }


    } catch (error) {
      showError(error);
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
