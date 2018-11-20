import React, { Component } from "react";
import {
  Grid,
  Feed,
  Table,
  Segment,
  Header,
  Button,
  Icon,
  List,
  Divider,
  Embed,
  Container
} from "semantic-ui-react";
import GoogleCalendar from "./GoogleCalendar";

export default class CalendarWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { hasCalendar: false };
    this.addCalendar = this.addCalendar.bind(this);
  }

  addCalendar() {
    this.setState({ hasCalendar: true });
  }

  render() {
    if (this.state.hasCalendar) {
      return <GoogleCalendar />;
    } else {
      return (
        <Button style={{ width: 250, height: 250 }} onClick={this.addCalendar}>
          Add Calendar
        </Button>
      );
    }
  }
}
/*
 <Button onClick={this.openInNewTab} color="teal">
        Go To Google Calendar
        <Icon name="arrow alternate circle right" />
      </Button>
*/
