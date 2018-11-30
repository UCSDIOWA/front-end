import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { navConsts } from "../../constants";


export default class NavBarDropDownMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { GATEWAY, PROFILE } = navConsts;
    return (
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
              onClick={this.props.onLogout}
            >
              Logout
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}