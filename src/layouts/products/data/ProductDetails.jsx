import React from "react";
import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import products from "./TableData";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <MDBox p={3}>
        <MDTypography variant="h3" gutterBottom>
          المنتج غير موجود
        </MDTypography>
      </MDBox>
    );
  }

  return (
    <MDBox p={3}>
      <MDTypography variant="h3" gutterBottom>
        تفاصيل المنتج
      </MDTypography>
      <MDBox p={2} borderRadius="lg" boxShadow={3}>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            الرقم التعريفي:
          </MDTypography>
          <MDTypography variant="body1">{product.id}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            الاسم:
          </MDTypography>
          <MDTypography variant="body1">{product.author}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            الفئة:
          </MDTypography>
          <MDTypography variant="body1">{product.Category}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            الصورة:
          </MDTypography>
          <MDBox ml={-1}>{product.images}</MDBox>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            السعر:
          </MDTypography>
          <MDTypography variant="body1">{product.price}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            الخصم:
          </MDTypography>
          <MDTypography variant="body1">{product.discount}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6" fontWeight="bold">
            الوصف:
          </MDTypography>
          <MDTypography variant="body1">{product.description}</MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default ProductDetails;
