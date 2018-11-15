import React, { Component } from "react";
import { Segment, Grid, Image, Statistic, Icon, Feed } from "semantic-ui-react";

export default class EndorsementFeedEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={this.props.endorserImage} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{this.props.endorser}</Feed.User> endorses{" "}
            <Feed.User>{this.props.endorsee}</Feed.User> for the role{" "}
            <a>{this.props.role}</a>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
