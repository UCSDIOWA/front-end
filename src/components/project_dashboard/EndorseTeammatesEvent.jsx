import React, { Component } from "react";
import {
  Segment,
  Button,
  List,
  Grid,
  Modal,
  Header,
  Icon,
  Confirm
} from "semantic-ui-react";

export default class EndorseTeammatesEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { isEndorsed: false };
    this.handleEndorse = this.handleEndorse.bind(this);
  }

  handleEndorse() {
    //TODO handle sending endorsement to backend

    this.setState({ isEndorsed: !this.state.isEndorsed });
  }
  render() {
    return (
      <List.Item>
        <Icon
          name={!this.state.isEndorsed ? "hand lizard" : "check circle outline"}
          onClick={!this.state.isEndorsed ? this.handleEndorse : undefined}
          color={!this.state.isEndorsed ? "black" : "green"}
          size="large"
        />
        <List.Content>
          <Header as="h4">{this.props.teammateName}</Header>
        </List.Content>
      </List.Item>
    );
  }
}
