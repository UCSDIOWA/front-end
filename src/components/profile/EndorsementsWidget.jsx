import React, { Component } from "react";
import {
  Header,
  Segment,
  Grid,
  Statistic,
  Icon,
  Feed
} from "semantic-ui-react";

import EndorsementFeedEvent from "./EndorsementFeedEvent";

import holderimage from "../../resources/holder-image.jpg";
import paulImage from "../../resources/paul_cao.jpg";
import UserSession from "../../server/UserSession";

export default class EndorsementsWidget extends Component {
  constructor(props) {
    super(props);
    //this.endorsementFeedPopulate = this.endorsementFeedPopulate.bind(this);
  }

  render() {
    const noEndorsementsFound = <Header>No Endorsements Found</Header>;
    var Endorsements;
    if (this.props.endorsements.length === 0) {
      Endorsements = noEndorsementsFound;
    } else {
      Endorsements = this.props.endorsements.map(endorsement => (
        <EndorsementFeedEvent
          endorser={endorsement}
          endorsee={UserSession.getName()}
        />
      ));
    }
    return (
      <Grid>
        <Grid.Row>
          <Segment className="profile-columns3">
            <Segment className="profile-columns4">
              <Statistic horizontal size="small">
                <Statistic.Value>
                  <Icon name="lemon outline" />
                  {this.props.endorsements.length}
                </Statistic.Value>
                <Statistic.Label>Endorsements</Statistic.Label>
              </Statistic>
            </Segment>
            <Feed>{Endorsements}</Feed>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}
