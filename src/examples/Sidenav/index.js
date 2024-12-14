import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// Custom Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Sidenav({ color, brand, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  // State to manage open/close of collapsible categories
  const [openCollapse, setOpenCollapse] = useState({});

  useEffect(() => {
    const initialCollapseState = routes.reduce((acc, route) => {
      if (route.collapse) acc[route.key] = false;
      return acc;
    }, {});
    setOpenCollapse(initialCollapseState);
  }, [routes]);

  // Toggle Collapse State
  const handleCollapseToggle = (key) => {
    setOpenCollapse((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // Determine text color based on sidenav state
  let textColor = "white";
  if (transparentSidenav) {
    textColor = "dark"; // Transparent sidenav, dark text
  } else if (whiteSidenav && !darkMode) {
    textColor = "dark"; // White sidenav with light mode, dark text
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit"; // White sidenav with dark mode, inherit text color
  } else if (darkMode) {
    textColor = "white"; // Dark mode, white text
  }

  // Close sidenav function
  const closeSidenav = () => setMiniSidenav(dispatch, true);

  // Handle window resize to adjust sidenav state
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1200;
      setMiniSidenav(dispatch, isSmallScreen);
      setTransparentSidenav(dispatch, !isSmallScreen && transparentSidenav);
      setWhiteSidenav(dispatch, !isSmallScreen && whiteSidenav);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  // Render navigation routes
  const renderRoutes = (routes) =>
    routes.map((route) => {
      if (route.collapse) {
        return (
          <div key={route.key}>
            <MDBox
              display="flex"
              alignItems="center"
              onClick={() => handleCollapseToggle(route.key)}
              sx={{ cursor: "pointer", padding: "8px 16px" }}
              aria-expanded={openCollapse[route.key]}
              aria-controls={`collapse-${route.key}`}
            >
              {route.icon && <Icon sx={{ color: "white !important" }}>{route.icon}</Icon>}
              <MDTypography variant="body1" color={textColor} ml={2} sx={{ color: textColor }}>
                {route.name}
              </MDTypography>
            </MDBox>
            <Collapse in={openCollapse[route.key]} timeout="auto" unmountOnExit>
              {route.collapse.map((subRoute) => (
                <NavLink to={subRoute.route} key={subRoute.key} style={{ textDecoration: "none" }}>
                  <MDBox display="flex" alignItems="center" pl={4} py={1}>
                    {subRoute.icon && (
                      <Icon sx={{ color: "white !important" }}>{subRoute.icon}</Icon>
                    )}
                    <MDTypography
                      variant="body2"
                      color={textColor}
                      ml={2}
                      sx={{ color: textColor }}
                    >
                      {subRoute.name}
                    </MDTypography>
                  </MDBox>
                </NavLink>
              ))}
            </Collapse>
          </div>
        );
      }

      return (
        <NavLink to={route.route} key={route.key} style={{ textDecoration: "none" }}>
          <MDBox display="flex" alignItems="center" px={2} py={1}>
            {route.icon && <Icon sx={{ color: "white !important" }}>{route.icon}</Icon>}
            <MDTypography variant="body1" color={textColor} ml={2} sx={{ color: textColor }}>
              {route.name}
            </MDTypography>
          </MDBox>
        </NavLink>
      );
    });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold", color: "white !important" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="10rem" />}
          <MDBox sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}></MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={(!darkMode && !whiteSidenav && !transparentSidenav) || (darkMode && whiteSidenav)}
      />
      <List>{renderRoutes(routes)}</List>
      <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          href="https://www.creative-tim.com/product/material-dashboard-pro-react"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          color={sidenavColor}
          fullWidth
        >
          Upgrade to PRO
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: "info",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
