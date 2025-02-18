import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAxios } from "../../../services/apiService";
import AdminDashboard from "./AdminDashboard";

const AdminRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found");
          navigate("/unauthorized");
          return;
        }

        await publicAxios.get("/admin/", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
          withCredentials: true,
        });

        setIsAdmin(true);
      } catch (error) {
        console.error("Access Denied:", error.response?.data?.message);
        navigate("/unauthorized"); // Redirect if not admin
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return isAdmin ? <AdminDashboard /> : null;
};

export default AdminRoute;
