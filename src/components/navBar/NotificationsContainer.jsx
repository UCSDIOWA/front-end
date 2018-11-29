import React, { Component } from "react";
import { Popup, Button, List, Segment } from "semantic-ui-react";
import { getNotifications } from "../../server/api";
import Notification from "./Notification";
import UserSession from "../../server/UserSession";
import { Redirect } from "react-router-dom";
import { navConsts } from "../../constants";

export default class NotificationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {notifications: [], isOpen: false, redirect: false};
    this.handleViewNotification = this.handleViewNotification.bind(this);
  }

  // update states upon mounting
  componentDidMount() {
    //make rest call to backend to get notifications
    let notifications = getNotifications(UserSession.getEmail);
    this.setState({notifications: notifications});
    console.log("State: " + this.state.notifications);
  }

  handleViewNotification(index) {
    console.log("Removing a notification");
    // filter out index of array while waiting to update state, can do with callback
    this.setState({
      notifications: this.state.notifications.filter((_, i) => i !== index),
      redirect: true
    });
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const {LOGIN} = navConsts

    const notificationsList = this.state.notifications.map(
      (notification, index) => (
        <Notification 
          key={index} 
          onClick={this.handleClose} 
          content={notification} 
          onViewNotification={this.handleViewNotification} 
          index={index}
        />
    ))

    return (
      <div>
      <Popup
        trigger={<Button color='black' icon='bell' />}
        content={<Segment.Group style={{width:'40vh'}}>{notificationsList}</Segment.Group>}
        open={this.state.isOpen}
        on='click'
        onOpen={this.handleOpen}
        position='bottom left'
      />
      {this.state.redirect && <Redirect to={LOGIN}/> }
      </div>
    );
    
  }
}