import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox"; // تأكد من صحة الاستيراد
import MDTypography from "components/MDTypography"; // تأكد من صحة الاستيراد

function Breadcrumbs({ icon, title, route, light }) {
  // تأكد من أن `route` موجودة وإذا لم تكن كذلك، قم بتعيين قيمة افتراضية
  const routes = Array.isArray(route)
    ? route.slice(0, -1)
    : route
    ? route.split("/").filter(Boolean)
    : [];

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <MDTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>
        {routes.map((el, index) => (
          <Link to={`/${el}`} key={index}>
            <MDTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el.replace("-", " ")} {/* عرض الـ name بدلاً من الـ route */}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")} {/* عرض الـ name الخاص بالعنوان */}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </MDTypography>
    </MDBox>
  );
}

Breadcrumbs.defaultProps = {
  light: false,
};

Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
