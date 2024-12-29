import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrdersTable(handleEdit) {
  const [columns] = useState([
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
    },
    {
      customerName: "سارة خالد",
      product: "توب فلاحي ",
      productNumber: "3",
      quantity: 1,
      totalAmount: "$500",
      status: "تم التسليم",
    },
    {
      customerName: "أحمد علي",
      product: "كتاب إلكتروني",
      productNumber: "6",
      quantity: 2,
      totalAmount: "$40",
      status: "تم الشحن",
    },
    {
      customerName: "خالد محمود",
      product: " هودي ",
      productNumber: "8",
      quantity: 3,
      totalAmount: "$150",
      status: "قيد المعالجة",
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      orderId: index + 1, // Assign sequential order ID
      ...row,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEditClick(index + 1)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(index + 1)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  const handleEditClick = (id) => {
    handleEdit(id);
  };

  const handleDeleteClick = (id) => {
    setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
    console.log(`Deleted order with ID: ${id}`);
  };

  return {
    columns,
    rows,
  };
}
