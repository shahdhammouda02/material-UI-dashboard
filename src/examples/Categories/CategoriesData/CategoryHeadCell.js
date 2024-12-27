import React from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

function CategoryHeadCell({ width, children, align }) {
  return (
    <th
      style={{
        textAlign: align,
        padding: "12px 16px",

        // color: "black",
      }}
    >
      <MDTypography variant="h6" color="#344767" fontWeight="bold">
        {children}
      </MDTypography>
    </th>
  );
}

// الإعدادات الافتراضية للخصائص
CategoryHeadCell.defaultProps = {
  align: "left",
};

// التحقق من أنواع الخصائص
CategoryHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default CategoryHeadCell;
