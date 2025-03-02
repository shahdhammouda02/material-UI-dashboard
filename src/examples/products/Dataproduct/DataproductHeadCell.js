import React from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

function DataproductHeadCell({ width, children, align }) {
  return (
    <th
      style={{
        textAlign: "center !important",
        padding: "12px 16px",
        width: width || "auto",
      }}
    >
      <MDTypography variant="h6" color="#344767" fontWeight="bold">
        {children}
      </MDTypography>
    </th>
  );
}

// الإعدادات الافتراضية للخصائص
DataproductHeadCell.defaultProps = {
  width: "auto",
  align: "left",
};

// التحقق من أنواع الخصائص
DataproductHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default DataproductHeadCell;
