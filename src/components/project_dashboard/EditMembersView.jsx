import React, { Component } from "react";
import { Icon, Button, Popup, Grid } from "semantic-ui-react";

export default class MembersRequestsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingMembers: [
        "so",
        "wake",
        "up",
        "the",
        "members",
        "of",
        "my",
        "nation"
      ],
      pendingMembersView: []
    };
    
  }
  populatePendingMembers() {
    this.state.pendingMembersViewer = [];
    for (var i = 0; i < this.state.pendingMembers.length; i++) {
      this.state.MembersViewer.push(
        <Grid>
          <Grid.Row>
            <Segment vertical>{this.state.Members[i]}</Segment>
            <Button color="red">Reject</Button>
            <Button color="green">Accept</Button>
          </Grid.Row>
        </Grid>
      );
    }
  }

  render() {
    return (
      <Modal
        trigger={<Button color="green">Member Requests</Button>}
        basic
        size="small"
      >
        <Header icon="address card" content="Member Requests" />
        <Modal.Content>{this.state.pendingMembersView}</Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="linkedin" inverted>
            <Icon name="checkmark" /> Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
