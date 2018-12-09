import React, { Component } from "react";
import { Popup, Label, Segment, Icon, Menu } from "semantic-ui-react";
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
    this.setState({ isOpen: true, redirect: false });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const {LOGIN} = navConsts

    const notificationsList = 
    this.state.notifications.length != 0 ?
    this.state.notifications.map(
      (notification, index) => (
        <Notification 
          key={index} 
          onClick={this.handleClose} 
          content={notification} 
          onViewNotification={this.handleViewNotification} 
          index={index}
        />
    )) : (<Segment>No Notifications</Segment>);

    const notificationButton = 
    this.state.notifications.length != 0 ?
    (
      <Menu.Item >
          <Icon className="notification-bell" fitted name='bell' size='large'/>
          <Label color='red' floating >
            {this.state.notifications.length}
          </Label> 
      </Menu.Item>
    ) : (<Menu.Item>          
          <Icon className="notification-bell" fitted name='bell' size='large' /> 
        </Menu.Item>
    );

    return ( 
      <div>
      <Popup
        trigger={notificationButton}
        content={<Segment.Group style={{width:'40vh'}}>{notificationsList}</Segment.Group>}
        on='click'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        position='bottom left'
      />
      {this.state.redirect && <Redirect to={LOGIN}/> }
      </div>
    );
    
  }
}