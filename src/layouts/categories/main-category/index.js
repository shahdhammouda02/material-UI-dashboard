import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddCategory from "./data/AddCategory";
import TableData from "./data/TableData";
import UpdateCategory from "./data/UpdateCategory"; // Import UpdateCategory
import CategoryBodyCell from "examples/Categories/CategoriesData/CategoryBodyCell";
import CategoryHeadCell from "examples/Categories/CategoriesData/CategoryHeadCell";

function MainCategories() {
  const [editingId, setEditingId] = useState(null); // State to track the editing ID
  const [categoryRows, setCategoryRows] = useState([]);

  const handleEdit = (id) => {
    setEditingId(id); // Set the ID to edit
  };

  const handleUpdate = (updatedCategory) => {
    setCategoryRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedCategory.id ? updatedCategory : row))
    );
    setEditingId(null); // Close the edit dialog
  };

  const { columns, rows } = TableData(handleEdit); // Pass the handleEdit function

  // Update categoryRows with the rows from TableData
  useEffect(() => {
    setCategoryRows(rows); // Set initial rows from TableData
  }, [rows]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} bgColor="info" borderRadius="lg">
                <MDTypography variant="h6" color="white">
                  جدول الفئات
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {editingId ? (
                  <UpdateCategory
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
                          <CategoryBodyCell align="left">{row.id}</CategoryBodyCell>
                          <CategoryBodyCell align="left">{row.categoryName}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.description}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{row.actions}</CategoryBodyCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </MDBox>
              <AddCategory initialRows={categoryRows} />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MainCategories;
