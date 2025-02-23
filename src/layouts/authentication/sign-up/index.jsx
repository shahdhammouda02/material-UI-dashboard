import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Checkbox } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignUp from "assets/images/bg-sign-in-basic.jpeg";
import { signupVendor } from "../../../Store/Slices/signupSlice/signupAction";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.signup);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!agree) {
      alert("يجب الموافقة على الشروط والأحكام.");
      return;
    }

    if (!name || !email || !phone || !password) {
      alert("جميع الحقول مطلوبة.");
      return;
    }

    try {
      const res = await dispatch(signupVendor({ name, email, phone, password }));
      console.log("🔹 API Response:", res);

      if (res.payload?.success) {
        alert(res.payload?.message || "تم التسجيل بنجاح!");

        // ✅ إذا لم يكن هناك Token، انتقل إلى صفحة تسجيل الدخول
        if (!res.payload.token) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(res.payload?.message || "حدث خطأ أثناء التسجيل.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      alert("حدث خطأ غير متوقع. حاول مرة أخرى.");
    }
  };

  return (
    <CoverLayout image={bgSignUp}>
      <Card
        sx={{
          width: "90%",
          maxWidth: "450px",
          bgcolor: "white",
          borderRadius: "20px",
          boxShadow: 3,
          padding: "20px",
        }}
      >
        <MDBox sx={{ maxWidth: "300px", margin: "0 auto" }}>
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <MDTypography variant="h4" color="green" textAlign="center" fontWeight="bold">
              إنشاء حساب
            </MDTypography>
          </MDBox>

          {error && (
            <MDTypography variant="body2" color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </MDTypography>
          )}

          <MDInput
            type="text"
            label="الاسم"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MDInput
            type="email"
            label="البريد الإلكتروني"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MDInput
            type="number"
            label="رقم الهاتف"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MDInput
            type="password"
            label="كلمة المرور"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <MDBox display="flex" alignItems="center" mb={3}>
            <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
            <MDTypography variant="button" color="green">
              أوافق على الشروط والأحكام
            </MDTypography>
          </MDBox>

          <MDButton fullWidth color="success" onClick={handleSignUp} disabled={loading}>
            {loading ? "جاري التسجيل..." : "إنشاء حساب"}
          </MDButton>

          <MDTypography variant="body2" color="textSecondary" textAlign="center" mt={3}>
            لديك حساب بالفعل؟{" "}
            <Link to="/authentication/sign-in" style={{ color: "green", textDecoration: "none" }}>
              تسجيل الدخول
            </Link>
          </MDTypography>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default SignUp;
