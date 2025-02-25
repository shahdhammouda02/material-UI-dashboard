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
} from "../../../Store/Slices/vendorsSlice/vendorsAction"; // Import actions

const VendorManagement = () => {
  const dispatch = useDispatch();
  const { vendors, loading, error } = useSelector((state) => state.vendor);

  const [editingId, setEditingId] = useState(null); // State to track the vendor being edited
  const [tempData, setTempData] = useState({ name: "", email: "", password: "", phone: "" }); // Temporary storage for edited data

  // Fetch vendors from the store on mount
  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  // Log vendors, loading, and error to help debug
  useEffect(() => {
    console.log("Vendors:", vendors);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [vendors, loading, error]);

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
    dispatch(updateVendor({ id: editingId, updatedData: tempData }));
    setEditingId(null);
    alert("تم تحديث البائع بنجاح!");
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteVendor(id));
    alert("تم حذف البائع بنجاح!");
  };

  const renderTextField = (value, onChange) => (
    <TextField value={value} onChange={onChange} fullWidth size="small" />
  );

  const renderActionButtons = (vendor) => {
    return editingId === vendor.id ? (
      <>
        <MDButton variant="text" color="success" onClick={handleSave}>
          <SaveIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
        </MDButton>
        <MDButton variant="text" color="error" onClick={handleCancel}>
          <CancelIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
        </MDButton>
      </>
    ) : (
      <>
        <MDButton variant="text" color="info" onClick={() => handleEdit(vendor)}>
          <EditIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
        </MDButton>
        <MDButton variant="text" color="error" onClick={() => handleDelete(vendor.id)}>
          <DeleteIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
        </MDButton>
      </>
    );
  };

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
                  <MDTypography variant="body1" textAlign="center" p={3}>
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
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(vendors) && vendors.length > 0 ? (
                        vendors.map((vendor) => {
                          console.log("Vendor Data:", vendor); // Check each vendor data
                          return (
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
                                    : key === "password" || key === "phone"
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
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", padding: "10px" }}>
                            لا يوجد بائعين
                          </td>
                        </tr>
                      )}
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
