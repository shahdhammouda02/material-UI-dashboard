import React, { useState, useMemo } from "react";
import MDBox from "components/MDBox";
import MDIconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function TableData() {
  const navigate = useNavigate();

  // Edit button handler
  const handleEdit = (id) => {
    console.log(`Editing category with ID: ${id}`);
    navigate(`/UpdateCategory/${id}`);
  };

  const [columns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "left" },
    { Header: "الفئة الاساسية", accessor: "categoryName", align: "left" },
    { Header: "الصنف", accessor: "description", align: "center" },
    { Header: "الاجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows] = useState([
    {
      categoryName: "المنتجات الغذائية",
      description:
        "تتميز المنتجات الغذائية الفلسطينية بطعمها الأصيل المستمد من تراثها العريق ومناخها المتوسط",
    },
    {
      categoryName: "الملابس والاكسسوارات",
      description:
        "الملابس الفلسطينية، تراثنا الأصيل، تحكي قصصنا وتزين حياتنا بتطريزاتها اليدوية الفريدة",
    },
    {
      categoryName: "الحرف اليدوية",
      description:
        "كل قطعة حرفية هي قصة تحكيها الأيدي الماهرة، فهي تعكس تراث الشعب وتبرز إبداع الصانع.",
    },
    {
      categoryName: "الكتب والمطبوعات",
      description: "تعتبر نافذة على العلوم والمعارف، وتشكل ركيزة أساسية للتراث الثقافي الإنساني",
    },
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1,
      ...row,
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary" onClick={() => handleEdit(index + 1)}>
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    }));
  }, [initialRows]);

  return { columns, rows };
}
