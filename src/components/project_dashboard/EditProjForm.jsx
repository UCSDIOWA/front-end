import React, { Component } from "react";
import { getEditProjForm } from "../../server/api";
import UserSession from "../../server/UserSession";
import PropTypes from 'prop-types';
import CurrentTags from "../create_project/CurrentTags";
import DayPicker from "react-day-picker/DayPickerInput";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";
import {
  Segment,
  Button,
  Form,
  Grid,
  Modal,
  Header,
  Icon,
  Confirm,
  Dropdown,
  Label
} from "semantic-ui-react";

//PRIVACY OPTIONS
const privateOptions = [
  { key: "t", text: "Yes", value: true },
  { key: "f", text: "No", value: false }
];

//DATE FORMAT
const FORMAT = "M/D/YYYY";

//This function is for the datepicker.
function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

//This function is for the datepicker to formate the date.
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

export default class EditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      deadline: "",
      tags: ["oooof", "uwu~", "kyaaa >.<", "good", "shit"],
      currentTagsViewer: [],
      tagForm: "",
      teamSize: 0,
      isPrivate: false,
      members: [],
      membersViewer: [],
      pendingMembers: [],
      pendingMembersView: []
    };

    this.populateMembers = this.populateMembers.bind(this);
    this.populatePendingMembers = this.populatePendingMembers.bind(this);
    this.populateCurrentTags = this.populateCurrentTags.bind(this);
    this.handleAddTags = this.handleAddTags.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);

    this.populateMembers();
    this.populatePendingMembers();
    this.populateCurrentTags();
  }


  componentDidMount() {
    const profDataPromise = getEditProjForm(UserSession.getEmail());
    profDataPromise.then(response => {
      console.log(response);
      this.setState({
        // title: response.title,
        // description: response.description,
        // deadline: response.deadline,
        // currentTags: response.tags,
        // teamSize: response.teamSize,
        // isPrivate: response.privacy,
        // members: response.members,
        // membersViewer: response.membersViewer,
        // pendingMembers: response.pendingMembers,
        // pendingMembersView: response.pendingMembersView
      });
    });
  }

//Populate current tags array
  populateCurrentTags() {
    for(var i = 0; i < this.state.tags.length; i++) {
      this.state.currentTagsViewer.push(
          <Label>
            {this.state.tags[i]}
            <Icon name='delete' />
          </Label>
      );
    }
  }

  //Handles saving tags. Each time the user selects a new tag, we add it to the tags array
  handleAddTags() {
    if (this.state.tagForm != "" ) {
      this.setState((prevState) => {
        if (this.state.tags.includes(this.state.tagForm)) {
          return {
            tagForm: ""
          }
        }
        else {
          return {
            tagForm: "",
            tags: [...prevState.tags, prevState.tagForm],
          }
        }
      });
    }
  }

//Handles removing tags.
  handleRemoveTag(index) {
    this.setState((prevState) => {
      return {
        tags: prevState.tags.filter((_, i) => i !== index) }
    });
  }

//For membersViewer
  populateMembers() {
    for (var i = 0; i < this.state.members.length; i++) {
      this.state.membersViewer.push(
        <Segment vertical>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>{this.state.members[i]}</Grid.Column>
              <Grid.Column width={2}>
                <Button color="red" size="mini">
                  Remove Member
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="facebook" size="mini">
                  Make Leader
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    //this.setState({ MembersView: temp });
  }

  populatePendingMembers() {
    for (var i = 0; i < this.state.pendingMembers.length; i++) {
      this.state.pendingMembersView.push(
        <Segment vertical>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                {this.state.pendingMembers[i]}
              </Grid.Column>
              <Grid.Column width={2}>
                <Button color="green" size="mini">
                  Accept Member
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button color="youtube" size="mini">
                  Reject Member
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    //this.setState({ pendingMembersView: temp });
  }

  render() {
    return (
      <Form>
        <Segment.Group horizontal>
          <Segment>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder="Edit Project Title"
                onChange={e => this.setState({ name: e.target.value })}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Edit description"
                onChange={e => this.setState({ description: e.target.value })}
              />
            </Form.Field>

            <Form.Field>
              <label>Team Size</label>
              <input
                placeholder = {this.state.teamSize}
                type="number"
                onChange={e => this.setState({ teamSize: e.target.value })}
              />
            </Form.Field>
          </Segment>

        <Segment>
          <Form.Field>
            <label>Deadline</label>
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
          </Form.Field>

          <Form.Field>
            <label> Private </label>
            <Dropdown placeholder="Select Privacy" fluid selection options = {privateOptions} />
          </Form.Field>
        </Segment>

        <Segment>
          <Form.Field>
           <label> Edit Tags </label>
            <Form.Input
              icon="tags"
              iconPosition="left"
              placeholder="Enter tags for this project"
              onChange={e => this.setState({ tagForm: e.target.value })}
              value={this.state.tagForm}
            />
            <Button
              color="linkedin"
              onClick={this.handleAddTags}
              size = "mini"
            >
              Add Tag
            </Button>
          </Form.Field>
          
          <Form.Field>
            <label> Current Tags </label>
            <CurrentTags onRemoveTag={this.handleRemoveTag} tags={this.state.tags} />
          </Form.Field>
        </Segment>
      </Segment.Group>

        <Segment>
          <Header>Current Members</Header>
          {this.state.membersViewer}
        </Segment>

        <Segment.Group horizontal>
          <Segment textAlign="center">
            {" "}
            <Form.Field>
              <Modal
                trigger={
                  <Button color="green" onClick={this.props.closeform}>
                    Member Requests
                  </Button>
                }
                size="mini"
              >
                <Header icon="address card" content="Member Requests" />
                <Modal.Content>{this.state.pendingMembersView}</Modal.Content>
                <Modal.Actions>
                  <Button color="red" inverted>
                    <Icon name="remove" /> Cancel
                  </Button>
                  <Button color="linkedin" inverted>
                    <Icon name="checkmark" /> Confirm
                  </Button>
                </Modal.Actions>
              </Modal>
            </Form.Field>
          </Segment>
          <Segment textAlign="center">
            <Form.Field>
              <Button negative>Leave Group</Button>
            </Form.Field>
          </Segment>
        </Segment.Group>
      </Form>
    );
  }
}
