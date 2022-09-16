import React from "react";
import logo from "./logo.png";
import "./App.css";
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListSightings from "./ListSightings";
import SingleSighting from "./SingleSighting";
import NewSighting from "./NewSighting";
import Landing from "./Landing";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createSvgIcon } from "@mui/material/utils";

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);
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

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/">
                <Button
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  {" "}
                  <HomeIcon></HomeIcon>
                </Button>
              </Link>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Link to="/sightings" style={{ textDecoration: "none" }}>
                  <Button> Sightings</Button>{" "}
                </Link>
                <Link to="/new" style={{ textDecoration: "none" }}>
                  <Button> Add New Sighting</Button>{" "}
                </Link>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </Box>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">
            Sequelize, React, Express, Node.js
          </Typography>
        </ThemeProvider>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="sightings" element={<ListSightings />} />
          {/*nested routes*/}
          <Route path="sightings/:sightingIndex" element={<SingleSighting />} />
          <Route path="/new" element={<NewSighting />} />
          <Route path="*" element={"nothing hereee!"} />
        </Routes>
      </div>
    );
  }
}

export default App;
