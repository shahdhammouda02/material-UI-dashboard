import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddSubCategory from "./data/AddSubCategory"; // Import the AddCategory component
import DataTable from "./data/TablesubData"; // Import the TablesubData function
import UpdateSubCategory from "./data/UpdateSubCategory"; // Import UpdateCategory
import CategoryBodyCell from "examples/Categories/CategoriesData/CategoryBodyCell"; // Import CategoryBodyCell
import CategoryHeadCell from "examples/Categories/CategoriesData/CategoryHeadCell"; // Import CategoryHeadCell
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function SubCategories() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [categoryRows, setCategoryRows] = useState([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  const handleUpdate = (updatedCategory) => {
    setCategoryRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedCategory.id ? updatedCategory : row))
    );
    setEditingId(null); // Close the edit dialog
  };
  const handleDelete = (id) => {
    setCategoryRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Delete row by orderId
  };
  const handleAddCategoryOpen = () => {
    setIsAddCategoryOpen(true); // Open Add Order modal
  };
  const handleAddCategoryClose = () => {
    setIsAddCategoryOpen(false); // Close Add Order modal
  };
  const handleAddCategory = (newCategory) => {
    setCategoryRows((prevRows) => [...prevRows, newCategory]); // Add the new Category
    setIsAddCategoryOpen(false); // Close Add Category modal
  };
  const { columns, rows } = DataTable(handleEdit); // Pass the handleEdit function

  // Update categoryRows with the rows from DataTable
  useEffect(() => {
    setCategoryRows(rows); // Set initial rows from DataTable
  }, [rows]);

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
                  جدول الفئات الفرعية
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddCategoryOpen}>
                  اضافة فئة فرعية
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {isAddCategoryOpen ? (
                  <AddSubCategory
                    initialRows={rows}
                    onAdd={handleAddCategory}
                    onCancel={handleAddCategoryClose}
                  />
                ) : editingId ? (
                  <UpdateSubCategory
                    initialRows={categoryRows}
                    categoryId={editingId}
                    onUpdate={handleUpdate}
                  />
                ) : (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        {columns.map((column, index) => (
                          <CategoryHeadCell key={index} align={column.align}>
                            {column.Header}
                          </CategoryHeadCell>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {categoryRows.map((row, index) => (
                        <tr key={index}>
                          <CategoryBodyCell align="center">{row.id}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.Category}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.text}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.mainCategory}</CategoryBodyCell>
                          <CategoryBodyCell align="center">
                            <MDBox
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              sx={{ padding: "0 !important" }}
                            >
                              <MDButton
                                variant="text"
                                color="success"
                                onClick={() => handleEdit(row.id)}
                                sx={{ padding: "0 !important" }}
                              >
                                <EditIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                              <MDButton
                                mx={1}
                                variant="text"
                                color="error"
                                onClick={() => handleDelete(row.id)}
                                sx={{ padding: "0 !important" }}
                              >
                                <DeleteIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                            </MDBox>
                          </CategoryBodyCell>
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
}

export default SubCategories;
