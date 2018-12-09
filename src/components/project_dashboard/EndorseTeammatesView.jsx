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
import UserSession from "../../server/UserSession";

export default class EndorseTeammatesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: UserSession.getEmail(),
      teammatesEvents: [],
      teamSize: this.props.memberslist.length,
      teammateNames: this.props.memberslist
    };
  }

  populateTeammatesTable() {
    //TODO grab teammates from backend here or somewhere further up?

    var list = this.state.teammatesEvents;
    for (var i = 0; i < this.state.teamSize; i++) {
      if (this.state.teammateNames[i] != this.state.email) {
        list.push(
          <EndorseTeammatesEvent teammateName={this.state.teammateNames[i]} />
        );
      }
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
