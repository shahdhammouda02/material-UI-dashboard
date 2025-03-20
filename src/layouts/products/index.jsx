import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Addproduct from "./data/Addproduct";
import UpdateProduct from "./data/UpdateProduct";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../Store/Slices/productsSlice/productsAction";
import DataproductBodyCell from "../../examples/products/Dataproduct/DataproductBodyCell";
import DataproductHeadCell from "../../examples/products/Dataproduct/DataproductHeadCell";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [editingId, setEditingId] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleAddProductOpen = () => {
    setIsAddProductOpen(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    dispatch(addProduct(newProduct));
    setIsAddProductOpen(false);
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
                  جدول المنتجات
                </MDTypography>
                <MDButton variant="gradient" color="success" onClick={handleAddProductOpen}>
                  إضافة منتج
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {isAddProductOpen ? (
                  <Addproduct onAdd={handleAddProduct} onCancel={handleAddProductClose} />
                ) : editingId ? (
                  <UpdateProduct
                    initialRows={products}
                    productId={editingId}
                    onUpdate={handleUpdate}
                  />
                ) : (
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <DataproductHeadCell>كود المنتج</DataproductHeadCell>
                        <DataproductHeadCell>الفئة</DataproductHeadCell>
                        <DataproductHeadCell>الفئة الفرعية</DataproductHeadCell>
                        <DataproductHeadCell>الصورة</DataproductHeadCell>
                        <DataproductHeadCell>السعر</DataproductHeadCell>
                        <DataproductHeadCell>الخصم</DataproductHeadCell>
                        <DataproductHeadCell>الوصف</DataproductHeadCell>
                        <DataproductHeadCell>الإجراءات</DataproductHeadCell>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8" style={{ textAlign: "center" }}>
                            جار التحميل...
                          </td>
                        </tr>
                      ) : products.length > 0 ? (
                        products.map((row) => (
                          <tr key={row.id}>
                            <DataproductBodyCell align="center">{row.id}</DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              {row.category?.name || row.category}
                            </DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              {row.subcategory?.name || row.subcategory}
                            </DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              <img
                                src={`http://127.0.0.1:8000${row.image}`}
                                alt="product"
                                width="50"
                                height="50"
                                onError={(e) => console.error("Image load error:", e.target.src)}
                              />
                            </DataproductBodyCell>
                            <DataproductBodyCell align="center">{row.price}</DataproductBodyCell>
                            <DataproductBodyCell align="center">{row.discount}</DataproductBodyCell>
                            <DataproductBodyCell align="center">
                              {row.description}
                            </DataproductBodyCell>
                            <DataproductBodyCell
                              align="center"
                              display="flex !important"
                              flexDirection="row" // فقط هنا لضبط اتجاه العناصر
                              justifyContent="center"
                              sx={{ padding: "0 !important" }}
                            >
                              <MDButton
                                display="flex !important"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ padding: "0 !important" }}
                                onClick={() => handleEdit(row.id)}
                              >
                                <EditIcon
                                  color="success"
                                  sx={{
                                    height: "1.5rem !important",
                                    width: "1.5rem !important",
                                    padding: "0 !important",
                                  }}
                                />
                              </MDButton>
                              <MDButton onClick={() => handleDelete(row.id)}>
                                <DeleteIcon
                                  color="error"
                                  sx={{
                                    height: "1.5rem !important",
                                    width: "1.5rem !important",
                                    padding: "0 !important",
                                  }}
                                />
                              </MDButton>
                            </DataproductBodyCell>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" style={{ textAlign: "center" }}>
                            لا توجد بيانات متاحة
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
}

export default Products;
