import React, { Component } from "react";
import { Segment, Grid, Button, Checkbox, Form } from "semantic-ui-react";

export default class InviteUserView extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Invite a User to the Project</label>
          <input placeholder="User Email" />
        </Form.Field>
        <Segment textAlign="center" vertical>
          {" "}
          <Button type="submit" color="linkedin">
            Submit
          </Button>
        </Segment>
      </Form>
    );
  }
}
