import React from "react";
import logo from "./logo.png";
import "./App.css";
import { useNavigate, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to App</p>
          <p>Click buttons below to navigate</p>
          <Link to="/sightings">Sightings</Link>
          <Link to="/new">Add New Sighting</Link>
        </header>
      </div>
    );
  }
}

export default App;
