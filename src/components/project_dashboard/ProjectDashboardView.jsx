import React, { Component } from "react";
import { Popup, Segment, Button, Grid, GridRow } from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import MilestonesViewEvent from "./MilestonesViewEvent";
import CalendarWidget from "./CalendarWidget";

export default class ProjectDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = { milestoneArray: [], editMilestoneArray: [] };
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleRemoveMilestone = this.handleRemoveMilestone.bind(this);
  }

  handleAddMilestone(msName) {
    //TODO include sending new Milestone object to backend
    var newMilestone1 = (
      <MilestonesViewEvent msName={msName} key={msName} isDelete={false} />
    );
    var newMilestone2 = (
      <MilestonesViewEvent
        msName={msName}
        key={msName}
        isDelete={true}
        deleteFunc={this.handleRemoveMilestone}
      />
    );
    this.setState({
      milestoneArray: [...this.state.milestoneArray, newMilestone1],
      editMilestoneArray: [...this.state.editMilestoneArray, newMilestone2]
    });
  }

  handleRemoveMilestone(msName) {
    var list = [];
    var list2 = [];
    for (var i = 0; i < this.state.milestoneArray.length; i++) {
      if (this.state.milestoneArray[i].key != msName) {
        list.push(this.state.milestoneArray[i]);
        list2.push(this.state.editMilestoneArray[i]);
      }
    }

    this.setState({ milestoneArray: list, editMilestoneArray: list2 });
  }

  componentDidMount() {
    this.setState({
      milestoneArray: [
        <MilestonesViewEvent
          msName="testmilestone1"
          key="testmilestone1"
          isDelete={false}
        />,
        <MilestonesViewEvent
          msName="testmilestone2"
          key="testmilestone2"
          isDelete={false}
        />,
        <MilestonesViewEvent
          msName="testmilestone3"
          key="testmilestone3"
          isDelete={false}
        />
      ],
      editMilestoneArray: [
        <MilestonesViewEvent
          msName="testmilestone1"
          key="testmilestone1"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
        />,
        <MilestonesViewEvent
          msName="testmilestone2"
          key="testmilestone2"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
        />,
        <MilestonesViewEvent
          msName="testmilestone3"
          key="testmilestone3"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
        />
      ]
    });
  }
  render() {
    //TODO have call to repopulate list from backend
    const list = this.state.milestoneArray;
    const list2 = this.state.editMilestoneArray;
    return (
      <Segment>
        <Grid centered style={{ width: "60rem" }}>
          <Grid.Row>
            <h1>Project Name</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="profile-columns3">
              <MilestonesView
                handleAddMilestone={this.handleAddMilestone}
                milestoneArray={list}
                editMilestoneArray={list2}
                currentProjectName="{Project Name}"
              />
            </Grid.Column>
            <Grid.Column className="profile-columns3">
              <Segment textAlign="center">
                <h1>Calendar</h1>
                <CalendarWidget />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
