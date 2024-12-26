import React, { useState } from "react";
import MDBox from "components/MDBox"; // المسار الصحيح للمكون
import MDIconButton from "@mui/material/IconButton"; // أيقونات Material UI
import EditIcon from "@mui/icons-material/Edit"; // أيقونة التعديل
import DeleteIcon from "@mui/icons-material/Delete"; // أيقونة الحذف

export default function DataTable(handleEdit) {
  const [columns] = useState([
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "الفئة", accessor: "Category", align: "center" },
    { Header: "الوصف", accessor: "text", align: "center" },
    { Header: "الفئة الاساسية", accessor: "mainCategory", align: "center" },
    { Header: "الإجراءات", accessor: "Actions", align: "center" },
  ]);

  const handleEditClick = (id) => {
    console.log(`Editing subcategory with ID: ${id}`);
    handleEdit(id); // Call the passed handleEdit function
  };

  const handleDeleteClick = (index) => {
    setRows((prevRows) => prevRows.filter((_, idx) => idx !== index));
    console.log(`Deleted category at index: ${index + 1}`);
  };

  const [rows, setRows] = useState([
    {
      Category: "ملابس نسائية",
      text: "ملابس وأزياء متنوعة",
      mainCategory: "ملابس واكسسوارات",
    },
    {
      Category: "أحذية",
      text: "أحذية رياضية وكلاسيكية",
      mainCategory: "ملابس واكسسوارات",
    },
    {
      Category: "فخار",
      text: "تراث فلسطيني",
      mainCategory: "حرف يدوية",
    },
  ]);

  // إضافة الإجراءات بعد توليد البيانات
  const updatedRows = rows.map((row, index) => ({
    id: index + 1,
    ...row,
    Actions: (
      <MDBox display="flex" justifyContent="center" alignItems="center">
        <MDIconButton color="success" onClick={() => handleEditClick(index + 1)}>
          <EditIcon />
        </MDIconButton>
        <MDBox mx={1} />
        <MDIconButton color="error" onClick={() => handleDeleteClick(index)}>
          <DeleteIcon />
        </MDIconButton>
      </MDBox>
    ),
  }));

  return {
    columns,
    rows: updatedRows,
  };
}
