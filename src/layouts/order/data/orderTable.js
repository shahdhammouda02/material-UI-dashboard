import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox"; // Assuming correct path for custom component
import MDIconButton from "@mui/material/IconButton"; // Material UI IconButton
import EditIcon from "@mui/icons-material/Edit"; // Material UI EditIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Material UI DeleteIcon
import VisibilityIcon from "@mui/icons-material/Visibility"; // Material UI View Icon

export default function OrdersTable() {
  const [columns, setColumns] = useState([
    { Header: "رقم الطلب", accessor: "orderId", align: "center" },
    { Header: "اسم العميل", accessor: "customerName", align: "center" },
    { Header: "المنتج", accessor: "product", align: "center" },
    { Header: "رقم المنتج", accessor: "productNumber", align: "center" },
    { Header: "الكمية", accessor: "quantity", align: "center" },
    { Header: "المبلغ الإجمالي", accessor: "totalAmount", align: "center" },
    { Header: "الحالة", accessor: "status", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      customerName: "محمد أحمد",
      product: "كوفية",
      productNumber: "1",
      quantity: 1,
      totalAmount: "$20",
      status: "قيد المعالجة",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDBox mx={1} />
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      customerName: "سارة خالد",
      product: "توب فلاحي ",
      productNumber: "3",
      quantity: 1,
      totalAmount: "$500",
      status: "تم التسليم",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDBox mx={1} />
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      customerName: "أحمد علي",
      product: "كتاب إلكتروني",
      productNumber: "6",
      quantity: 2,
      totalAmount: "$40",
      status: "تم الشحن",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDBox mx={1} />
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      customerName: "خالد محمود",
      product: " هودي ",
      productNumber: "8",
      quantity: 3,
      totalAmount: "$150",
      status: "قيد المعالجة",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDBox mx={1} />
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      orderId: index + 1, // Assign sequential order ID
      ...row,
    }));
  }, [initialRows]);

  return {
    columns, // Ensure columns are set correctly
    rows, // Ensure rows are set correctly
    // Other states and functions can be added as needed
  };
}
