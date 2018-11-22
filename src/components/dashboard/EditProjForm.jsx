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

export default class EditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Deadline: null,
      TeamSize: 0,
      Members: ["Darrell", "Brent", "Erica", "Ashley"],
      MembersViewer: [],
      pendingMembers: [
        "Timmy",
        "Jimmy",
        "Danny",
        "Naruto",
        "Uzumaki",
        "Senpai",
        "Gibby",
        "Drake"
      ],
      pendingMembersView: []
    };
    this.populateMembers = this.populateMembers.bind(this);
    this.populatePendingMembers = this.populatePendingMembers.bind(this);
  }

  populateMembers() {
    //var temp = [];
    for (var i = 0; i < this.state.Members.length; i++) {
      this.state.MembersViewer.push(
        <Segment vertical>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>{this.state.Members[i]}</Grid.Column>
              <Grid.Column width={2}>
                <Button color="red" size="mini">
                  Remove Member
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="facebook" size="mini">
                  Make Leader
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    //this.setState({ MembersView: temp });
  }
  populatePendingMembers() {
    for (var i = 0; i < this.state.pendingMembers.length; i++) {
      this.state.pendingMembersView.push(
        <Segment vertical>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                {this.state.pendingMembers[i]}
              </Grid.Column>
              <Grid.Column width={2}>
                <Button color="green" size="mini">
                  Accept Member
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="youtube" size="mini">
                  Reject Member
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    //this.setState({ pendingMembersView: temp });
  }

  render() {
    this.populateMembers();
    this.populatePendingMembers();
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Current Group Name"
            onChange={e => this.setState({ Name: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Deadline</label>
          <input
            placeholder="11/29/18"
            onChange={e => this.setState({ Deadline: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Team Size</label>
          <input
            placeholder="10"
            type="number"
            onChange={e => this.setState({ TeamSize: e.target.value })}
          />
        </Form.Field>
        <Segment>
          <Header>Current Members</Header>
          {this.state.MembersViewer}
        </Segment>
        <Segment.Group horizontal>
          <Segment textAlign="center">
            {" "}
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
          </Segment>
          <Segment textAlign="center">
            <Form.Field>
              <Button negative>Leave Group</Button>
            </Form.Field>
          </Segment>
        </Segment.Group>
      </Form>
    );
  }
}
