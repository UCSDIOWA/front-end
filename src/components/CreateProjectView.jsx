import React, { Component } from "react";
import {
  Header,
  Grid,
  Form,
  Input,
  TextArea,
  Segment,
  Button,
  Select
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { navConsts } from "../constants";
import DayPicker from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";

const { GATEWAY } = navConsts;

const tagsArray = [
  { key: "s", text: "Software Engineering", value: "software engineering" },
  { key: "c", text: "Computer Science", value: "computer science" }
];

const privateOptions = [
  { key: "t", text: "Yes", value: true },
  { key: "f", text: "No", value: false }
];

const FORMAT = "M/D/YYYY";

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

export default class CreateProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      size: 10,
      isPrivate: false,
      tags: "",
      deadline: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIsPrivate = this.handleIsPrivate.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
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

  handleSubmit() {
    console.log("Current Page is CreateProjectView.jsx");
    console.log("Title:", this.state.title);
    console.log("Description:", this.state.description);
    console.log("isPrivate:", this.state.isPrivate);
    console.log("Size:", this.state.size);
    console.log("Tags:", this.state.tags);
    console.log("Deadline:", this.state.deadline);
  }
  //width={8} floated="left" style={{ paddingLeft: 20 }}
  render() {
    const { title, description, size, isPrivate, tags } = this.state;
    return (
      <div>
        <Header style={{ fontSize: "5em" }}>Create Project</Header>
        <Segment>
          <Grid className="create-project-grid" centered>
            <Grid.Column
              className="create-project-column1"
              floated="left"
              width="8"
            >
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
            <Grid.Column
              className="create-project-column1"
              floated="right"
              width="6"
            >
              <Grid.Row>
                <div>
                  <Header size="tiny">Deadline</Header>
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
