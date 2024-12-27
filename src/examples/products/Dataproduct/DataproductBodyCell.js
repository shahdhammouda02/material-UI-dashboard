import React from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

function DataproductBodyCell({ children, align, noBorder }) {
  return (
    <td
      style={{
        textAlign: align,
        padding: "12px 16px",
        borderBottom: noBorder ? "none" : "1px solid #ddd",
      }}
    >
      <MDTypography style={{ fontSize: "16px" }} color="text">
        {children}
      </MDTypography>
    </td>
  );
}

// الإعدادات الافتراضية للخصائص
DataproductBodyCell.defaultProps = {
  align: "left",
  noBorder: false,
};

// التحقق من أنواع الخصائص
DataproductBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
  noBorder: PropTypes.bool,
};

export default DataproductBodyCell;
