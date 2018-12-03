import React, { Component } from "react";
import { Popup, Segment, Button, Grid, GridRow } from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import MilestonesViewEvent from "./MilestonesViewEvent";
import CalendarWidget from "./CalendarWidget";
import AnnouncementsView from "./AnnouncementsView";

export default class ProjectDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milestoneArray: [],
      editMilestoneArray: [],
      currentProgress: 100,
      currentWeight: 0,
      totalWeight: 100
    };
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
    this.handleRemoveMilestone = this.handleRemoveMilestone.bind(this);
    this.handleIncrementProgress = this.handleIncrementProgress.bind(this);
    this.handleDecrementProgress = this.handleDecrementProgress.bind(this);
  }

  handleDecrementProgress(updateWeight) {
    var currProg = this.state.currentProgress;
    var currWeight = this.state.currentWeight;
    currWeight = currWeight * 1 - updateWeight * 1;

    currProg = Math.ceil(100 * (currWeight / this.state.totalWeight));

    this.setState({ currentProgress: currProg, currentWeight: currWeight });
  }
  handleIncrementProgress(updateWeight) {
    var currProg = this.state.currentProgress;
    var currWeight = this.state.currentWeight;

    //update current weight
    currWeight = currWeight * 1 + updateWeight * 1;

    currProg = Math.ceil(100 * (currWeight / this.state.totalWeight));

    this.setState({ currentProgress: currProg, currentWeight: currWeight });
  }

  handleAddMilestone(msName, msWeight, msDeadline, msDescription) {
    //handles adding weight from total milestones weight
    var totalWeight = this.state.totalWeight;
    var currWeight = this.state.currentWeight;
    console.log("old total: " + totalWeight);
    totalWeight = totalWeight * 1 + msWeight * 1;
    console.log("new total: " + totalWeight);

    this.setState({
      currentProgress: Math.ceil(100 * (currWeight / totalWeight)),
      totalWeight: totalWeight,
      currentWeight: currWeight
    });
    //TODO include sending new Milestone object to backend
    var newMilestone1 = (
      <MilestonesViewEvent
        msName={msName}
        msWeight={msWeight}
        msDeadline={msDeadline}
        msDescription={msDescription}
        key={msName}
        isDelete={false}
        updateProgFunc={this.handleIncrementProgress}
        decrementProgFunc={this.handleDecrementProgress}
      />
    );
    var newMilestone2 = (
      <MilestonesViewEvent
        msName={msName}
        msWeight={msWeight}
        msDeadline={msDeadline}
        msDescription={msDescription}
        key={msName}
        isDelete={true}
        deleteFunc={this.handleRemoveMilestone}
        decrementProgFunc={this.handleDecrementProgress}
      />
    );
    this.setState({
      milestoneArray: [...this.state.milestoneArray, newMilestone1],
      editMilestoneArray: [...this.state.editMilestoneArray, newMilestone2]
    });
  }

  handleRemoveMilestone(msName, msWeight) {
    //handles removing weight from total milestones weight
    var totalWeight = this.state.totalWeight;
    var currWeight = this.state.currentWeight;
    totalWeight -= msWeight;

    this.setState({
      currentProgress: Math.ceil(100 * (currWeight / totalWeight)),
      totalWeight: totalWeight,
      currentWeight: currWeight
    });

    //handles removing from display
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
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone1"
          isDelete={false}
          updateProgFunc={this.handleIncrementProgress}
          decrementProgFunc={this.handleDecrementProgress}
        />,
        <MilestonesViewEvent
          msName="testmilestone2"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone2"
          isDelete={false}
          updateProgFunc={this.handleIncrementProgress}
          decrementProgFunc={this.handleDecrementProgress}
        />,
        <MilestonesViewEvent
          msName="testmilestone3"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone3"
          isDelete={false}
          updateProgFunc={this.handleIncrementProgress}
          decrementProgFunc={this.handleDecrementProgress}
        />,
        <MilestonesViewEvent
          msName="testmilestone4"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone4"
          isDelete={false}
          updateProgFunc={this.handleIncrementProgress}
          decrementProgFunc={this.handleDecrementProgress}
        />
      ],
      editMilestoneArray: [
        <MilestonesViewEvent
          msName="testmilestone1"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone1"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
          decrementProgFunc={this.handleDecrementProgress}
        />,
        <MilestonesViewEvent
          msName="testmilestone2"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone2"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
          decrementProgFunc={this.handleDecrementProgress}
        />,
        <MilestonesViewEvent
          msName="testmilestone3"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone3"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
          decrementProgFunc={this.handleDecrementProgress}
        />,
        <MilestonesViewEvent
          msName="testmilestone4"
          msWeight={25}
          msDeadline="never"
          msDescription="yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet yah yeet"
          key="testmilestone4"
          isDelete={true}
          deleteFunc={this.handleRemoveMilestone}
          decrementProgFunc={this.handleDecrementProgress}
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
                currentProjectName="Project Name"
                currentProgress={this.state.currentProgress}
              />
            </Grid.Column>
            <Grid.Column className="profile-columns3">
              <Segment textAlign="center">
                <h1>Calendar</h1>
                <CalendarWidget />
              </Segment>
              <AnnouncementsView />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
