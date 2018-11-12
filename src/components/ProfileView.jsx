import React, { Component } from "react";
import { Segment, Grid, Image, Table } from "semantic-ui-react";
import holderimage from "../holder-image.jpg";
import CurrentProjectsTable from "./CurrentProjectsTable";
import PreviousProjectsTable from "./PreviousProjectsTable";
import EndorsementsWidget from "./EndorsementsWidget";

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Grid className="profile-header">
            <Grid.Row>
              <Grid.Column width={5} verticalAlign="bottom">
                <h1>Profile</h1>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src={holderimage} width="80px" rounded={true} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div>
          <Grid columns={2} divided="vertically" className="profile-grid">
            <Grid.Row>
              <Grid.Column>
                <CurrentProjectsTable />
                <PreviousProjectsTable />
              </Grid.Column>
              <Grid.Column className="profile-columns2">
                <EndorsementsWidget />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
