import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check token in localStorage
    if (!token) {
      // Redirect to the sign-in page if the token is not found
      navigate("/authentication/sign-in");
    }
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
