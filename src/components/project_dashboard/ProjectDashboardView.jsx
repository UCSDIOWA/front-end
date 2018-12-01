import React, { Component } from "react";
import { Popup, Segment, Button, Grid, GridRow } from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import MilestonesViewEvent from "./MilestonesViewEvent";
import CalendarWidget from "./CalendarWidget";
import AnnouncementsView from "./AnnouncementsView";

export default class ProjectDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = { milestoneArray: [] };
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
  }

  handleAddMilestone(milestoneName) {
    //TODO include sending new Milestone object to backend
    var newMilestone = (
      <MilestonesViewEvent milestone={milestoneName} key={milestoneName} />
    );
    this.setState({
      milestoneArray: [...this.state.milestoneArray, newMilestone]
    });
  }
  render() {
    //TODO have call to repopulate list from backend
    const list = this.state.milestoneArray;

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
                currentProjectName="{Project Name}"
              />
              <Segment>
              <AnnouncementsView />
              </Segment>
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
