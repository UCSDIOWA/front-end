import React, { Component } from "react";
import { Popup, Button, Message } from "semantic-ui-react";
import {getProjectListings} from "../../server/api";

export default class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {notifications: []};
  }

  // update states upon mounting
  componentDidMount() {
    //make rest call to backend
    let notifications = getProjectListings();
    // map a key to each listing and a description for search display
  }

  render() {
    return (
      <Popup
        trigger={<Button color='black' icon='bell' />}
        content={<Message> Notifications TODO</Message>}
        on='click'
        position='bottom left'
      />
    );
  }
}