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

export default class ProjectDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = { milestoneArray: [] };
    this.handleAddMilestone = this.handleAddMilestone.bind(this);
  }

  handleAddMilestone(milestoneName) {
    //TODO possible promise?
    var list = this.state.milestoneArray;
    list.push(
      <MilestonesViewEvent milestone={milestoneName} key={milestoneName} />
    );
    this.setState({ milestoneArray: list });
  }
  render() {
    //TODO have call to repopulate list from backend
    const list = this.state.milestoneArray;
    console.log(list.length);
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
