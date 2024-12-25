import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function CustomerTable({ handleEdit, handleViewProductDetails }) {
  const [selectedProducts, setSelectedProducts] = useState([]); // State to store selected products
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // State to control modal visibility

  // Edit button handler
  const handleEditClick = (id) => {
    console.log(`Editing customer with ID: ${id}`);
    handleEdit(id); // Call the passed handleEdit function
  };

  const handleDeleteClick = (id) => {
    setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
  };

  // View product button handler
  const handleViewProducts = (products) => {
    setSelectedProducts(products); // Set selected products
    setIsProductModalOpen(true); // Open the modal
  };

  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "اسم العميل", accessor: "name", align: "center" },
    { Header: "الجنس", accessor: "gender", align: "center" },
    { Header: "رقم الجوال", accessor: "mobile", align: "center" },
    { Header: "البريد الإلكتروني", accessor: "email", align: "center" },
    { Header: "تاريخ الميلاد", accessor: "dateOfBirth", align: "center" },
    {
      Header: "المنتجات",
      accessor: "products",
      align: "center",
      subColumns: [
        { Header: "عدد المنتجات", accessor: "productCount", align: "center" }, // Number of products
        { Header: "عرض المنتجات", accessor: "viewProducts", align: "center" }, // View products button
      ],
    },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      name: "عميل 1",
      gender: "ذكر",
      mobile: "1234567890",
      email: "customer1@example.com",
      dateOfBirth: "1990-01-01",
      products: [
        { id: 1, name: "زيت زيتون" },
        { id: 2, name: "ثوب فلاحي" },
      ],
    },
    {
      name: "عميل 2",
      gender: "أنثى",
      mobile: "0987654321",
      email: "customer2@example.com",
      dateOfBirth: "1995-05-15",
      products: [{ id: 3, name: "فخار" }],
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
      products: {
        productCount: row.products.length, // Number of products
        viewProducts: (
          <MDIconButton
            color="primary"
            onClick={() => handleViewProducts(row.products)}
            title="عرض المنتجات"
          >
            <VisibilityIcon />
          </MDIconButton>
        ),
      },
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEditClick(index + 1)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="success" onClick={() => handleDeleteClick(index + 1)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  return { columns, rows, selectedProducts, isProductModalOpen, setIsProductModalOpen };
}
