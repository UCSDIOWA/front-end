import React, { Component } from "react";
import { Segment, Grid, Image, Statistic, Icon, Feed } from "semantic-ui-react";
import EndorsementFeedEvent from "./EndorsementFeedEvent";

export default class EndorsementsWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Segment className="profile-columns3">
            <Segment className="profile-columns4">
              <Statistic horizontal size="small">
                <Statistic.Value>
                  <Icon name="lemon outline" />
                  69
                </Statistic.Value>
                <Statistic.Label>Endorsements</Statistic.Label>
              </Statistic>
            </Segment>
            <Feed>
              <EndorsementFeedEvent />
            </Feed>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}
