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
import EndorseTeammatesView from "./EndorseTeammatesView";

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
        <Progress progress percent={this.props.currentProgress}>
          Current Project Progress
        </Progress>

        {this.props.currentProgress == 100 && (
          <Segment>
            Congratulations, you've finished the project!
            <hr />
            <Modal trigger={<Button>Endorse Teammates</Button>} size="mini">
              <Modal.Content>
                <EndorseTeammatesView memberslist={this.props.memberslist} />
              </Modal.Content>
            </Modal>
          </Segment>
        )}

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
                  {(!this.state.isEdit && "Edit milestones") ||
                    (this.state.isEdit && "Stop Editing")}
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
