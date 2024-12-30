import React, { useState, useEffect } from "react";
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
import DataproductHeadCell from "examples/products/Dataproduct/DataproductHeadCell";
import DataproductBodyCell from "examples/products/Dataproduct/DataproductBodyCell";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]); // State to store vendors
  const [editingId, setEditingId] = useState(null); // State to track the vendor being edited
  const [tempData, setTempData] = useState({ name: "", email: "", password: "" }); // Temporary storage for edited data

  // Load vendors from localStorage on component mount
  useEffect(() => {
    const storedVendors = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(storedVendors);
  }, []);

  // Function to handle editing a vendor
  const handleEdit = (vendor) => {
    setEditingId(vendor.email);
    setTempData({ name: vendor.name, email: vendor.email, password: vendor.password });
  };

  // Function to save edited vendor data
  const handleSave = () => {
    const updatedVendors = vendors.map((v) => (v.email === editingId ? { ...v, ...tempData } : v));
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    setEditingId(null);
    alert("تم تحديث البائع بنجاح!");
  };

  // Function to cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  // Function to delete a vendor
  const handleDelete = (email) => {
    const updatedVendors = vendors.filter((v) => v.email !== email);
    setVendors(updatedVendors);
    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    alert("تم حذف البائع بنجاح!");
  };

  // Table columns
  const columns = [
    { Header: "الاسم", accessor: "name", align: "center" },
    { Header: "البريد الإلكتروني", accessor: "email", align: "center" },
    { Header: "كلمة المرور", accessor: "password", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ];

  // Table rows
  const rows = vendors.map((vendor) => ({
    name:
      editingId === vendor.email ? (
        <TextField
          value={tempData.name}
          onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
          fullWidth
          size="small"
        />
      ) : (
        vendor.name
      ),
    email:
      editingId === vendor.email ? (
        <TextField
          value={tempData.email}
          onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
          fullWidth
          size="small"
        />
      ) : (
        vendor.email
      ),
    password:
      editingId === vendor.email ? (
        <TextField
          value={tempData.password}
          onChange={(e) => setTempData({ ...tempData, password: e.target.value })}
          fullWidth
          size="small"
        />
      ) : (
        "••••••"
      ),
    actions: (
      <MDBox display="flex" justifyContent="center" alignItems="center">
        {editingId === vendor.email ? (
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
            <MDButton variant="text" color="error" onClick={() => handleDelete(vendor.email)}>
              <DeleteIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
            </MDButton>
          </>
        )}
      </MDBox>
    ),
  }));

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
                {vendors.length === 0 ? (
                  <MDTypography variant="body1" textAlign="center" p={3}>
                    لا يوجد بائعين متاحين.
                  </MDTypography>
                ) : (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {columns.map((column, index) => (
                          <DataproductHeadCell key={index} align={column.align}>
                            {column.Header}
                          </DataproductHeadCell>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, index) => (
                        <tr key={index}>
                          {columns.map((column, colIndex) => (
                            <DataproductBodyCell key={colIndex} align={column.align}>
                              {row[column.accessor]}
                            </DataproductBodyCell>
                          ))}
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
