import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Modal
} from "semantic-ui-react";

export default class MilestonesViewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { canRemove: this.props.canRemove };
  }

  render() {
    return (
      <Segment vertical>
        <Icon name={this.state.canRemove ? "delete" : "check circle outline"} />
        <Button>{this.props.milestone}</Button>
      </Segment>
    );
  }
}
