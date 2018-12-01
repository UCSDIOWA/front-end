import React, { Component } from "react";

import { Button, Segment } from "semantic-ui-react";
import { navConsts } from "../../constants";
import { Link } from "react-router-dom";
import GatewayProjectTable from "./GatewayProjectTable";

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
