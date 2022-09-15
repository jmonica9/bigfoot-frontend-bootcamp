import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListSightings from "./ListSightings";
import SingleSighting from "./SingleSighting";
import NewSighting from "./NewSighting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="sightings" element={<ListSightings />} />
      {/*nested routes*/}
      <Route path="sightings/:sightingIndex" element={<SingleSighting />} />
      <Route path="/new" element={<NewSighting />} />
      <Route path="*" element={"nothing hereee!"} />
    </Routes>
  </BrowserRouter>
);
