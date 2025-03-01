import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendors,
  updateVendor,
  deleteVendor,
} from "../../../Store/Slices/vendorsSlice/vendorsAction";

const VendorManagement = () => {
  const dispatch = useDispatch();
  const vendorState = useSelector((state) => state.vendor);
  const vendors = Array.isArray(vendorState?.vendors?.vendors) ? vendorState.vendors.vendors : [];
  const loading = vendorState?.loading || false;
  const error = vendorState?.error || null;

  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const handleEdit = (vendor) => {
    setEditingId(vendor.id);
    setTempData({
      name: vendor.name,
      email: vendor.email,
      password: vendor.password,
      phone: vendor.phone,
    });
  };
  const handleSave = () => {
    if (!editingId || !tempData) {
      alert("خطأ: يرجى تحديد البائع وتحديث بياناته بشكل صحيح.");
      return;
    }
    dispatch(updateVendor({ id: editingId, updatedData: tempData })).then(() => {
      // بعد التحديث، جلب البيانات المحدثة من الخادم
      dispatch(fetchVendors());
      setEditingId(null);
      alert("تم تحديث البائع بنجاح!");
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteVendor(id));
    alert("تم حذف البائع بنجاح!");
  };

  const renderTextField = (value, onChange) => (
    <TextField value={value} onChange={onChange} variant="outlined" size="small" fullWidth />
  );

  const renderActionButtons = (vendor) => (
    <>
      {editingId === vendor.id ? (
        <>
          <MDButton
            variant="contained"
            color="success"
            onClick={handleSave}
            startIcon={<SaveIcon />}
            size="small"
          >
            حفظ
          </MDButton>
          <MDButton
            variant="outlined"
            color="error"
            onClick={handleCancel}
            startIcon={<CancelIcon />}
            size="small"
            style={{ marginLeft: "5px" }}
          >
            إلغاء
          </MDButton>
        </>
      ) : (
        <>
          <MDButton
            variant="contained"
            color="info"
            onClick={() => handleEdit(vendor)}
            startIcon={<EditIcon />}
            size="small"
          >
            تعديل
          </MDButton>
          <MDButton
            variant="outlined"
            color="error"
            onClick={() => handleDelete(vendor.id)}
            startIcon={<DeleteIcon />}
            size="small"
            style={{ marginLeft: "5px" }}
          >
            حذف
          </MDButton>
        </>
      )}
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                bgColor="info"
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h5" color="white">
                  إدارة البائعين
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDTypography variant="body1" textAlign="center" p={3}>
                    جاري التحميل...
                  </MDTypography>
                ) : error ? (
                  <MDTypography variant="body1" textAlign="center" p={3} color="error">
                    {error}
                  </MDTypography>
                ) : vendors.length === 0 ? (
                  <MDTypography variant="body1" textAlign="center" p={3}>
                    لا يوجد بائعين متاحين.
                  </MDTypography>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {[
                          "الاسم",
                          "البريد الإلكتروني",
                          "كلمة المرور",
                          "رقم الهاتف",
                          "الإجراءات",
                        ].map((header, index) => (
                          <th
                            key={index}
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              backgroundColor: "#f4f4f4",
                              borderBottom: "2px solid #ddd",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((vendor) => (
                        <tr key={vendor.id}>
                          {["name", "email", "password", "phone"].map((key, idx) => (
                            <td
                              key={idx}
                              style={{
                                textAlign: "center",
                                padding: "8px",
                                borderBottom: "1px solid #ddd",
                              }}
                            >
                              {editingId === vendor.id
                                ? renderTextField(tempData[key], (e) =>
                                    setTempData({ ...tempData, [key]: e.target.value })
                                  )
                                : key === "password"
                                ? "••••••"
                                : vendor[key] || "-"}
                            </td>
                          ))}
                          <td
                            style={{
                              textAlign: "center",
                              padding: "8px",
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            {renderActionButtons(vendor)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default VendorManagement;
