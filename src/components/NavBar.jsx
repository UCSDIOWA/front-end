import React from "react";
import { Dropdown, Image, Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../resources/logo.png";
import { navConsts } from "../constants";

const { GATEWAY, SIGNUP, PROFILE, CREATE_PROJECT, SEARCH_PROJECT } = navConsts;

const NavBar = () => (
  <Menu fixed="top" inverted borderless size="large">
    <Menu.Menu position="left">
      <Menu.Item>
        <Link to={"/"}>
          <Image size="mini" src={Logo} />
        </Link>
      </Menu.Item>
    </Menu.Menu>
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
          <Link to={"/"} style={{ color: "black" }}>
            Logout
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
);

export default NavBar;
