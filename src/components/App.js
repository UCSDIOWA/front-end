import React, { Component } from "react";
import "../css/App.css";
import Main from "./routing/Main";
import NavBar from "./navBar/NavBar";

import UserSession from "../server/UserSession";

class App extends Component {
  constructor(props) {
    super(props);
    // handle mounting in case of refresh
    const priorAuthenticate = UserSession.getAuthenticated() || false;
    const priorEmail = UserSession.getEmail() || null;
    UserSession.setEmail(priorEmail);
    UserSession.setAuthenticated(priorAuthenticate);
    this.state = { isAuthenticated: priorAuthenticate };
    this.handleUserSessionUpdate = this.handleUserSessionUpdate.bind(this);
  }

  handleUserSessionUpdate(email, isAuthenticated) {
    UserSession.setEmail(email);
    UserSession.setAuthenticated(isAuthenticated);
    console.log("Updating UserSession in App");
    this.setState({ isAuthenticated: isAuthenticated });
  }

  render() {
    console.log("Rerendering App");
    return (
      <div className="App">
        {this.state.isAuthenticated && (
          <NavBar onUserSessionUpdate={this.handleUserSessionUpdate} />
        )}
        <Main
          onUserSessionUpdate={this.handleUserSessionUpdate}
          isAuthenticated={this.state.isAuthenticated}
        />
      </div>
    );
  }
}

export default App;
