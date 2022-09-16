import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import SightingLinks from "./SightingLinks";
export default function ListSightings() {
  const [sightingData, setSightingData] = useState();
  const [inputIndex, setInputIndex] = useState("");

  useEffect(() => {
    const listSightings = async () => {
      try {
        const data = await axios.get("http://localhost:3000/sightings");
        console.log(data.data);
        setSightingData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    listSightings();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {sightingData && sightingData.length > 0 ? (
        <SightingLinks sightingData={sightingData} />
      ) : (
        "wait for links"
      )}
      {/* <button
        onClick={(e) => {
          navigate("/");
        }}
      >
        Home
      </button> */}
      {/* <Button
        variant="contained"
        aria-label="outlined primary button group"
        onClick={(e) => navigate("/new")}
      >
        Add new sighting
      </Button>{" "} */}
      <br></br>
      <TextField
        id="standard-basic"
        label="Report Number"
        variant="standard"
        type="text"
        value={inputIndex}
        onChange={(e) => {
          setInputIndex(e.target.value);
        }}
        placeholder="Report Number?"
      />
      {/* <input
        type="text"
        value={inputIndex}
        onChange={(e) => {
          setInputIndex(e.target.value);
        }}
        placeholder="type index here"
      /> */}
      <Button
        type="submit"
        variant="outlined"
        aria-label="outlined primary button group"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/sightings/${inputIndex}`);
        }}
      >
        Find Sighting
      </Button>
      <div style={{ display: "flex" }}></div>
      <div>
        <ul>
          {sightingData && sightingData.length > 0
            ? sightingData.map((item, i) => (
                <Card key={i} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.date} in {item.location}
                    </Typography>
                    <Typography variant="body2">{item.notes}</Typography>
                  </CardContent>
                  {/* <CardActions> */}
                  {/* <Button size="small">G</Button> */}
                  {/* </CardActions> */}
                </Card>
              ))
            : "not showing yet"}
        </ul>
      </div>
    </div>
  );
}
