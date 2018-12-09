import React, { Component } from "react";

import { Button, Segment, Header, Grid } from "semantic-ui-react";

export default class ProjectInvitesPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment textAlign="center">
        <Header as="h2">Projects:</Header>
        {this.props.invitesArray.length === 0 ? (
          <Segment className="profile-columns3">No Project Invites</Segment>
        ) : (
          this.props.invitesArray
        )}
      </Segment>
    );
  }
}
