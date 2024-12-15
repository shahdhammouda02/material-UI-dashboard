import React, { useState } from "react";
import MDBox from "components/MDBox"; // المسار الصحيح للمكون
import MDIconButton from "@mui/material/IconButton"; // أيقونات Material UI
import EditIcon from "@mui/icons-material/Edit"; // أيقونة التعديل
import DeleteIcon from "@mui/icons-material/Delete"; // أيقونة الحذف

export default function DataTable() {
  const [columns, setColumns] = useState([
    { Header: "ID", accessor: "author", align: "left" },
    { Header: "الفئة", accessor: "Category", align: "center" },
    { Header: "الوصف", accessor: "text", align: "center" },
    { Header: "الفئة الاساسية", accessor: "mainCategory", align: "center" },
    { Header: "الإجراءات", accessor: "Actions", align: "center" },
  ]);

  const handleEdit = (id) => {
    alert(`تعديل العنصر ذو المعرف: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`حذف العنصر ذو المعرف: ${id}`);
  };

  // عداد لرقم ID يبدأ من 1
  let idCounter = 1;

  const [rows, setRows] = useState([
    {
      author: idCounter++, // يتم توليد ID تلقائيًا
      Category: "ملابس نسائية",
      text: "ملابس وأزياء متنوعة",
      mainCategory: "ملابس واكسسوارات",
      Actions: null, // سيتم تحديث الإجراءات لاحقًا
    },
    {
      author: idCounter++, // يتم توليد ID تلقائيًا
      Category: "أحذية",
      text: "أحذية رياضية وكلاسيكية",
      mainCategory: "ملابس واكسسوارات",
      Actions: null, // سيتم تحديث الإجراءات لاحقًا
    },
    {
      author: idCounter++, // يتم توليد ID تلقائيًا
      Category: "أحذية",
      text: "أحذية رياضية وكلاسيكية",
      mainCategory: "ملابس واكسسوارات",
      Actions: null, // سيتم تحديث الإجراءات لاحقًا
    },
  ]);

  // إضافة الإجراءات بعد توليد البيانات
  const updatedRows = rows.map((row) => ({
    ...row,
    Actions: (
      <MDBox display="flex" justifyContent="center" alignItems="center">
        <MDIconButton color="primary" onClick={() => handleEdit(row.author)}>
          <EditIcon />
        </MDIconButton>
        <MDBox mx={1} />
        <MDIconButton color="error" onClick={() => handleDelete(row.author)}>
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
