import React, { Component } from "react";
import "../css/App.css";
import Main from "./routing/Main";
import NavBar from "./navBar/NavBar";

import UserSession from "../server/UserSession";
import Announcement from "./Announcement";
import { List } from "semantic-ui-react";

import holderImage from "./../resources/profile_images/holder-image.jpg";

class App extends Component {
  /*
   * States: name: name for profile welcome 
             isAuthenticated: verify if authenticated login
             announcements: list of announcements to display
   */
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profileImage: "",
      isAuthenticated: false,
      announcements: []
    };
    this.handleUserSessionUpdate = this.handleUserSessionUpdate.bind(this);
    this.handleAnnoucementCreate = this.handleAnnoucementCreate.bind(this);
    this.handleAnnouncementDismiss = this.handleAnnouncementDismiss.bind(this);
  }

  componentDidMount() {
    console.log("Mounting App");
    let priorEmail = UserSession.getEmail() || null;
    let priorAuthenticate = UserSession.getAuthenticated() || false;
    let priorName = UserSession.getName() || null;
    let priorProfileImage = UserSession.getProfileImage() || null;
    UserSession.setEmail(priorEmail);
    UserSession.setName(priorName);
    UserSession.setAuthenticated(priorAuthenticate);
    UserSession.setProfileImage(priorProfileImage);
    

    this.setState({
      name: priorName,
      profileImage: priorProfileImage,
      isAuthenticated: priorAuthenticate,
      announcements: []
    });
  }

  handleUserSessionUpdate(email, isAuthenticated) {
    UserSession.setEmail(email);
    UserSession.setAuthenticated(isAuthenticated);
    console.log("Updating UserSession in App");

    const name = "TODO_NAME"; // TODO fix actual name
    const profileImage = holderImage; // TODO fix actual profile image
    UserSession.setName(name);
    UserSession.setProfileImage(profileImage);

    this.setState({ name: name, isAuthenticated: isAuthenticated, profileImage: profileImage });
  }

  handleAnnouncementDismiss(index) {
    // remove element based of index
    console.log("Removing an announcement");

    // filter out index of array while waiting to update state, can do with callback
    this.setState({
      announcements: this.state.announcements.filter((_, i) => i !== index)
    });
  }

  handleAnnoucementCreate(content) {
    console.log("Creating a new announcement");
    // insert into announcements
    this.setState((prevState, curProps) => {
      return {
        name: prevState.name,
        isAuthenticated: prevState.isAuthenticated,
        announcements: [...prevState.announcements, content]
      }
    });

  }

  render() {
    console.log("Rerendering App");
    // console.log(this.state.announcements);
    // list of announcement referenced by a key of themselves
    const announcementsItems = this.state.announcements.map(
      (announcement, index) => (
        <List.Item key={index}>
          {
            <Announcement className="Announcement"
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

        <div>
        {this.state.isAuthenticated && (
          <NavBar
            onUserSessionUpdate={this.handleUserSessionUpdate}
            name={this.state.name}
            image={this.state.profileImage}
          />
        )}
        </div>
        <div>
          <List >{announcementsItems}</List>
        </div>
        <Main
          onUserSessionUpdate={this.handleUserSessionUpdate}
          onAnnouncement={this.handleAnnoucementCreate}
          isAuthenticated={this.state.isAuthenticated}
        />
      </div>
    );
  }
}

export default App;
