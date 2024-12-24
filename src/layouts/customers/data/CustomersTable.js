import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Import the visibility icon
import clothes from "assets/images/clothes.jpg";
import handcraft from "assets/images/handcraft.jpg";
import food from "assets/images/food.jpg";
import DataproductBodyCell from "examples/customers/Datacustomer/DatacustomerBodyCell";

export default function CustomerTable(handleEdit) {
  // Edit button handler
  const handleEditClick = (id) => {
    console.log(`Editing customer with ID: ${id}`);
    handleEdit(id); // Call the passed handleEdit function
  };

  const handleDeleteClick = (id) => {
    setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
  };

  // View product button handler
  const handleViewProduct = (product) => {
    console.log(`Viewing product:`, product);
    // Add your logic here to handle the "View Product" action
  };

  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "اسم العميل", accessor: "name", align: "center" },
    { Header: "البريد الإلكتروني", accessor: "email", align: "center" },
    {
      Header: "المنتجات",
      accessor: "products",
      align: "center",
      subColumns: [
        { Header: "رقم المنتج", accessor: "productNumber", align: "center" },
        { Header: "اسم المنتج", accessor: "productName", align: "center" },
        { Header: "صورة المنتج", accessor: "productImage", align: "center" },
      ],
    },
    { Header: "الإجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      name: "عميل 1",
      email: "customer1@example.com",
      products: [
        {
          number: 1,
          name: "زيت زيتون",
          photo: food,
        },
        {
          number: 2,
          name: "ثوب فلاحي",
          photo: clothes,
        },
      ],
    },
    {
      name: "عميل 2",
      email: "customer2@example.com",
      products: [
        {
          number: 3,
          name: "فخار",
          photo: handcraft,
        },
      ],
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
      products: (
        <MDBox>
          {row.products.map((product, idx) => (
            <MDBox
              key={idx}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              {/* Product Number */}
              <DataproductBodyCell align="center" style={{ width: "20%" }}>
                {product.number}
              </DataproductBodyCell>

              {/* Product Name */}
              <DataproductBodyCell align="center" style={{ width: "30%" }}>
                {product.name}
              </DataproductBodyCell>

              {/* Product Image */}
              <DataproductBodyCell align="center" style={{ width: "30%" }}>
                <img
                  src={product.photo}
                  alt={product.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              </DataproductBodyCell>

              {/* View Product Button */}
              <MDBox align="center" style={{ width: "20%" }}>
                <MDIconButton
                  color="primary"
                  onClick={() => handleViewProduct(product)}
                  title="عرض المنتج"
                >
                  <VisibilityIcon />
                </MDIconButton>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      ),
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

  return { columns, rows };
}
