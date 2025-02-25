import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// Custom Components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
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
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const navigate = useNavigate();
  const collapseName = location.pathname.replace("/", "");

  const IsSignIn = location.pathname === "/";

  // State to manage open/close of collapsible categories
  const [openCollapse, setOpenCollapse] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(location.pathname); // Track selected route

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
    textColor = "dark";
  } else if (whiteSidenav && !darkMode) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  } else if (darkMode) {
    textColor = "white";
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  // Handle route selection
  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  // Check if the logged-in vendor is the main vendor
  const isMainVendor = localStorage.getItem("email") === "admin@vendor.com";

  // Render navigation routes
  const renderRoutes = (routes) =>
    routes
      .filter((route) => {
        // Skip rendering if the route is only for the main vendor and the logged-in vendor is not the main vendor
        if (route.visibleToMainVendor && !isMainVendor) {
          return false;
        }
        return true;
      })
      .map((route) => {
        const isSelected = selectedRoute === route.route;
        const routeColor = isSelected ? "green" : "transparent";

        if (route.collapse) {
          return (
            <div key={route.key}>
              <MDBox
                display="flex"
                alignItems="center"
                onClick={() => handleCollapseToggle(route.key)}
                sx={{
                  cursor: "pointer",
                  padding: "8px 16px",
                  backgroundColor: routeColor,
                  borderRadius: "4px",
                }}
                aria-expanded={openCollapse[route.key]}
                aria-controls={`collapse-${route.key}`}
              >
                {route.icon && (
                  <Icon
                    sx={{
                      color: isSelected ? "white !important" : textColor,
                      marginRight: "8px",
                      color: "white !important",
                    }}
                  >
                    {route.icon}
                  </Icon>
                )}
                <MDTypography variant="body1" color={isSelected ? "white" : textColor} ml={2}>
                  {route.name}
                </MDTypography>
              </MDBox>
              <Collapse in={openCollapse[route.key]} timeout="auto" unmountOnExit>
                {route.collapse.map((subRoute) => (
                  <NavLink
                    to={subRoute.route}
                    key={subRoute.key}
                    style={{ textDecoration: "none" }}
                    onClick={() => handleRouteSelect(subRoute.route)}
                  >
                    <MDBox
                      display="flex"
                      alignItems="center"
                      pl={4}
                      py={1}
                      sx={{
                        backgroundColor: selectedRoute === subRoute.route ? "green" : "transparent",
                        borderRadius: "4px",
                      }}
                    >
                      {subRoute.icon && (
                        <Icon
                          sx={{
                            color:
                              selectedRoute === subRoute.route ? "white !important" : textColor,
                            marginRight: "8px",
                            color: "white !important",
                          }}
                        >
                          {subRoute.icon}
                        </Icon>
                      )}
                      <MDTypography
                        variant="body2"
                        color={selectedRoute === subRoute.route ? "white" : textColor}
                        ml={2}
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
          <NavLink
            to={route.route}
            key={route.key}
            style={{ textDecoration: "none" }}
            onClick={() => handleRouteSelect(route.route)}
          >
            <MDBox
              display="flex"
              alignItems="center"
              px={2}
              py={1}
              sx={{
                backgroundColor: isSelected ? "green" : "transparent",
                borderRadius: "4px",
              }}
            >
              {route.icon && (
                <Icon
                  sx={{
                    color: isSelected ? "white !important" : textColor,
                    marginRight: "8px",
                    color: "white !important",
                  }}
                >
                  {route.icon}
                </Icon>
              )}
              <MDTypography variant="body1" color={isSelected ? "white" : textColor} ml={2}>
                {route.name}
              </MDTypography>
            </MDBox>
          </NavLink>
        );
      });

  return (
    <>
      {!IsSignIn && (
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
          <Divider light={!darkMode && !whiteSidenav} />
          <List>{renderRoutes(routes)}</List>
        </SidenavRoot>
      )}
    </>
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
