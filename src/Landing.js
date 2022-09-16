import React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Button
        variant="contained"
        aria-label="outlined primary button group"
        onClick={(e) => navigate(1)}
      >
        Go FORWARD
      </Button> */}
      <Box>
        <ThemeProvider theme={theme}>
          <Typography variant="h3">Welcome to Big Foot Sightings</Typography>
        </ThemeProvider>
        <div>
          <img
            src="https://www.mtoutlaw.com/wp-content/uploads/2020/06/searchForBigfoot_bkgd.jpg"
            alt="bigfoot"
            style={{
              maxWidth: "60%",
              maxHeight: "60%",
              objectFit: "cover",
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default Landing;
