import React, { Component } from "react";

import { Button, Segment } from "semantic-ui-react";
import { navConsts } from "../../constants";
import { Link } from "react-router-dom";
import GatewayProjectTable from "./GatewayProjectTable";

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
    const {
      GATEWAY,
      SIGNUP,
      PROFILE,
      CREATE_PROJECT,
      SEARCH_PROJECT,
      DASHBOARD,
      PROJECT_LISTINGS
    } = navConsts;
    return (
      <div>
        <Link to={"/" + CREATE_PROJECT}>
          <Button id="create_project" color="blue" size="huge">
            Create Project
          </Button>
        </Link>

        <Link to={"/" + PROJECT_LISTINGS}>
          <Button id="search_project" color="green" size="huge">
            Search Project
          </Button>
        </Link>
        <hr />
        <h1>My Projects</h1>
        <GatewayProjectTable totalProjs={5} />
      </div>
    );
  }
}
