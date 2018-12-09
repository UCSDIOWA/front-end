import React, { Component } from "react";

import { Button, Segment, Popup } from "semantic-ui-react";
import { navConsts } from "../../constants";
import { Link } from "react-router-dom";
import GatewayProjectTable from "./GatewayProjectTable";
import ProjectInvitesPopup from "./ProjectInvitesPopup";
import {
  acceptProjectInvite,
  rejectProjectInvite,
  getProjectInvites
} from "../../server/api";
import ProjectInvitesTileEvent from "./ProjectInvitesTileEvent";
import UserSession from "../../server/UserSession";

export default class GatewayView extends Component {
  //TODO add backend call to grab invites array
  constructor(props) {
    super(props);
    this.state = {
      invites: ["testproject", "testproject2"],
      projInvites: [],
      email: UserSession.getEmail()
    };

    this.populateInvitesTable = this.populateInvitesTable.bind(this);
    this.handleAcceptInvite = this.handleAcceptInvite.bind(this);
    this.handleRejectInvite = this.handleRejectInvite.bind(this);
  }

  handleAcceptInvite(projName, projID) {
    //TODO handle sending backend call to accept invite
    const acceptInvitePromise = acceptProjectInvite(
      UserSession.getEmail(),
      projID
    );
    acceptInvitePromise
      .then(response => {
        console.log("accept invite response: ");
        console.log(response);

        if (!response.success) {
          alert("Error accepting invite");
        }
      })
      .then(projectInfo => {
        this.populateInvitesTable();
      });
  }

  handleRejectInvite(projName, projID) {
    //TODO handle sending backend call to accept invite
    const rejectInvitePromise = rejectProjectInvite(this.state.email, projID);
    rejectInvitePromise
      .then(response => {
        console.log("reject invite response: ");
        console.log(response);

        if (!response.success) {
          alert("Error rejecting invite");
        }
      })
      .then(projectInfo => {
        this.populateInvitesTable();
      });
  }

  populateInvitesTable() {
    const getInvitesPromise = getProjectInvites(this.state.email);

    getInvitesPromise
      .then(response => {
        console.log("get invites response: ");
        console.log(response);
        if (response === undefined) {
          return;
        }

        if (!response.success) {
          alert("getting invites");
        }
        return response;
      })
      .then(invites => {
        if (invites === undefined) {
          return;
        }
        if (invites.invitations === undefined) {
          this.setState({ projInvites: [] });
          return;
        }
        var list = [];
        for (
          var i = 0;
          invites !== undefined && i < invites.invitations.length;
          i++
        ) {
          list.push(
            <ProjectInvitesTileEvent
              key={invites.invitations[i]}
              inviteText={invites.invitations[i]}
              projID={invites.xid[i]}
              handleAcceptFunc={this.handleAcceptInvite}
              handleRejectFunc={this.handleRejectInvite}
            />
          );
        }
        this.setState({ projInvites: list });
      });
  }

  componentDidMount() {
    this.populateInvitesTable();
  }

  render() {
    const { CREATE_PROJECT, PROJECT_LISTINGS } = navConsts;
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
