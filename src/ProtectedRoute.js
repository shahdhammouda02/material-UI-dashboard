import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to the sign-in page if the token is not found
      navigate("/authentication/sign-in");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
