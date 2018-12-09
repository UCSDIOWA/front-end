import React, { Component } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import { navConsts } from "../../constants";

export default class MembersView extends Component {
  constructor(props) {
    super(props);
  }
  handleRemoveMember(name) {
    this.props.handleRemove(name);
  }
  handleTransferLeadership(name) {
    this.props.handleTransferLeadership(name);
  }
  render() {
    return (
      <Segment vertical>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>{this.props.name}</Grid.Column>
            <Grid.Column width={2}>
              <Button
                color="red"
                size="mini"
                onClick={() => this.handleRemoveMember(this.props.name)}
              >
                Remove Member
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="facebook"
                size="mini"
                onClick={() => this.handleTransferLeadership(this.props.name)}
              >
                Make Leader
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
