import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox"; // المسار الصحيح للمكون
import MDIconButton from "@mui/material/IconButton"; // أيقونات Material UI
import EditIcon from "@mui/icons-material/Edit"; // أيقونة التعديل
import DeleteIcon from "@mui/icons-material/Delete"; // أيقونة الحذف
import { useNavigate } from "react-router-dom";
export default function DataTable(handleEdit) {
  const navigate = useNavigate();

  // Edit button handler
  const handleEditClick = (id) => {
    handleEdit(id); // Call the passed handleEdit function
  };

  const handleDeleteClick = (id) => {
    setInitialRows((prevRows) => prevRows.filter((_, index) => index + 1 !== id));
    console.log(`Deleted category with ID: ${id}`);
  };
  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "center" },
    { Header: "الفئة", accessor: "Category", align: "center" },
    { Header: "الوصف", accessor: "text", align: "center" },
    { Header: "الفئة الاساسية", accessor: "mainCategory", align: "center" },
    { Header: "الإجراءات", accessor: "Actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      Category: "ملابس نسائية",
      text: "ملابس وأزياء متنوعة",
      mainCategory: "ملابس واكسسوارات",
    },
    {
      Category: "مأكولات",
      text: "أكل فلسطيني مفيد واصيل",
      mainCategory: "المنتجات الغذائية",
    },
    {
      Category: "فخار",
      text: "تراث فلسطيني",
      mainCategory: "حرف يدوية",
    },
  ]);

  // إضافة الإجراءات بعد توليد البيانات

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
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
