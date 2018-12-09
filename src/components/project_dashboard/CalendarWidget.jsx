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
import { getProjectInfo, updateProject } from "../../server/api";

export default class CalendarWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCalendar: this.props.hasCalendar,
      calendarID: this.props.calendarID,
      projectObject: undefined
    };
    this.addCalendar = this.addCalendar.bind(this);
    this.setID = this.setID.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const getProjPromise = getProjectInfo([this.props.xid]);
    getProjPromise.then(response => {
      console.log(response);
      var projectObject = {
        xid: response.projects[0].xid,
        title: response.projects[0].title,
        projectleader: response.projects[0].projectleader,
        percentdone: response.projects[0].percentdone,
        groupsize: response.projects[0].groupsize,
        isprivate: response.projects[0].isprivate,
        tags: response.projects[0].tags,
        deadline: response.projects[0].deadline,
        calendarid: response.projects[0].calendarid,
        description: response.projects[0].description,
        done: response.projects[0].done,
        joinrequests: response.projects[0].joinrequests,
        memberslist: response.projects[0].memberslist,
        milestones: response.projects[0].milestones,
        pinnedannouncements: response.projects[0].pinnedannouncements,
        unpinnedannouncements: response.projects[0].unpinnedannouncements
      };
      console.log(projectObject);
      this.setState({ projectObject: projectObject });
      if (projectObject.calendarid !== undefined) {
        this.setState({
          hasCalendar: true,
          calendarID: this.state.projectObject.calendarid
        });
      }
    });
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
    var newProjectObject = this.state.projectObject;
    newProjectObject.calendarid = this.state.calendarID;
    console.log(newProjectObject);
    this.setState({ projectObject: newProjectObject });
    this.submit(newProjectObject);
  }

  submit(newProjectObject) {
    var updateProjectSuccess = false;
    console.log(newProjectObject);
    const submitPromise = updateProject(newProjectObject);
    submitPromise.then(response => {
      console.log(response);
      updateProjectSuccess = response.success;
      if (!updateProjectSuccess) {
        alert("Error inputting calendar");
        console.log(response);
      } else {
        // update
        alert("Successfully inputted calendar!");
        //this.createProjectObject();
      }
    });
  }
  /* Sets the state calendarID to value (does not render the calendar)
   */
  setID(e, { value }) {
    /* var newProjectObject = this.state.projectObject;
    newProjectObject.calendarID = value; */
    this.setState({ calendarID: value });
    /*  var updateProjectSuccess = false;
    console.log(this.state.projectObject);
    const submitPromise = updateProject(this.state.projectObject);
    submitPromise.then(response => {
      console.log(response);
      updateProjectSuccess = response.success;
      if (!updateProjectSuccess) {
        alert("Error inputting calendar");
        console.log(response);
      } else {
        // update
        alert("Successfully inputted calendar!");
        //this.createProjectObject();
      }
    }); */
  }

  render() {
    const { hasCalendar, calendarID } = this.state;
    // if project has connected a calendar then render it
    if (hasCalendar) {
      console.log("reached");
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
