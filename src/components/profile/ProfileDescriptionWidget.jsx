import React, { Component } from "react";
import { Segment, Grid, Header } from "semantic-ui-react";

export default class ProfileDescriptionWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Segment classname="profile-columns3">
            <Header>About Me</Header>
            <p>{this.props.profileDescription}</p>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}
