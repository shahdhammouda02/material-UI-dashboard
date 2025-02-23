import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutVendor } from "../../Store/Slices/logoutSlice/logoutAction";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // استدعاء action الخاص بتسجيل الخروج
    dispatch(logoutVendor()).then(() => {
      // بعد نجاح تسجيل الخروج، يتم التوجيه إلى صفحة تسجيل الدخول
      navigate("/authentication/sign-in");
    });
  }, [dispatch, navigate]);

  return <div>جاري تسجيل الخروج...</div>;
};

export default Logout;
