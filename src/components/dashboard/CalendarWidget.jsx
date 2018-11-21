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
  Container,
  Popup,
  Modal,
  Form,
  Input
} from "semantic-ui-react";
import GoogleCalendar from "./GoogleCalendar";

export default class CalendarWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { hasCalendar: false, calendarID: "" };
    this.addCalendar = this.addCalendar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addCalendar(e, { value }) {
    this.setState({ calendarID: value, hasCalendar: true });
    console.log("Calendar id is " + this.state.calendarID);
  }

  handleChange(e, { value }) {
    this.setState({ calendarID: value });
  }

  render() {
    const { hasCalendar, calendarID } = this.state;

    if (hasCalendar) {
      return <GoogleCalendar calendarID={calendarID} />;
    } else {
      return (
        <Modal
          style={{ height: 400, width: 300 }}
          on="click"
          trigger={
            <Button style={{ width: 260, height: 260 }}>Add Calendar</Button>
          }
        >
          <Modal.Header>Add Google Calendar</Modal.Header>
          <Modal.Description>
            <Container style={{ width: 200, height: 200, paddingTop: 20 }}>
              <List ordered>
                <List.Item>Go to your Google Calendar</List.Item>
                <List.Item>
                  Select on <Icon name="setting" /> from the top of the page and
                  select option "Settings"
                </List.Item>
                <List.Item>
                  Select the Calendar you wish to add by selecting its name
                  under "Settings for my calendars"
                </List.Item>
                <List.Item>
                  Go to "Integrate Calendar" and copy/paste your Calendar ID
                  here
                </List.Item>
              </List>
              <Form.Field
                style={{ width: 210, paddingTop: 20 }}
                control={Input}
                placeholder="Copy/Paste your Calendar ID"
                name="calendarID"
                name="calendarID"
                value={calendarID}
                onChange={this.handleChange}
                onSubmit={this.addCalendar}
              />
            </Container>
          </Modal.Description>
        </Modal>
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
