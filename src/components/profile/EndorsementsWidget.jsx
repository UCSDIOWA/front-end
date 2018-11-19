import React, { Component } from "react";
import { Segment, Grid, Statistic, Icon, Feed } from "semantic-ui-react";

import EndorsementFeedEvent from "./EndorsementFeedEvent";

import holderimage from "../../resources/holder-image.jpg";
import paulImage from "../../resources/paul_cao.jpg";

export default class EndorsementsWidget extends Component {
  constructor(props) {
    super(props);
    this.endorsementFeedPopulate = this.endorsementFeedPopulate.bind(this);
    this.state = { endorsements: [] };
  }

  endorsementFeedPopulate() {
    //TODO grab list json of endorsement feed event values from db
    //populate list passing json values into props
    const testList = [
      {
        endorser: "Brent Neldner",
        endorserImage: holderimage,
        endorsee: "Gary Gillespie",
        role: "teacher"
      },
      {
        endorser: "Gboo",
        endorserImage: holderimage,
        endorsee: "Gary Gillespie",
        role: "teacher"
      },
      {
        endorser: "Danny",
        endorserImage: holderimage,
        endorsee: "Gary Gillespie",
        role: "teacher"
      },
      {
        endorser: "Paul Cao",
        endorserImage: paulImage,
        endorsee: "Gary Gillespie",
        role: "lecturer"
      }
    ];
    for (var i = 0; i < 4; i++) {
      this.state.endorsements.push(
        <EndorsementFeedEvent
          endorser={testList[i].endorser}
          endorsee={testList[i].endorsee}
          endorserImage={testList[i].endorserImage}
          role={testList[i].role}
          key={i}
        />
      );
    }
  }

  render() {
    this.endorsementFeedPopulate();
    return (
      <Grid>
        <Grid.Row>
          <Segment className="profile-columns3">
            <Segment className="profile-columns4">
              <Statistic horizontal size="small">
                <Statistic.Value>
                  <Icon name="lemon outline" />
                  {this.props.numEndorse}
                </Statistic.Value>
                <Statistic.Label>Endorsements</Statistic.Label>
              </Statistic>
            </Segment>
            <Feed>{this.state.endorsements}</Feed>
          </Segment>
        </Grid.Row>
      </Grid>
    );
  }
}
