import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Modal,
  Grid,
  List
} from "semantic-ui-react";

//name weight description deadline

export default class MilestoneEventPopup extends Component {
  render() {
    return (
      <div>
        <Header as="h3">{this.props.msName}</Header>
        <List>
          <List.Item>Weight: {this.props.msWeight} </List.Item>
          <List.Item>Deadline: {this.props.msDeadline}</List.Item>
          <List.Item>
            Description: Set up endpoints pls i swear if u dont im guna rek u
            scrub aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </List.Item>
        </List>
      </div>
    );
  }
}
