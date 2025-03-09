import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers, deleteCustomer } from "../../../Store/Slices/customerSlice/customerAction";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CustomerTable = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customers);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Fetch customers on component mount
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    dispatch(deleteCustomer(id));
  };

  const columns = [
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "اسم العميل", accessor: "name", align: "center" },
    { Header: "الجنس", accessor: "gender", align: "center" },
    { Header: "رقم الجوال", accessor: "phone", align: "center" },
    { Header: "البريد الإلكتروني", accessor: "email", align: "center" },
    { Header: "تاريخ الميلاد", accessor: "birthdate", align: "center" },
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
  ];

  const rows = useMemo(() => {
    return customers?.map((customer) => ({
      id: customer.id,
      ...customer,
      products: {
        productCount: Array.isArray(customer.products) ? customer.products.length : 0, // ✅ التحقق من أن المنتجات مصفوفة
        viewProducts: (
          <MDIconButton
            color="primary"
            title="عرض المنتجات"
            onClick={() => {
              setSelectedProducts(customer.products || []); // ✅ إذا كانت المنتجات غير موجودة، نمرر مصفوفة فارغة
              setIsProductModalOpen(true);
            }}
          >
            <VisibilityIcon />
          </MDIconButton>
        ),
      },
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="success" onClick={() => handleEdit(customer.id)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error" onClick={() => handleDeleteClick(customer.id)}>
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [customers]);

  return { columns, rows, selectedProducts, isProductModalOpen, setIsProductModalOpen };
};

export default CustomerTable;
