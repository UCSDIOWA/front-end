import React, { Component } from "react";
import "../css/App.css";
import Main from "./Main";
import NavBar from "./NavBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Main />
      </div>
    );
  }
}

export default App;
