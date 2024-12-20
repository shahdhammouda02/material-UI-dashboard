import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddSubCategory from "./data/AddSubCategory"; // Import the AddCategory component
import TablesubData from "./data/TablesubData"; // Import the TablesubData function
import UpdateSubCategory from "./data/UpdateSubCategory"; // Import UpdateCategory
import CategoryBodyCell from "examples/Categories/CategoriesData/CategoryBodyCell"; // Import CategoryBodyCell
import CategoryHeadCell from "examples/Categories/CategoriesData/CategoryHeadCell"; // Import CategoryHeadCell

function SubCategories() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [subcategoryRows, setSubcategoryRows] = useState([]);

  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  const handleUpdate = (updatedSubcategory) => {
    setSubcategoryRows((prevRows) =>
      prevRows.map((row) => (row.author === updatedSubcategory.author ? updatedSubcategory : row))
    );
    setEditingId(null); // Close the edit dialog
  };

  const { columns, rows } = TablesubData(handleEdit); // Pass the handleEdit function

  // Update subcategoryRows with the rows from TablesubData
  useEffect(() => {
    setSubcategoryRows(rows); // Set initial rows from TablesubData
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
                <MDTypography variant="h6" color="white">
                  جدول الفئات الفرعية
                </MDTypography>
                <AddSubCategory initialRows={subcategoryRows} />
              </MDBox>
              <MDBox pt={3}>
                {editingId ? (
                  <UpdateSubCategory
                    initialRows={subcategoryRows}
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
                      {subcategoryRows.map((row, index) => (
                        <tr key={index}>
                          <CategoryBodyCell align="left">{row.id}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.Category}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.text}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.mainCategory}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.Actions}</CategoryBodyCell>
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
