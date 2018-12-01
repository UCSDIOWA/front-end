import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Modal,
  Grid
} from "semantic-ui-react";
import AddMilestonesView from "./AddMilestonesView";
import EditProjectView from "./EditProjPopupView";

export default class MilestonesView extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false };
    this.handleEditMilestone = this.handleEditMilestone.bind(this);
  }

  handleEditMilestone() {
    this.setState({ isEdit: !this.state.isEdit });
  }
  render() {
    return (
      <Segment>
        <Progress percent={55}>Current Project Progress</Progress>
        <Header size="medium">
          {this.props.currentProjectName} Milestones
        </Header>
        <Segment>
          {(!this.state.isEdit && this.props.milestoneArray) ||
            (this.state.isEdit && this.props.editMilestoneArray)}
        </Segment>
        <Grid centered>
          <Grid.Row>
            <Grid.Column style={{ width: "15rem" }}>
              <Segment vertical>
                <Button inverted color="red" onClick={this.handleEditMilestone}>
                  Edit milestones
                </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column style={{ width: "12rem" }}>
              <Segment vertical>
                <AddMilestonesView
                  addMilestone={this.props.handleAddMilestone}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment textAlign="center" vertical>
          <EditProjectView />
        </Segment>
      </Segment>
    );
  }
}
