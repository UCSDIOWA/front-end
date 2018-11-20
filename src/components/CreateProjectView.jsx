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
  Container
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { navConsts } from "../constants";

const { GATEWAY, SIGNUP, PROFILE, CREATE_PROJECT, SEARCH_PROJECT } = navConsts;

const tagsArray = [
  { key: "s", text: "Software Engineering", value: "software engineering" },
  { key: "c", text: "Computer Science", value: "computer science" }
];

const privateOptions = [
  { key: "t", text: "Yes", value: true },
  { key: "f", text: "No", value: false }
];

export default class CreateProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      size: 10,
      isPrivate: false,
      tags: "",
      deadline: null,
      calendarID: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsPrivate = this.handleIsPrivate.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleIsPrivate() {
    this.setState({ isPrivate: !this.state.isPrivate });
  }

  handleDeadline(day, { selected }) {
    this.setState({
      deadline: selected ? undefined : day
    });
  }

  handleCalendar() {
    return <Popup>simple</Popup>;
  }

  handleSubmit() {
    console.log("Current Page is CreateProjectView.jsx");
    console.log("Title:", this.state.title);
    console.log("Description:", this.state.description);
    console.log("isPrivate:", this.state.isPrivate);
    console.log("Size:", this.state.size);
    console.log("Tags:", this.state.tags);
    console.log("Deadline:", this.state.deadline);
    console.log("CalendarID:", this.state.calendarID);
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
        <Segment>
          <Grid style={{ height: "100%" }}>
            <Grid.Column width={8} floated="left" style={{ paddingLeft: 20 }}>
              <Form>
                <Form.Field
                  required
                  control={Input}
                  label="Title"
                  placeholder="Title of Project..."
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                />
                <Form.Field
                  required
                  control={TextArea}
                  label="Description"
                  placeholder="Description of Project..."
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  style={{ height: 120 }}
                />
              </Form>
            </Grid.Column>
            <Grid.Column width={8} floated="right" style={{ paddingRight: 50 }}>
              <Grid.Row>
                <Form>
                  <Form.Group>
                    <Form.Field
                      required
                      style={{ width: "10%" }}
                      control={Select}
                      options={privateOptions}
                      label="Private"
                      name="isPrivate"
                      value={isPrivate}
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      required
                      type="number"
                      style={{ width: "40%" }}
                      control={Input}
                      label="Size"
                      name="size"
                      value={size}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Popup
                    basic
                    on="click"
                    trigger={
                      <Form.Field
                        control={Input}
                        label="Add Google Calendar"
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
                            Select the Calendar you wish to add by selecting its
                            name under "Settings for my calendars"
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
                  <Form.Field
                    control={Select}
                    options={tagsArray}
                    placeholder="ex. CSE 110 Project"
                    label="Tags"
                    name="tags"
                    value={tags}
                    onChange={this.handleChange}
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
            <Grid.Row centered>
              <Button color="teal" onClick={this.handleSubmit}>
                Create
              </Button>
              <Link to={"/" + GATEWAY}>
                <Button color="red">Cancel</Button>
              </Link>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
