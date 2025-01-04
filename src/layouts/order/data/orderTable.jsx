import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableData from "../../products/data/TableData";
import Chip from "@mui/material/Chip"; // Import Chip for badge-like appearance

export default function OrdersTable(handleEdit) {
  const [columns] = useState([
    { Header: "رقم الطلب", accessor: "orderId", align: "center" },
    { Header: "اسم العميل", accessor: "customerName", align: "center" },
    { Header: "المنتجات", accessor: "product", align: "center" },
    { Header: "المبلغ الإجمالي", accessor: "totalAmount", align: "center" },
    { Header: "عرض التفاصيل", accessor: "detailsButton", align: "center" },
    { Header: "حالة الطلب", accessor: "status", align: "center" },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  // Fetch product data from TableData
  const { products } = TableData({ handleEdit: () => {}, handleDelete: () => {} });

  const [initialRows, setInitialRows] = useState([
    {
      customerName: "محمد أحمد",
      product: ["زيت زيتون", "فخار"],
      details: products
        .filter((product) => product.author === "زيت زيتون" || product.author === "فخار")
        .map((product) => ({
          productId: product.id,
          product: product.author,
          price: parseFloat(product.price.replace("$", "")), // Convert price to number
          quantity: product.author === "زيت زيتون" ? 1 : 2, // Set quantity dynamically
        })),
      status: "قيد المعالجة",
    },
    {
      customerName: "سارة خالد",
      product: ["ثوب فلاحي"],
      details: products
        .filter((product) => product.author === "ثوب فلاحي")
        .map((product) => ({
          productId: product.id,
          product: product.author,
          price: parseFloat(product.price.replace("$", "")), // Convert price to number
          quantity: 1, // Default quantity (can be adjusted as needed)
        })),
      status: "تم التسليم",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [selectedRowDetails, setSelectedRowDetails] = useState([]); // State to store selected row details

  const handleOpenDialog = (details) => {
    setSelectedRowDetails(details); // Set the details for the selected row
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const rows = useMemo(() => {
    return initialRows.map((row, index) => {
      // Calculate total amount based on quantity and price
      const totalAmount = row.details.reduce(
        (sum, detail) => sum + detail.price * detail.quantity,
        0
      );

      // Define badge color based on status
      const statusColor =
        row.status === "قيد المعالجة"
          ? "warning" // Yellow for "قيد المعالجة"
          : row.status === "تم التسليم"
          ? "success" // Green for "تم التسليم"
          : "error"; // Red for other statuses

      return {
        orderId: index + 1, // Assign sequential order ID
        ...row,
        product: row.product.join(", "), // Join products into a string
        totalAmount: `$${totalAmount}`, // Format total amount as a string
        detailsButton: (
          <MDIconButton onClick={() => handleOpenDialog(row.details)}>
            <VisibilityIcon /> {/* Replaced with VisibilityIcon */}
          </MDIconButton>
        ),
        status: (
          <Chip
            label={row.status}
            color={statusColor}
            variant="filled"
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        ),
        actions: (
          <MDBox display="flex" justifyContent="center" alignItems="center">
            <MDIconButton color="success" onClick={() => handleEditClick(index + 1)}>
              <EditIcon />
            </MDIconButton>
            <MDBox mx={1} />
            {/* <MDIconButton color="error" onClick={() => handleDeleteClick(index + 1)}>
              <DeleteIcon />
            </MDIconButton> */}
          </MDBox>
        ),
      };
    });
  }, [initialRows]);

  const handleEditClick = (id) => {
    handleEdit(id);
  };

  // const handleDeleteClick = (id) => {
  //   setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
  //   console.log(`Deleted order with ID: ${id}`);
  // };

  return {
    columns,
    rows,
    openDialog,
    selectedRowDetails,
    handleCloseDialog,
  };
}
