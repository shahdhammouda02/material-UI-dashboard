import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CustomerTable = ({ handleEdit }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleEditClick = (id) => {
    console.log(`Editing customer with ID: ${id}`);
    handleEdit(id);
  };

  const handleDeleteClick = (id) => {
    setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
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
        { Header: "عدد المنتجات", accessor: "productCount", align: "center" },
        { Header: "عرض المنتجات", accessor: "viewProducts", align: "center" },
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
    {
      name: "عميل 3",
      gender: "انثى",
      mobile: "3534594580",
      email: "customer3@example.com",
      dateOfBirth: "1990-01-01",
      products: [
        { id: 1, name: "زيت زيتون" },
        { id: 2, name: "ثوب فلاحي" },
        { id: 3, name: "فخار" },
      ],
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
      products: {
        productCount: row.products.length,
        viewProducts: (
          <MDIconButton
            color="primary"
            title="عرض المنتجات"
            onClick={() => {
              setSelectedProducts(row.products);
              setIsProductModalOpen(true);
            }}
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
          <MDIconButton color="error" onClick={() => handleDeleteClick(index + 1)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  return { columns, rows, selectedProducts, isProductModalOpen, setIsProductModalOpen };
};

export default CustomerTable;
