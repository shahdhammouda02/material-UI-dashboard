import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function AddOrder({ initialRows, onAdd, onCancel, onDelete }) {
  const [newOrder, setNewOrder] = useState({
    orderId: "", // Start with empty to indicate no ID is set
    customerName: "",
    product: "",
    productNumber: "",
    quantity: "",
    totalAmount: "",
    status: "", // Add status field here
  });

  // Automatically generate the next order ID based on existing rows
  useEffect(() => {
    const highestExistingId =
      initialRows.length > 0 ? Math.max(...initialRows.map((row) => row.orderId)) : 0;
    setNewOrder((prevData) => ({
      ...prevData,
      orderId: highestExistingId + 1,
    }));
  }, [initialRows]);

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (id) => {
    console.log(`Editing product with ID: ${id}`);
    // Add your editing logic here
  };

  const handleDeleteClick = (id) => {
    if (onDelete) {
      onDelete(id); // تمرير الـ ID فقط لحذف الصف المحدد
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
      !newOrder.customerName ||
      !newOrder.product ||
      !newOrder.productNumber ||
      !newOrder.quantity ||
      !newOrder.totalAmount ||
      !newOrder.status // Validate the status field as well
    ) {
      setError("من فضلك قم بملء جميع الحقول بشكل صحيح.");
      return;
    }

    setError(""); // Clear error message if all fields are valid

    const newOrderData = {
      ...newOrder,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEditClick(newOrder.orderId)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(newOrder.orderId)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    };

    onAdd(newOrderData); // Add the new order entry to the parent component
    setNewOrder({
      orderId: "", // Reset form fields after submission
      customerName: "",
      product: "",
      productNumber: "",
      quantity: "",
      totalAmount: "",
      status: "", // Reset status as well
    });
  };

  return (
    <MDBox p={3}>
      <MDTypography variant="h5" mb={2}>
        إضافة طلب جديد
      </MDTypography>
      <form onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput label="رقم الطلب" name="orderId" value={newOrder.orderId} fullWidth disabled />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="اسم العميل"
            name="customerName"
            value={newOrder.customerName}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="المنتج"
            name="product"
            value={newOrder.product}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="رقم المنتج"
            name="productNumber"
            value={newOrder.productNumber}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="الكمية"
            name="quantity"
            type="number"
            value={newOrder.quantity}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            label="المبلغ الإجمالي"
            name="totalAmount"
            value={newOrder.totalAmount}
            onChange={handleInputChange}
            fullWidth
          />
        </MDBox>

        {/* حقل الحالة باستخدام القائمة المنسدلة */}
        <MDBox mb={2}>
          <FormControl fullWidth>
            <InputLabel>الحالة</InputLabel>
            <Select
              label="الحالة"
              name="status"
              value={newOrder.status}
              onChange={handleInputChange}
              sx={{ height: "40px" }}
            >
              <MenuItem value="قيد التنفيذ">قيد التنفيذ</MenuItem>
              <MenuItem value="تم الشحن">تم الشحن</MenuItem>
              <MenuItem value="تم التسليم">تم التسليم</MenuItem>
              <MenuItem value="ملغي">ملغي</MenuItem>
            </Select>
          </FormControl>
        </MDBox>

        {error && (
          <MDTypography color="error" mb={2}>
            {error}
          </MDTypography>
        )}

        <MDBox display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="success" type="submit">
            حفظ
          </MDButton>
          <MDButton variant="gradient" color="error" onClick={onCancel}>
            إلغاء
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
}

AddOrder.propTypes = {
  initialRows: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.number.isRequired,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func, // Function to handle deletion
};

AddOrder.defaultProps = {
  initialRows: [],
  onDelete: null,
};

export default AddOrder;
