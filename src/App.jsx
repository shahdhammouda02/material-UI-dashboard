import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import themeRTL from "assets/theme/theme-rtl";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

import routes from "routes";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "layouts/dashboard";
import ZaytonaLogo from "assets/images/Artboard 1 copy.png";

const App = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, layout, openConfigurator, sidenavColor, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for RTL support
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Toggle sidenav on hover
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Toggle configurator panel
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Set body direction to RTL
  useEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Generate routes
  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) =>
      route.collapse
        ? route.collapse.map((subRoute) => (
            <Route exact path={subRoute.route} element={subRoute.component} key={subRoute.key} />
          ))
        : route.route && (
            <Route exact path={route.route} element={route.component} key={route.key} />
          )
    );

  // Floating configurator button
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={ZaytonaLogo}
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
