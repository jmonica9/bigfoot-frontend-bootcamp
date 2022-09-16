import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SightingLinks(props) {
  const listData = props.sightingData.map((data, i) => (
    <Item>
      <Link to={`/sightings/${data.id}`} key={data.id}>
        Report {i + 1}
      </Link>
    </Item>
  ));

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {props.sightingData && listData}
      </Stack>
      <br></br>
    </div>
  );
}

export default SightingLinks;
