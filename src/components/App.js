import React, { Component } from "react";
import "../css/App.css";
import Main from "./routing/Main";
import NavBar from "./navBar/NavBar";

import UserSession from "../server/UserSession";
import Announcement from "./Announcement";
import { List } from "semantic-ui-react";

class App extends Component {
  /*
   * States: name: name for profile welcom
             isAuthenticated: verify if authenticated login
             announcements: list of announcements to display
   */
  render() {
    return <Main />;
  }
}
/*
  constructor(props) {
    super(props);
    // handle mounting in case of refresh
    const priorAuthenticate = UserSession.getAuthenticated() || false;
    const priorEmail = UserSession.getEmail() || null;
    UserSession.setEmail(priorEmail);
    UserSession.setAuthenticated(priorAuthenticate);
    this.state = {
      name: "",
      isAuthenticated: priorAuthenticate,
      announcements: []
    };
    this.handleUserSessionUpdate = this.handleUserSessionUpdate.bind(this);
    this.handleAnnoucementCreate = this.handleAnnoucementCreate.bind(this);
    this.handleAnnouncementDismiss = this.handleAnnouncementDismiss.bind(this);
  }

  handleUserSessionUpdate(email, isAuthenticated) {
    UserSession.setEmail(email);
    UserSession.setAuthenticated(isAuthenticated);
    console.log("Updating UserSession in App");
    const name = email; // TODO fix to actual name
    this.setState({ name: name, isAuthenticated: isAuthenticated });
  }

  handleAnnouncementDismiss(index) {
    // remove element based of index
    console.log("Removing an announcement");

    // filter out index of array while waiting to update state, can do with callback
    this.setState({
      name: this.state.name,
      isAuthenticated: this.state.isAuthenticated,
      announcements: this.state.announcements.filter((_, i) => i !== index)
    });
  }

  handleAnnoucementCreate(content) {
    console.log("Creating a new announcement");
    // insert into announcements
    this.setState({
      name: this.state.name,
      isAuthenticated: this.state.isAuthenticated,
      announcements: [...this.state.announcements, content]
    });
  }

  render() {
    console.log("Rerendering App");
    console.log(this.state.announcements);
    // list of announcement referenced by a key of themselves
    const announcementsItems = this.state.announcements.map(
      (announcement, index) => (
        <List.Item key={index}>
          {
            <Announcement
              onAnnouncementDismiss={this.handleAnnouncementDismiss}
              content={announcement}
              index={index}
            />
          }
        </List.Item>
      )
    );

    return (
      <div className="App">
        <div className="App">
          <List>{announcementsItems}</List>
        </div>
        {this.state.isAuthenticated && (
          <NavBar
            onUserSessionUpdate={this.handleUserSessionUpdate}
            name={this.state.name}
          />
        )}
        <Main
          onUserSessionUpdate={this.handleUserSessionUpdate}
          onAnnouncement={this.handleAnnoucementCreate}
          isAuthenticated={this.state.isAuthenticated}
        />
      </div>
    );
  } */

export default App;
