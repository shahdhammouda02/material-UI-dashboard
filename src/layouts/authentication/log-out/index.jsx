import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all authentication-related data
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");

    // Redirect to the login page
    navigate("/authentication/sign-in");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
