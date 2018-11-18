import React, { Component } from "react";
import { Segment, Grid, Statistic, Icon, Feed } from "semantic-ui-react";

import EndorsementFeedEvent from "./EndorsementFeedEvent";

import holderimage from "../../resources/holder-image.jpg";

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
        endorser: "Ur mum",
        endorserImage: holderimage,
        endorsee: "Daddy Gary",
        role: "father"
      },
      {
        endorser: "Daddy Gary",
        endorserImage: holderimage,
        endorsee: "Gboo",
        role: "mad lad"
      },
      {
        endorser: "Daddy Gary",
        endorserImage: holderimage,
        endorsee: "Danny Gao",
        role: "pee ehm"
      },
      {
        endorser: "Daddy Gary",
        endorserImage: holderimage,
        endorsee: "Daddy Gary",
        role: "being the fukin best"
      }
    ];
    for (var i = 0; i < 4; i++) {
      this.state.endorsements.push(
        <EndorsementFeedEvent
          endorser={testList[i].endorser}
          endorsee={testList[i].endorsee}
          endorserImage={holderimage}
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
