import React, { Component } from "react";
import { Dropdown, Image, Menu, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../../resources/logo.png";
import { navConsts } from "../../constants";

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
    const { GATEWAY, PROFILE } = navConsts;
    return (
      <Menu fixed="top" inverted borderless size="large">
        <Menu.Menu position="left">
          <Menu.Item>
            <Link to={"/"}>
              <Image size="mini" src={Logo} />
            </Link>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <Message color="black">Welcome back, {this.props.name} </Message>
          </Menu.Item>
          <Menu.Item position="right" icon="meh outline" />

          <Dropdown
            item
            simple
            icon="bars"
            direction="left"
            closeOnChange
            openOnFocus
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={"/" + PROFILE} style={{ color: "black" }}>
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/" + GATEWAY} style={{ color: "black" }}>
                  Home
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={"/"}
                  style={{ color: "black" }}
                  onClick={this.handleLogout}
                >
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
