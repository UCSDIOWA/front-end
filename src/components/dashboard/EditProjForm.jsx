import React, { Component } from "react";
import {
  Segment,
  Button,
  Form,
  Grid,
  Modal,
  Header,
  Icon
} from "semantic-ui-react";

export default class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Deadline: null,
      Members: ["gary", "garee", "garcon", "gariella"],
      MembersViewer: [],
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
    this.populateMembers = this.populateMembers.bind(this);
    this.populatePendingMembers = this.populatePendingMembers.bind(this);
  }

  populateMembers() {
    this.state.MembersViewer = [];
    for (var i = 0; i < this.state.Members.length; i++) {
      this.state.MembersViewer.push(
        <Segment vertical>{this.state.Members[i]}</Segment>
      );
    }
  }
  populatePendingMembers() {
    this.state.pendingMembersViewer = [];
    for (var i = 0; i < this.state.pendingMembers.length; i++) {
      this.state.pendingMembersViewer.push(
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
  closeform() {}

  render() {
    this.populateMembers();
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Project Name"
            onChange={e => this.setState({ Name: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Deadline</label>
          <input
            placeholder="Deadline"
            onChange={e => this.setState({ Deadline: e.target.value })}
          />
        </Form.Field>
        <Segment>
          <Header>Current Members</Header>
          {this.state.MembersViewer}
        </Segment>
        <Form.Field>
          <Modal
            trigger={
              <Button color="green" onClick={this.props.closeform}>
                Member Requests
              </Button>
            }
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
        </Form.Field>
        <Form.Field>
          <Button negative>Leave Group</Button>
        </Form.Field>
      </Form>
    );
  }
}
