import React, { Component } from "react";
import { Modal, Header, Button, Icon, Segment, Form } from "semantic-ui-react";
import {
  getProjectInfo,
  updateProject,
  addUser,
  rejectUser
} from "../../server/api";
import PendingMember from "./PendingMember";
import UserSession from "../../server/UserSession";

export default class MemberRequestsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      contents: undefined,
      projectObject: undefined
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.backendCall = this.backendCall.bind(this);
    this.acceptPendingMember = this.acceptPendingMember.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rejectPendingMember = this.rejectPendingMember.bind(this);
  }

  handleOpen() {
    this.backendCall();
    this.setState({ modalOpen: true });
  }
  handleClose() {
    this.setState({ modalOpen: false });
  }
  rejectPendingMember(name) {
    console.log(name);
    console.log(this.state);
    var acceptSuccess = false;
    const acceptPromise = rejectUser(name, this.props.xid);
    acceptPromise.then(response => {
      acceptSuccess = response.success;
      if (!acceptSuccess) {
        alert("Error rejecting from project");
        console.log(response);
      } else {
        // update
        alert("Successfully rejected from project!");
        //this.createProjectObject();
      }
      this.setState(prevState => {
        return {
          //joinrequests: newjoinrequests,
          //memberslist: newmemberslist,
          contents: prevState.contents.filter(e => e.props.name !== name)
        };
      });
      console.log(this.state);
    });
  }
  acceptPendingMember(name) {
    console.log(name);
    console.log(this.state);
    var acceptSuccess = false;
    const acceptPromise = addUser(name, this.props.xid);
    acceptPromise.then(response => {
      acceptSuccess = response.success;
      if (!acceptSuccess) {
        alert("Error adding to project");
        console.log(response);
      } else {
        // update
        alert("Successfully added to project!");
        //this.createProjectObject();
      }
      this.setState(prevState => {
        return {
          //joinrequests: newjoinrequests,
          //memberslist: newmemberslist,
          contents: prevState.contents.filter(e => e.props.name !== name)
        };
      });
      console.log(this.state);
    });

    /* var newjoinrequests = this.state.projectObject.joinrequests;
    var index = this.state.projectObject.joinrequests.indexOf(name); // <-- Not supported in <IE9
    if (index !== -1) {
      newjoinrequests = this.state.projectObject.joinrequests.splice(index, 1);
    }
    var newmemberslist = this.state.projectObject.memberslist;
    newmemberslist.push(name);

    this.setState(prevState => {
      return {
        joinrequests: newjoinrequests,
        memberslist: newmemberslist,
        contents: prevState.contents.filter(e => e.props.name !== name)
      };
    });
    this.handleSubmit(); */
  }
  handleSubmit() {
    console.log(this.state);
    var toReturn = {
      xid: this.state.projectObject.xid,
      title: this.state.projectObject.title,
      projectleader: this.state.projectObject.projectleader,
      percentdone: this.state.projectObject.percentdone,
      groupsize: this.state.projectObject.groupsize,
      isprivate: this.state.projectObject.isprivate,
      tags: this.state.projectObject.tags,
      deadline: this.state.projectObject.deadline,
      calendarid: this.state.projectObject.calendarid,
      description: this.state.projectObject.description,
      done: this.state.projectObject.done,
      joinrequests: this.state.projectObject.joinrequests,
      memberslist: this.state.projectObject.memberslist,
      milestones: this.state.projectObject.milestones,
      pinnedannouncements: this.state.projectObject.pinnedannouncements,
      unpinnedannouncements: this.state.projectObject.unpinnedannouncements
    };
    console.log(toReturn);
    var updateProjectSuccess = false;
    const submitPromise = updateProject(toReturn);
    submitPromise.then(response => {
      console.log(response);
      updateProjectSuccess = response.success;
      if (!updateProjectSuccess) {
        alert("Error updating project");
        console.log(response);
      } else {
        // update
        alert("Successfully updated project!");
        //this.createProjectObject();
      }
    });
  }
  backendCall() {
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
      var temp = [];
      if (this.state.projectObject.joinrequests !== undefined) {
        for (var i = 0; i < this.state.projectObject.joinrequests.length; i++) {
          temp.push(
            <PendingMember
              name={this.state.projectObject.joinrequests[i]}
              handleAccept={this.acceptPendingMember}
              handleReject={this.rejectPendingMember}
            />
          );
        }
      }
      this.setState({ contents: temp });
    });
  }
  render() {
    return (
      <Segment textalign="center">
        <Form.Field>
          <Modal
            trigger={
              <Button
                fluid
                color="green"
                onClick={this.handleOpen}
                textalign="center"
              >
                Member Requests
              </Button>
            }
            size="small"
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Header icon="address card" content="Member Requests" />
            <Modal.Content>{this.state.contents}</Modal.Content>
            <Modal.Actions>
              {/*  <Button color="red" inverted>
                <Icon name="remove" /> Cancel
              </Button> */}
              <Button color="linkedin" inverted onClick={this.handleClose}>
                <Icon name="checkmark" /> Back to Form
              </Button>
            </Modal.Actions>
          </Modal>
        </Form.Field>
      </Segment>
    );
  }
}
