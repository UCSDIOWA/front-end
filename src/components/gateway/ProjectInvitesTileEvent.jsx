import React, { Component } from "react";

import { Button, Segment, Header, Grid } from "semantic-ui-react";

export default class ProjectInvitesTileEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { invitesArray: [] };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleAccept() {
    this.props.handleAcceptFunc(this.props.projectName, this.props.projID);
  }

  handleReject() {
    this.props.handleRejectFunc(this.props.projectName, this.props.projID);
  }

  render() {
    return (
      <Segment className="profile-columns3">
        <Grid columns={15} textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={9}>{this.props.projectName}</Grid.Column>
            <Grid.Column width={3}>
              <Button color="green" size="mini" onClick={this.handleAccept}>
                Accept Invite
              </Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button color="youtube" size="mini" onClick={this.handleReject}>
                Reject Invite
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
