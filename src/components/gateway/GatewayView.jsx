import React, { Component } from "react";

import { Button, Segment, Popup } from "semantic-ui-react";
import { navConsts } from "../../constants";
import { Link } from "react-router-dom";
import GatewayProjectTable from "./GatewayProjectTable";
import ProjectInvitesPopup from "./ProjectInvitesPopup";
import { inviteUser } from "../../server/api";
import ProjectInvitesTileEvent from "./ProjectInvitesTileEvent";

export default class GatewayView extends Component {
  //TODO add backend call to grab invites array
  constructor(props) {
    super(props);
    this.state = { invites: ["testproject", "testproject2"], projInvites: [] };

    this.populateInvitesTable = this.populateInvitesTable.bind(this);
    this.handleAcceptInvite = this.handleAcceptInvite.bind(this);
    this.handleRejectInvite = this.handleRejectInvite.bind(this);
  }

  handleAcceptInvite(projName, projID) {
    //TODO handle sending backend call to accept invite
    var list = [];
    for (var i = 0; i < this.state.projInvites.length; i++) {
      if (this.state.projInvites[i].key != projName) {
        list.push(this.state.projInvites[i]);
      }
    }
    this.setState({ projInvites: list });
  }

  handleRejectInvite(projName, projID) {
    //TODO handle sending backend call to accept invite
    var list = [];
    for (var i = 0; i < this.state.projInvites.length; i++) {
      if (this.state.projInvites[i].key != projName) {
        list.push(this.state.projInvites[i]);
      }
    }
    this.setState({ projInvites: list });
  }

  populateInvitesTable() {
    var list = [];
    for (var i = 0; i < this.state.invites.length; i++) {
      list.push(
        <ProjectInvitesTileEvent
          key={this.state.invites[i]}
          projectName={this.state.invites[i]}
          handleAcceptFunc={this.handleAcceptInvite}
          handleRejectFunc={this.handleRejectInvite}
        />
      );
    }
    this.setState({ projInvites: list });
  }

  componentDidMount() {
    this.populateInvitesTable();
  }

  render() {
    const { CREATE_PROJECT, DASHBOARD, PROJECT_LISTINGS } = navConsts;
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
        <Popup
          on="click"
          trigger={
            <Button id="search_project" color="green" size="huge">
              Project Invites
            </Button>
          }
          content={
            <ProjectInvitesPopup invitesArray={this.state.projInvites} />
          }
          position="bottom center"
          basic
        />
        <hr />
        <h1>My Projects</h1>
        <GatewayProjectTable />
      </div>
    );
  }
}
