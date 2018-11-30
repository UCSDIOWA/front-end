import React, { Component } from "react";
import "../css/App.css";
import Main from "./routing/Main";
import NavBar from "./navBar/NavBar";

import UserSession from "../server/UserSession";
import SystemMessage from "./SystemMessage";
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
      systemMessages: []
    };
    this.handleUserSessionUpdate = this.handleUserSessionUpdate.bind(this);
    this.handleSystemMessageCreate = this.handleSystemMessageCreate.bind(this);
    this.handleSystemMessageDismiss = this.handleSystemMessageDismiss.bind(this);
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
      systemMessages: []
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

  handleSystemMessageDismiss(index) {
    // remove element based of index
    console.log("Removing an announcement");

    // filter out index of array while waiting to update state, can do with callback
    this.setState({
      systemMessages: this.state.systemMessages.filter((_, i) => i !== index)
    });
  }

  handleSystemMessageCreate(content) {
    console.log("Creating a new system message");
    // insert into announcements
    this.setState((prevState, curProps) => {
      return {
        name: prevState.name,
        isAuthenticated: prevState.isAuthenticated,
        systemMessages: [...prevState.systemMessages, content]
      }
    });

  }

  render() {
    console.log("Rerendering App");
    // console.log(this.state.announcements);
    // list of announcement referenced by a key of themselves
    const systemMessageItems = this.state.systemMessages.map(
      (systemMessage, index) => (
        <List.Item key={index}>
          <SystemMessage
            onMessageDismiss={this.handleSystemMessageDismiss}
            content={systemMessage}
            index={index}
          />
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
          <List >{systemMessageItems}</List>
        </div>
        <Main
          onUserSessionUpdate={this.handleUserSessionUpdate}
          onSystemMessage={this.handleSystemMessageCreate}
          isAuthenticated={this.state.isAuthenticated}
        />
      </div>
    );
  }
}

export default App;
