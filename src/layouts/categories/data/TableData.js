import React, { useState, useMemo } from "react";
import CategoryForm from "./AddCategory"; // Assuming you have a form for adding categories
import MDBox from "components/MDBox"; // Correct path for custom component
import MDIconButton from "@mui/material/IconButton"; // Material UI IconButton
import EditIcon from "@mui/icons-material/Edit"; // Material UI EditIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Material UI DeleteIcon

export default function TableData() {
  const [columns, setColumns] = useState([
    { Header: "الرقم التعريفي", accessor: "id", align: "left" },
    { Header: "الفئة الاساسية", accessor: "categoryName", align: "left" },
    { Header: "الصنف", accessor: "description", align: "center" },
    { Header: "الاجراءات", accessor: "actions", align: "center" },
  ]);

  const [initialRows, setInitialRows] = useState([
    {
      categoryName: "المنتجات الغذائية",
      description:
        "تتميز المنتجات الغذائية الفلسطينية بطعمها الأصيل المستمد من تراثها العريق ومناخها المتوسط",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      categoryName: "الملابس والاكسسوارات",
      description:
        "الملابس الفلسطينية، تراثنا الأصيل، تحكي قصصنا وتزين حياتنا بتطريزاتها اليدوية الفريدة",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      categoryName: "الحرف اليدوية",
      description:
        "كل قطعة حرفية هي قصة تحكيها الأيدي الماهرة، فهي تعكس تراث الشعب وتبرز إبداع الصانع.",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    {
      categoryName: "الكتب والمطبوعات",
      description: "تعتبر نافذة على العلوم والمعارف، وتشكل ركيزة أساسية للتراث الثقافي الإنساني",
      actions: (
        <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDIconButton color="primary">
            <EditIcon />
          </MDIconButton>
          <MDBox mx={1} />
          <MDIconButton color="error">
            <DeleteIcon />
          </MDIconButton>
        </MDBox>
      ),
    },
    // Add more categories as needed...
  ]);

  const rows = useMemo(() => {
    return initialRows.map((row, index) => ({
      id: index + 1, // Assign sequential ID
      ...row,
    }));
  }, [initialRows]);

  return {
    columns, // Ensure columns is correctly set here
    rows,
    // Ensure rows is correctly set here
    // other states and functions
  };
}
