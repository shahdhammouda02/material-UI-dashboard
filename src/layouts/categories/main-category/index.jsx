import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddCategory from "./data/AddCategory";
import UpdateCategory from "./data/UpdateCategory";
import CategoryBodyCell from "examples/Categories/CategoriesData/CategoryBodyCell";
import CategoryHeadCell from "examples/Categories/CategoriesData/CategoryHeadCell";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "../../../Store/Slices/mainCategory/mainCategoryAction";

const MainCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories); // Assuming categories is now { success: true, data: [...] }
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories when component mounts
  useEffect(() => {
    if (!Array.isArray(categories?.data) || categories.data.length === 0) {
      dispatch(fetchCategories());
    }
    console.log("Categories:", categories); // Debugging to check fetched categories
  }, [dispatch, categories]);

  const handleAddCategoryOpen = () => setIsAddCategoryOpen(true);
  const handleAddCategoryClose = () => setIsAddCategoryOpen(false);

  const handleEdit = (category) => setEditingCategory(category);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة؟")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleUpdate = (updatedCategory) => {
    // Dispatch action to update category in the store
    dispatch(updateCategory({ id: updatedCategory.id, updatedData: updatedCategory }));
    setEditingCategory(null); // Close the update form after saving
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
                  جدول الفئات
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddCategoryOpen}>
                  إضافة فئة
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                {/* Conditionally render add, update, or table of categories */}
                {isAddCategoryOpen ? (
                  <AddCategory onAdd={handleAddCategoryClose} onCancel={handleAddCategoryClose} />
                ) : editingCategory ? (
                  <UpdateCategory
                    initialRows={categories.data} // استخدم categories.data هنا
                    categoryId={editingCategory.id} // تمرير ID الفئة التي تعدلها
                    onUpdate={handleUpdate} // تمرير الدالة handleUpdate هنا
                  />
                ) : // Ensure categories is an array before calling .map
                Array.isArray(categories?.data) && categories.data.length > 0 ? (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <CategoryHeadCell align="center">ID</CategoryHeadCell>
                        <CategoryHeadCell align="center">اسم الفئة</CategoryHeadCell>
                        <CategoryHeadCell align="center">الوصف</CategoryHeadCell>
                        <CategoryHeadCell align="center">الإجراءات</CategoryHeadCell>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.data.map((category) => (
                        <tr key={category.id}>
                          <CategoryBodyCell align="center">{category.id}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{category.name}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{category.description}</CategoryBodyCell>
                          <CategoryBodyCell align="center">
                            <MDBox display="flex" justifyContent="center" alignItems="center">
                              <MDButton
                                variant="text"
                                color="success"
                                onClick={() => handleEdit(category)}
                              >
                                <EditIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                              <MDButton
                                variant="text"
                                color="error"
                                onClick={() => handleDelete(category.id)}
                                sx={{ mx: 1 }}
                              >
                                <DeleteIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                            </MDBox>
                          </CategoryBodyCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <MDTypography variant="body1" color="textSecondary">
                    لا توجد فئات حالياً.
                  </MDTypography>
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

export default MainCategories;
