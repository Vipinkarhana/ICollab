import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Checking token:", token);
    
    if (!token) {
      console.log("No token found, redirecting...");
      window.location.href = "http://localhost:5173/login";
    } else {
      setIsAuth(true);
    }
    
  }, []);

  if (!isAuth) {
    return null; // Prevent rendering until auth check is done
  }

  return <Outlet />;
};

export default PrivateRoute;
