import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import AddSubCategory from "./data/AddSubCategory";
import UpdateSubCategory from "./data/UpdateSubCategory";
import CategoryBodyCell from "examples/Categories/CategoriesData/CategoryBodyCell";
import CategoryHeadCell from "examples/Categories/CategoriesData/CategoryHeadCell";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from "../../../Store/Slices/subCategory/subCategoryAction";
import { fetchCategories } from "../../../Store/Slices/mainCategory/mainCategoryAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const SubCategories = () => {
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.subCategories);
  const { categories } = useSelector((state) => state.categories);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchSubCategories());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategoryOpen = () => setIsAddCategoryOpen(true);
  const handleAddCategoryClose = () => setIsAddCategoryOpen(false);

  const handleEdit = (category) => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      description: category.description,
      mainCategory: category.category_id,
    });
  };

  const handleDeleteDialogOpen = (id) => {
    setSelectedCategoryId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteSubCategory(selectedCategoryId));
    setDeleteDialogOpen(false);
  };

  const handleUpdate = (updatedCategory) => {
    dispatch(
      updateSubCategory({
        id: updatedCategory.id,
        updatedData: {
          name: updatedCategory.name,
          description: updatedCategory.description,
          category_id: updatedCategory.mainCategory,
        },
      })
    );
    setEditingCategory(null);
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
                  جدول الفئات الفرعية
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddCategoryOpen}>
                  إضافة فئة فرعية
                </MDButton>
              </MDBox>

              <MDBox pt={3}>
                {isAddCategoryOpen ? (
                  <AddSubCategory
                    onCancel={handleAddCategoryClose}
                    categories={categories?.data || []}
                  />
                ) : editingCategory ? (
                  <UpdateSubCategory
                    initialRows={subCategories.data} // تأكد من أن هذه البيانات موجودة بشكل صحيح
                    categoryId={editingCategory.id} // تأكد من أن editingCategory.id يحتوي على قيمة صالحة
                    onUpdate={handleUpdate} // تأكد من أن هذه الدالة موجودة وتعمل بشكل صحيح
                    categories={categories} // تأكد من أن categories تحتوي على البيانات الصحيحة
                  />
                ) : Array.isArray(subCategories?.data) && subCategories.data.length > 0 ? (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <CategoryHeadCell align="center">ID</CategoryHeadCell>
                        <CategoryHeadCell align="center">اسم الفئة الفرعية</CategoryHeadCell>
                        <CategoryHeadCell align="center">الوصف</CategoryHeadCell>
                        <CategoryHeadCell align="center">الفئة الرئيسية</CategoryHeadCell>
                        <CategoryHeadCell align="center">الإجراءات</CategoryHeadCell>
                      </tr>
                    </thead>
                    <tbody>
                      {subCategories.data.map((subCategory) => (
                        <tr key={subCategory.id}>
                          <CategoryBodyCell align="center">{subCategory.id}</CategoryBodyCell>
                          <CategoryBodyCell align="center">{subCategory.name}</CategoryBodyCell>
                          <CategoryBodyCell align="center">
                            {subCategory.description}
                          </CategoryBodyCell>
                          <CategoryBodyCell align="center">
                            {categories?.data?.find(
                              (cat) => Number(cat.id) === Number(subCategory.category_id)
                            )?.name || "غير معروف"}
                          </CategoryBodyCell>
                          <CategoryBodyCell align="center">
                            <MDBox display="flex" justifyContent="center" alignItems="center">
                              <MDButton
                                variant="text"
                                color="success"
                                onClick={() => handleEdit(subCategory)}
                              >
                                <EditIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
                              </MDButton>
                              <MDButton
                                variant="text"
                                color="error"
                                onClick={() => handleDeleteDialogOpen(subCategory.id)}
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
                    لا توجد فئات فرعية حالياً.
                  </MDTypography>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* حوار التأكيد للحذف */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText>هل أنت متأكد من حذف هذه الفئة الفرعية؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setDeleteDialogOpen(false)} color="primary">
            إلغاء
          </MDButton>
          <MDButton onClick={handleDeleteConfirm} color="error">
            حذف
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default SubCategories;
