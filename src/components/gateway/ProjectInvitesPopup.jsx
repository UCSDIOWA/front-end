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
        {this.props.invitesArray}
      </Segment>
    );
  }
}
