import React, { Component } from "react";
import {
  Header,
  Grid,
  Form,
  Input,
  TextArea,
  Segment,
  Button,
  Select,
  Popup,
  List,
  Icon,
  Container,
  Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { navConsts } from "../../constants";
import DayPicker from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import UserSession from "../../server/UserSession";
import CurrentTags from "./CurrentTags";

const privateOptions = [
  { key: "t", text: "Yes", value: true },
  { key: "f", text: "No", value: false }
];

const { GATEWAY, DASHBOARD } = navConsts;

// for date picker
const FORMAT = "M/D/YYYY";

// default values for project creation
const DEFAULT_SIZE = 10;
const DEFAULT_PRIVATE = false;

/* This function is for the datepicker. I have no idea what it does.
 */
function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

/* This function is for the datepicker. I have no idea what it does.
 */
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

export default class CreateProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      tagForm: "",
      tags: [],
      deadline: "",
      calendarID: "",
      // these states have default values if the user does not change them
      size: DEFAULT_SIZE,
      isPrivate: DEFAULT_PRIVATE,
      // these states are for checking for blank input and displaying errors
      missingInput: false,
      missingTitle: false,
      missingDescription: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsPrivate = this.handleIsPrivate.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
    this.handleAddTags = this.handleAddTags.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleMissingInput = this.handleMissingInput.bind(this);
  }

  /* This method handles all changes to states. IF the user entered invalid information previously, 
     then we check if they fixed the errors and remove the error messages.
  */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });

    // check if user fixed any errors (if any)
    if (name === "title") {
      this.setState({ missingTitle: false });
    } else if (name === "description") {
      this.setState({ missingDescription: false });
    }
  }

  /* Special handler for changing value of isPrivate state
   */
  handleIsPrivate() {
    this.setState({ isPrivate: !this.state.isPrivate });
  }

  // handles saving the deadline as a string any normal person would want to read
  handleDeadline(day, { selected }) {
    this.setState({
      deadline: selected
        ? undefined
        : day.getMonth() + 1 + "/" + day.getDate() + "/" + day.getFullYear()
    });
  }

  // handles saving tags. Each time the user selects a new tag, we add it to the tags array
  handleAddTags() {
    if (this.state.tagForm != "") {
      this.setState(prevState => {
        if (this.state.tags.includes(this.state.tagForm)) {
          return {
            tagForm: ""
          };
        } else {
          return {
            tagForm: "",
            tags: [...prevState.tags, prevState.tagForm]
          };
        }
      });
    }
  }

  // This handler checks if any mandatory input is missing
  handleMissingInput() {
    var foundError = false;
    // check for missing title
    if (this.state.title === "") {
      this.setState({ missingTitle: true });
      foundError = true;
    }

    // if any error was found return true
    return foundError ? true : false;
  }

  /* This is called when the user wants to send the project info to the database for creation.
   */
  handleSubmit() {
    console.log("Tags: " + this.state.tags);

    // first check if any mandatory input is missing
    if (this.handleMissingInput()) {
      this.setState({ missingInput: true });
      // otherwise send info to be saved
    } else {
      this.props.onCreateProject(
        this.state.title,
        UserSession.getEmail(),
        0,
        this.state.size,
        this.state.isPrivate,
        this.state.tags,
        this.state.deadline,
        this.state.calendarId,
        this.state.description,
        [UserSession.getEmail()]
      );
    }
  }

  handleRemoveTag(index) {
    this.setState(prevState => {
      return {
        tags: prevState.tags.filter((_, i) => i !== index)
      };
    });
  }

  render() {
    const {
      title,
      description,
      size,
      isPrivate,
      tags,
      calendarID
    } = this.state;
    return (
      <div>
        <Header style={{ fontSize: "5em" }}>Create Project</Header>
        <Form loading={this.props.isSubmitting}>
          <Segment>
            <Grid className="create-project-grid" centered>
              <Grid.Column
                className="create-project-column1"
                floated="left"
                width="8"
              >
                <Form>
                  <Header size="tiny" style={{ marginBottom: 8 }}>
                    Title
                  </Header>
                  <Form.Field
                    error={this.state.missingTitle}
                    control={Input}
                    placeholder="Title of Project..."
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                  />
                  <Header size="tiny" style={{ marginBottom: 8 }}>
                    Description
                  </Header>
                  <Form.Field
                    error={this.state.missingDescription}
                    control={TextArea}
                    placeholder="Description of Project..."
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    style={{ height: 180 }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column
                className="create-project-column1"
                floated="right"
                width="6"
              >
                <Grid.Row>
                  <Header size="tiny" style={{ marginBottom: 8 }}>
                    Tags
                  </Header>
                  <div>
                    <Form.Input
                      icon="tags"
                      iconPosition="left"
                      placeholder="Enter tags for this project"
                      onChange={e => this.setState({ tagForm: e.target.value })}
                      value={this.state.tagForm}
                    />
                    <Button color="linkedin" onClick={this.handleAddTags}>
                      Add Tag
                    </Button>
                  </div>
                  <CurrentTags
                    onRemoveTag={this.handleRemoveTag}
                    tags={this.state.tags}
                  />
                  <div>
                    <Header
                      size="tiny"
                      style={{ marginBottom: 8, marginTop: 15 }}
                    >
                      Deadline
                    </Header>
                    <DayPicker
                      placeholder="MM-DD-YYYY"
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format={FORMAT}
                      hideOnDayClick
                      inputProps={{ style: { width: 200 } }}
                      selectedDay={this.state.selectedDay}
                      onDayChange={this.handleDeadline}
                    />
                  </div>
                  <Form style={{ paddingTop: 20 }}>
                    <Form.Group>
                      <Form.Field
                        style={{ width: "10%" }}
                        control={Select}
                        options={privateOptions}
                        label="Private"
                        name="isPrivate"
                        value={isPrivate}
                        onChange={this.handleChange}
                      />
                      <Form.Field
                        type="number"
                        style={{ width: "40%" }}
                        control={Input}
                        label="Size"
                        name="size"
                        value={size}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Header size="tiny" style={{ marginBottom: 8 }}>
                      Add Google Calendar
                    </Header>
                    <Popup
                      basic
                      on="click"
                      trigger={
                        <Form.Field
                          control={Input}
                          placeholder="Copy/Paste your Calendar ID"
                          name="calendarID"
                          value={calendarID}
                          onChange={this.handleChange}
                        />
                      }
                      content={
                        <Container style={{ width: 200, height: 200 }}>
                          <List ordered>
                            <List.Item>Go to your Google Calendar</List.Item>
                            <List.Item>
                              Select on <Icon name="setting" /> from the top of
                              the page and select option "Settings"
                            </List.Item>
                            <List.Item>
                              Select the Calendar you wish to add by selecting
                              its name under "Settings for my calendars"
                            </List.Item>
                            <List.Item>
                              Go to "Integrate Calendar" and copy/paste your
                              Calendar ID here
                            </List.Item>
                          </List>
                        </Container>
                      }
                      position="left center"
                    />
                  </Form>
                </Grid.Row>
              </Grid.Column>
              <Grid.Row centered>
                <Link to={"/" + DASHBOARD}>
                  <Button color="teal" onClick={this.handleSubmit}>
                    Create
                  </Button>
                </Link>
                <Link to={"/" + GATEWAY}>
                  <Button color="red">Cancel</Button>
                </Link>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      </div>
    );
  }
}
