// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, social, action, shadow }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Handle undefined info
  if (info) {
    // Convert `objectKey` to `object key`
    Object.keys(info).forEach((el) => {
      labels.push(el.replace(/([A-Z])/g, " $1").toLowerCase());
    });

    // Push the object values into the values array
    Object.values(info).forEach((el) => values.push(el));
  }

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Handle undefined social
  const renderSocial = social
    ? social.map(({ link, icon, color }) => (
        <MDBox
          key={color}
          component="a"
          href={link}
          target="_blank"
          rel="noreferrer"
          fontSize={size.lg}
          color={socialMediaColors[color].main}
          pr={1}
          pl={0.5}
          lineHeight={1}
        >
          {icon}
        </MDBox>
      ))
    : null;

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        {action && (
          <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
            <Tooltip title={action.tooltip} placement="top">
              <Icon>edit</Icon>
            </Tooltip>
          </MDTypography>
        )}
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          {renderSocial && (
            <MDBox display="flex" py={1} pr={2}>
              <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                social: &nbsp;
              </MDTypography>
              {renderSocial}
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
  social: [], // Default empty array for social
  action: null, // Default null for action
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string), // Optional info
  social: PropTypes.arrayOf(PropTypes.object), // Optional social
  action: PropTypes.shape({
    route: PropTypes.string,
    tooltip: PropTypes.string,
  }),
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
