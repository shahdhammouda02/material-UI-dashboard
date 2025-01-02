import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function CoverLayout({ image, children }) {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "20vh", // Increased height for better background visibility
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: "-1",
          top: "-150",
        }}
      />
      <Box sx={{ width: "100%", margin: "auto", paddingTop: "40px" }}>
        {" "}
        {/* Adjusted padding */}
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ textAlign: "center", padding: "20px", backgroundColor: "#f1f1f1", marginTop: "auto" }}
      ></Box>
    </Box>
  );
}

CoverLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
