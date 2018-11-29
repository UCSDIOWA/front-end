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
    //make rest call to backend to get notifications
    let notifications = getProjectListings();
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