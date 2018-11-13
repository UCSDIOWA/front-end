import React, { Component } from "react";
import { Segment, Grid, Image, Table, GridColumn } from "semantic-ui-react";
import MilestonesView from "./MilestonesView";
import AddMilestonesView from "./AddMilestonesView";

export default class ProjectDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={8}>
            <MilestonesView />
          </Grid.Column>
          <Grid.Column width={8}>
            <AddMilestonesView />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
