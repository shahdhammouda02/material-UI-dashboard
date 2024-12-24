import React from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";

function DatacustomerHeadCell({ children, align }) {
  return (
    <th style={{ textAlign: align, padding: "12px 16px", backgroundColor: "#f5f5f5" }}>
      <MDTypography variant="h6" color="text" fontWeight="medium">
        {children}
      </MDTypography>
    </th>
  );
}

DatacustomerHeadCell.defaultProps = {
  align: "left",
};

DatacustomerHeadCell.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default DatacustomerHeadCell;
