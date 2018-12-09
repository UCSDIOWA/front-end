import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { removeUser } from "../../server/api";
import UserSession from "../../server/UserSession";
import { navConsts } from "../../constants";
export default class LeaveGroupView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    //console.log(name);
    //console.log(this.state);
    var removeSuccess = false;
    const removePromise = removeUser(UserSession.getEmail(), this.props.xid);
    removePromise.then(response => {
      console.log(response);
      removeSuccess = response.success;
      if (!removeSuccess) {
        alert("Error removing from project");
        console.log(response);
      } else {
        // update
        alert("Successfully removed from project!");
        //this.createProjectObject();
      }
    });
  }

  render() {
    const { GATEWAY } = navConsts;
    return (
      <Segment textAlign="center">
        <Form.Field>
          <Link to={"/" + GATEWAY}>
            <Button fluid negative onClick={this.handleClick}>
              Leave Project
            </Button>
          </Link>
        </Form.Field>
      </Segment>
    );
  }
}
