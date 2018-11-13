import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Grid,
  Input,
  Container
} from "semantic-ui-react";

export default class AddMilestonesView extends Component {
  render() {
    return (
      <Segment>
        <h1>Add a Milestone!</h1>
        <Segment vertical>
          <Icon name="keyboard" />
          <Input placeholder="Name" />
        </Segment>
        <Segment vertical>
          <Icon name="weight" />
          <Input placeholder="Weight" />
        </Segment>
        <Segment vertical>
          <Icon name="heartbeat" />
          <Input placeholder="Deadline" />
        </Segment>
        <Segment vertical>
          <Button inverted color="red">
            Cancel
          </Button>
        </Segment>
        <Segment vertical>
          <Button inverted color="blue">
            Submit
          </Button>
        </Segment>
      </Segment>
    );
  }
}
