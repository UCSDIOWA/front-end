import React, { Component } from "react";
import { Feed } from "semantic-ui-react";

export default class EndorsementFeedEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{this.props.endorser}</Feed.User> endorses{" "}
            <Feed.User>{this.props.endorsee}</Feed.User>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
