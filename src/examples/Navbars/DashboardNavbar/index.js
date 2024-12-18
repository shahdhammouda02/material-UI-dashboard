import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Breadcrumbs from "examples/Breadcrumbs";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

import routes from "../../../routes";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();
  const currentPath = location?.pathname || "/"; // مسار افتراضي في حال كان pathname غير معرّف

  // Helper function to find the name of the current page
  const findPageName = (path, routes) => {
    for (const route of routes) {
      // التأكد من أن المسار الرئيسي يتطابق
      if (route.route === path) {
        return route.name;
      }

      // إذا كان هناك collapse، فابحث في المسارات الفرعية
      if (route.collapse) {
        for (const subRoute of route.collapse) {
          if (subRoute.route === path) {
            return subRoute.name;
          }
        }
      }
    }
    return "غير معروف"; // في حال لم يتم العثور على مسار
  };

  const pageName = findPageName(currentPath, routes);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={pageName} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="ابحث هنا" />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/sign-in">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon>account_circle</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={() => setMiniSidenav(dispatch, !miniSidenav)}
              >
                <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={() => setOpenConfigurator(dispatch, !openConfigurator)}
              >
                <Icon>settings</Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
