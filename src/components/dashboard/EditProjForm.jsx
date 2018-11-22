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
    var temp = [];
    for (var i = 0; i < this.state.Members.length; i++) {
      temp.push(
        <Segment vertical>
          <Grid>
            <Grid.Row>
              <Grid.Column width={13}>{this.state.Members[i]}</Grid.Column>
              <Grid.Column>
                <Button color="red" size="mini">
                  Remove
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    this.setState({ MembersView: temp });
  }
  populatePendingMembers() {
    var temp = [];
    for (var i = 0; i < this.state.pendingMembers.length; i++) {
      temp.push(
        <Grid>
          <Grid.Row>
            <Segment vertical>{this.state.Members[i]}</Segment>
            <Button color="red">Reject</Button>
            <Button color="green">Accept</Button>
          </Grid.Row>
        </Grid>
      );
    }
    this.setState({ pendingMembersView: temp });
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
