import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Grid
} from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import CalendarModule from "./CalendarModule";
import MilestonesViewEvent from "./MilestonesViewEvent";
import AnnouncementsView from "./AnnouncementsView.jsx"

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
      <div>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column className="profile-columns3">
                TestProjectDashboard
                <MilestonesView
                  handleAddMilestone={this.handleAddMilestone}
                  milestoneArray={list}
                />
                <AnnouncementsView/>
              </Grid.Column>

              <Grid.Column className="profile-columns3">
                <CalendarModule />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Segment>

      </div>
    );
  }
}
