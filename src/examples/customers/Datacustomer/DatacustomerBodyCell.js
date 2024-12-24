import React from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

function DatacustomerBodyCell({ children, align }) {
  return (
    <td style={{ textAlign: align, padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
      <MDTypography variant="body2" color="text">
        {children}
      </MDTypography>
    </td>
  );
}

DatacustomerBodyCell.defaultProps = {
  align: "left",
};

DatacustomerBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default DatacustomerBodyCell;
