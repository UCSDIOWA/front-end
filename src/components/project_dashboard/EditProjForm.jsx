import React, { Component } from "react";
import MembersView from "./MembersView";
import { getEditProjForm } from "../../server/api";
import UserSession from "../../server/UserSession";
import PropTypes from "prop-types";
import CurrentTags from "../create_project/CurrentTags";
import DayPicker from "react-day-picker/DayPickerInput";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";
import PendingMembersView from "./PendingMembersView";
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
  Label,
  Container
} from "semantic-ui-react";
import PendingMember from "./PendingMember";
import { removeUser, transferLeadership } from "../../server/api";

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
    console.log(props);
    this.state = {
      xid: this.props.projectObject.xid,
      title: this.props.projectObject.title,
      projectleader: this.props.projectObject.projectleader,
      percentdone: this.props.projectObject.percentdone,
      groupsize: this.props.projectObject.groupsize,
      description: this.props.projectObject.description,
      deadline: this.props.projectObject.deadline,
      tags: [],
      currentTagsViewer: [],
      tagForm: "",
      calendarid: this.props.projectObject.calendarid,
      done: this.props.projectObject.done,
      isprivate: this.props.projectObject.isprivate,
      memberslist: this.props.projectObject.memberslist,
      membersViewer: [],
      joinrequests: this.props.projectObject.joinrequests,
      milestones: this.props.projectObject.milestones,
      pinnedannouncements: this.props.projectObject.pinnedannouncements,
      unpinnedannouncements: this.props.projectObject.unpinnedannouncements,
      pendingMembersView: [],
      previousState: undefined
    };
    console.log(this.state);
    this.handleRemoveMember = this.handleRemoveMember.bind(this);
    this.handleDeadline = this.handleDeadline.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.populateMembers = this.populateMembers.bind(this);
    //this.populatePendingMembers = this.populatePendingMembers.bind(this);
    this.populateCurrentTags = this.populateCurrentTags.bind(this);
    this.handleAddTags = this.handleAddTags.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.acceptPendingMember = this.acceptPendingMember.bind(this);
    //this.rejectPendingMember = this.rejectPendingMember.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    this.populateCurrentTags();
    //this.populatePendingMembers();
    this.populateMembers();
    console.log(this.state.membersViewer);
  }

  //Populate current tags array
  populateCurrentTags() {
    var temp = [];
    var temp2 = [];
    //console.log(this.props.tags);
    console.log(this.props.projectObject.tags);
    if (this.props.projectObject.tags !== undefined) {
      for (var i = 0; i < this.props.projectObject.tags.length; i++) {
        temp.push(
          <Label>
            {this.props.projectObject.tags[i]}
            <Icon name="delete" />
          </Label>
        );
        temp2.push(this.props.projectObject.tags[i]);
      }
    }
    console.log(temp2);
    this.setState({ currentTagsViewer: temp });
    this.setState({ tags: temp2 });
  }

  //Handles saving tags. Each time the user selects a new tag, we add it to the tags array
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

  //Handles removing tags.
  handleRemoveTag(index) {
    this.setState(prevState => {
      return {
        tags: prevState.tags.filter((_, i) => i !== index)
      };
    });
  }
  handleRemoveMember(name) {
    console.log(name);
    console.log(this.props.xid);
    console.log(this.state);
    var acceptSuccess = false;
    const acceptPromise = removeUser(name, this.props.xid);
    acceptPromise.then(response => {
      console.log(response);
      acceptSuccess = response.success;
      if (!acceptSuccess) {
        alert("Error removing from project");
        console.log(response);
      } else {
        // update
        alert("Successfully removed from project!");
        //this.createProjectObject();
      }
      this.setState(prevState => {
        return {
          //joinrequests: newjoinrequests,
          //memberslist: newmemberslist,
          membersViewer: prevState.membersViewer.filter(
            e => e.props.name !== name
          )
        };
      });
      console.log(this.state);
    });
  }

  //For membersViewer
  populateMembers() {
    var temp = [];
    if (this.props.projectObject.memberslist !== undefined) {
      for (var i = 0; i < this.props.projectObject.memberslist.length; i++) {
        temp.push(
          <MembersView
            projectId={this.state.xid}
            name={this.props.projectObject.memberslist[i]}
            handleRemove={this.handleRemoveMember}
            handleTransferLeadership={this.props.handleTransferLeadership}
          />
        );
      }
    }
    this.setState({ membersViewer: temp });
  }

  handleCancel() {
    this.props.handleCancel();
  }

  handleDeadline(day, { selected }) {
    this.setState({
      deadline: selected
        ? undefined
        : day.getMonth() + 1 + "/" + day.getDate() + "/" + day.getFullYear()
    });
    console.log(this.state.deadline);
  }

  handlePrivacyChange = (e, data) => {
    console.log(data);
    this.setState({
      isprivate: data.value
    });
    console.log(this.state.isprivate);
  };
  handleSubmit() {
    console.log(this.state);
    var toReturn = {
      xid: this.state.xid,
      title: this.state.title,
      projectleader: this.state.projectleader,
      percentdone: this.state.percentdone,
      groupsize: this.state.groupsize,
      isprivate: this.state.isprivate,
      tags: this.state.tags,
      deadline: this.state.deadline,
      calendarid: this.state.calendarid,
      description: this.state.description,
      done: this.state.done,
      joinrequests: this.state.joinrequests,
      memberslist: this.state.memberslist,
      milestones: this.state.milestones,
      pinnedannouncements: this.state.pinnedannouncements,
      unpinnedannouncements: this.state.unpinnedannouncements
    };
    console.log(toReturn);
    this.props.handleSubmit(toReturn);
  }

  render() {
    return (
      <Form>
        <Segment.Group horizontal>
          <Segment>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Form.Field>

            <Form.Field>
              <label>Description</label>
              <input
                placeholder={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </Form.Field>

            <Form.Field>
              <label>Team Size</label>
              <input
                placeholder={this.state.groupsize}
                type="number"
                onChange={e => this.setState({ groupsize: e.target.value })}
              />
            </Form.Field>
          </Segment>

          <Segment>
            <Form.Field>
              <label>Deadline</label>
              <DayPicker
                placeholder={this.state.deadline}
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
              <Dropdown
                placeholder={this.state.isprivate}
                fluid
                selection
                options={privateOptions}
                onChange={this.handlePrivacyChange}
              />
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
              <Button color="linkedin" onClick={this.handleAddTags} size="mini">
                Add Tag
              </Button>
            </Form.Field>

            <Form.Field>
              <label> Current Tags </label>
              <Segment>
                <CurrentTags
                  onRemoveTag={this.handleRemoveTag}
                  tags={this.state.tags}
                />
              </Segment>
            </Form.Field>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Header>Current Members</Header>
            {console.log(this.state.membersViewer)}
            {this.state.membersViewer}
          </Segment>

          {/* <Segment.Group horizontal>
            <Segment textAlign="center">
              {" "}
              {/* <Form.Field>
                <PendingMembersView
                  pendingMembersView={this.state.pendingMembersView}
                />
              </Form.Field> 
            </Segment>
            
          </Segment.Group> */}

          <Segment.Group horizontal>
            <Segment horizontal textAlign="center">
              <Button negative onClick={this.handleCancel}>
                Cancel
              </Button>
            </Segment>
            <Segment horizontal textAlign="center">
              <Button positive onClick={this.handleSubmit}>
                Submit
              </Button>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Form>
    );
  }
}

/*rejectPendingMember(name) {
    this.setState(prevState => {
      return {
        joinrequests: prevState.joinrequests.filter(e => e !== name),
        pendingMembersView: prevState.pendingMembersView.filter(
          e => e.props.name !== name
        )
      };
    });
    console.log(this.state.joinrequests);
    console.log(this.state.pendingMembersView);
  }

  acceptPendingMember(name) {
    console.log(this.state);
    this.setState(prevState => {
      return {
        joinrequests: prevState.joinrequests.filter(e => e !== name),
        memberslist: prevState.memberslist.push(name),
        membersViewer: prevState.membersViewer.push(
          <MembersView name={name} handleRemove={this.handleRemoveMember} />
        ),
        pendingMembersView: prevState.pendingMembersView.filter(
          e => e.props.name !== name
        )
      };
    });
    this.populateMembers();
    console.log(this.state.joinrequests);
    console.log(this.state.membersViewer);
  }

  populatePendingMembers() {
    var temp = [];
    if (this.props.projectObject.joinrequests !== undefined) {
      for (var i = 0; i < this.props.projectObject.joinrequests.length; i++) {
        temp.push(
          <PendingMember
            name={this.props.projectObject.joinrequests[i]}
            handleAccept={this.acceptPendingMember}
            handleReject={this.rejectPendingMember}
          />
        );
      }
    }
    this.setState({ pendingMembersView: temp });
  }*/
