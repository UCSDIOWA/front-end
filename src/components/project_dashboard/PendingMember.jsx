import React, { Component } from "react";
import { Grid, Segment, Button, Icon } from "semantic-ui-react";

export default class PendingMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
    console.log(props);
    console.log(this.state);
  }
  handleAccept(propsHandleAccept) {
    //alert("Member Accepted! Please be sure to go back and hit Submit!");
    propsHandleAccept(this.state.name);
  }
  handleReject(propsHandleReject) {
    //alert("Member Rejected! Please be sure to go back and hit Submit!");
    propsHandleReject(this.state.name);
  }
  render() {
    return (
      <Segment vertical>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>{this.props.name}</Grid.Column>
            <Grid.Column width={2}>
              <Button
                color="green"
                size="mini"
                onClick={() => this.handleAccept(this.props.handleAccept)}
              >
                Accept Member
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="youtube"
                size="mini"
                onClick={() => this.handleReject(this.props.handleReject)}
              >
                Reject Member
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
