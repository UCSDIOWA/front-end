import React, { Component } from "react";
import { Image, Menu, Message, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../resources/logo.png";
import NotificationsContainer from "./NotificationsContainer";
import NavBarDropDownMenu from "./NavBarDropDownMenu";
import { navConsts } from "../../constants";
import "../../css/App.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log("Logging out");
    this.props.onUserSessionUpdate(null, false);
  }
  render() {
    const {
      PROFILE,
    } = navConsts;
 
    return (
      <Menu color="blue" inverted borderless size="large">
        
        <Menu.Menu position="left">
          <Menu.Item>
            <Link to={"/"}>
              <Image size="mini" src={Logo} />
            </Link>
          </Menu.Item>
        </Menu.Menu>
        
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <Segment inverted color="blue">Welcome back,  {this.props.name} </Segment>
          </Menu.Item>
          
          <Menu.Item position="right">
            <Link to={"/" + PROFILE}>
              <Image size="mini" circular src={this.props.image} />
            </Link>
          </Menu.Item>

          <Menu.Item position="right">
            <NotificationsContainer/>
          </Menu.Item>

          <NavBarDropDownMenu onLogout={this.handleLogout} />
        </Menu.Menu>
      </Menu>
    );
  }
}
