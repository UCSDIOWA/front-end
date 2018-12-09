import React, { Component } from "react";
import { Segment, Grid, Button, Checkbox, Form } from "semantic-ui-react";
import UserSession from "../../server/UserSession";
import { inviteUser } from "../../server/api";

export default class InviteUserView extends Component {
  constructor(props) {
    super(props);

    this.state = { inviteEmail: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    //todo handle backend call to invite user
    //TODO check if user already in members
    console.log(this.props.memberslist);
    for (var i = 0; i < this.props.memberslist.length; i++) {
      if (this.state.inviteEmail === this.props.memberslist[i]) {
        this.setState({ inviteEmail: "" });
        return;
      }
    }

    const inviteUserPromise = inviteUser(
      this.props.xid,
      this.state.inviteEmail,
      UserSession.getEmail()
    );
    console.log("invited: " + this.state.inviteEmail);
    this.setState({ inviteEmail: "" });
  }
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Invite a User to join this Project</label>
          <input
            placeholder="User Email"
            onChange={e => this.setState({ inviteEmail: e.target.value })}
            value={this.state.inviteEmail}
          />
        </Form.Field>
        <Segment textAlign="center" vertical>
          {" "}
          <Button type="submit" color="linkedin" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Segment>
      </Form>
    );
  }
}
