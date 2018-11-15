import React, { Component } from "react";

import { Segment, Grid, Image, Container } from "semantic-ui-react";

import holderimage from "../../resources/holder-image.jpg";
import CurrentProjectsTable from "./CurrentProjectsTable";
import PreviousProjectsTable from "./PreviousProjectsTable";
import EndorsementsWidget from "./EndorsementsWidget";
import ProfileDescriptionWidget from "./ProfileDescriptionWidget";
export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const testDesc =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus";
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
              <Grid.Column className="profile-columns3">
                <ProfileDescriptionWidget profileDescription={testDesc} />
                <EndorsementsWidget numEndorse={69} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
