import React, { Component } from "react";
import {
  Grid,
  Button,
  Icon,
  List,
  Modal,
  Form,
  Input
} from "semantic-ui-react";
import GoogleCalendar from "./GoogleCalendar";

export default class CalendarWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { hasCalendar: this.props.hasCalendar, calendarID: "" };
    this.addCalendar = this.addCalendar.bind(this);
    this.setID = this.setID.bind(this);
  }

  /* This function sets state hasCalendar to true, so this component will rerender and 
    render a Google Calendar with the state calendarID
   */
  addCalendar() {
    // if no id is entered then do nothing
    if (this.state.calendarID !== "") {
      this.setState({ hasCalendar: true });
      console.log("Calendar id is " + this.state.calendarID);
    }
  }

  /* Sets the state calendarID to value (does not render the calendar)
   */
  setID(e, { value }) {
    this.setState({ calendarID: value });
  }

  render() {
    const { hasCalendar, calendarID } = this.state;
    // if project has connected a calendar then render it
    if (hasCalendar) {
      return <GoogleCalendar calendarID={calendarID} />;
      // otherwise return a button that allows the user to enter a calendar id
    } else {
      return (
        <Modal
          style={{ height: 400, width: 300 }}
          on="click"
          trigger={
            <Button
              style={{ width: 260, height: 260, fontSize: 25 }}
              color="teal"
            >
              Add Calendar
            </Button>
          }
          closeIcon
        >
          <Modal.Header>Add Google Calendar</Modal.Header>
          <Modal.Description>
            <Grid style={{ width: 250, height: 200, margin: 20 }}>
              <Grid.Row>
                <List ordered>
                  <List.Item>Go to your Google Calendar</List.Item>
                  <List.Item>
                    Select on <Icon name="setting" /> from the top of the page
                    and select option "Settings"
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
              </Grid.Row>
              <Grid.Row centered>
                <p>Note: The calendar must be public</p>
              </Grid.Row>
              <Grid.Row centered style={{ paddingTop: 0 }}>
                <Form.Field
                  style={{ width: 210 }}
                  control={Input}
                  placeholder="Copy/Paste your Calendar ID"
                  name="calendarID"
                  name="calendarID"
                  value={calendarID}
                  onChange={this.setID}
                />
              </Grid.Row>
              <Grid.Row centered style={{ paddingTop: 0 }}>
                <Button color="teal" onClick={this.addCalendar}>
                  Add
                </Button>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal>
      );
    }
  }
}
