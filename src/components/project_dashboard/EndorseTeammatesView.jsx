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
import EndorseTeammatesEvent from "./EndorseTeammatesEvent";

export default class EndorseTeammatesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teammatesEvents: [],
      teamSize: 5,
      teammateNames: ["john", "bob", "urmum", "gary", "paul"]
    };
  }

  populateTeammatesTable() {
    //TODO grab teammates from backend here or somewhere further up?

    var list = this.state.teammatesEvents;
    for (var i = 0; i < this.state.teamSize; i++) {
      list.push(
        <EndorseTeammatesEvent teammateName={this.state.teammateNames[i]} />
      );
    }
    this.setState({ teammatesEvents: list });
  }

  componentDidMount() {
    this.populateTeammatesTable();
  }
  render() {
    return (
      <Segment>
        <Header as="h2">Endorse Your Teammates!</Header>
        <List divided verticalAlign="middle">
          {this.state.teammatesEvents}
        </List>
      </Segment>
    );
  }
}
