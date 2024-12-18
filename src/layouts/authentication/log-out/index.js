import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // Redirect to the login page
        } else {
          localStorage.removeItem("token"); // Remove token on logout
          navigate("/"); // Redirect to the login page (optional)
        }
      }, []);
    
  return (
    <div>
      
    </div>
  )
}

export default Logout
