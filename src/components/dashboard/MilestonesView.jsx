import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Modal
} from "semantic-ui-react";
import AddMilestonesView from "./AddMilestonesView";
import MilestonesViewEvent from "./MilestonesViewEvent";

export default class MilestonesView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("msview: " + this.props.milestoneArray.length);
    return (
      <Segment>
        <Header size="medium">Milestones View</Header>
        <Progress percent={55}>Current Project Progress</Progress>
        {this.props.milestoneArray}
        <Segment vertical>
          <Segment vertical>
            <Button inverted color="red">
              Remove milestone
            </Button>
          </Segment>
          <Segment vertical>
            <AddMilestonesView addMilestone={this.props.handleAddMilestone} />
          </Segment>
        </Segment>
      </Segment>
    );
  }
}
