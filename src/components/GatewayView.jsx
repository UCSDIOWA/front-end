import React, { Component } from "react";

import {
  Button,
  Icon,
  Grid,
  Header,
  Image,
  Segment,
  Form,
  Message,
  Container,
  Dropdown
} from "semantic-ui-react";
import holderImage from "../../resources/logo.png";
import logoImage from "../resources/tealogosmall.png";
import { navConsts } from "../constants";
import { Link } from "react-router-dom";


const { GATEWAY, SIGNUP, PROFILE, CREATE_PROJECT, SEARCH_PROJECT } = navConsts;

const options = [
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" }
];

export default class GatewayView extends Component {
  render() {
    return (
      <div>
        <Link to={"/" + CREATE_PROJECT}>
          <Button id="create_project" color="blue" size="huge">
            Create Project
          </Button>
        </Link>

        <Link to={"/" + SEARCH_PROJECT}>
          <Button id="search_project" color="green" size="huge">
          Search Project
          </Button>
        </Link>
            
        <hr />
        <h1>My Projects</h1>
        <Dropdown
          placeholder="My Projects"
          fluid
          search
          selection
          options={options}
        />
      </div>
    );
  }
}
