import React, { Component } from "react";
import { Segment, Grid, Image, Statistic, Icon, Feed } from "semantic-ui-react";
import holderimage from "../holder-image.jpg";

export default class EndorsementsWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Segment className="profile-columns1">
            <Segment className="profile-columns2">
              <Statistic horizontal size="small">
                <Statistic.Value>
                  <Icon name="lemon" />
                  69
                </Statistic.Value>
                <Statistic.Label>Endorsements</Statistic.Label>
              </Statistic>
            </Segment>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <Image src={holderimage} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>Daddy Gary</Feed.User> endorses{" "}
                    <Feed.User>Paul Cao</Feed.User> for the role{" "}
                    <a>Software Engineer</a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}
