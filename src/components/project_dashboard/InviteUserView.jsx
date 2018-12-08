import React, { Component } from "react";
import { Segment, Grid, Button, Checkbox, Form } from "semantic-ui-react";

export default class InviteUserView extends Component {
  handleSubmit() {
    //inviteUser()
  }
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Invite a User to the Project</label>
          <input placeholder="User Email" />
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
