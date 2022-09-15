import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function ListSightings() {
  const [sightingData, setSightingData] = useState();
  const [inputIndex, setInputIndex] = useState("");

  useEffect(() => {
    const listSightings = async () => {
      try {
        const data = await axios.get("http://localhost:3001/sightings");
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
      <button
        onClick={(e) => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={(e) => {
          navigate("/new");
        }}
      >
        Add new sighting
      </button>
      <br></br>
      <input
        type="text"
        value={inputIndex}
        onChange={(e) => {
          setInputIndex(e.target.value);
        }}
        placeholder="type index here"
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/sightings/${inputIndex}`);
        }}
      >
        Find Sighting
      </button>

      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          {sightingData && sightingData.length > 0
            ? sightingData.map((data) => (
                <Link
                  style={{ display: "inline", margin: "1rem 0" }}
                  to={`/sightings/${data.id}`}
                  key={data.id}
                >
                  Report {data.id} <br></br>
                </Link>
              ))
            : "wait for links"}
        </nav>

        <Outlet />
      </div>
      <div>
        <ul>
          {sightingData && sightingData.length > 0
            ? sightingData.map((item, i) => (
                <li key={i}>
                  {item.date} in {item.location}: {item.notes}
                </li>
              ))
            : "not showing yet"}
        </ul>
      </div>
    </div>
  );
}
