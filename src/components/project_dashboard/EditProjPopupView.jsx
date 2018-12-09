import React, { Component } from "react";
import { Icon, Button, Modal, Header, Popup } from "semantic-ui-react";
//import EditProjectView from "./EditProjectView";
import EditProjForm from "./EditProjForm";
import { getProjectInfo, updateProject } from "../../server/api";

export default class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, msName: "", projObject: undefined };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleTransferLeadership = this.handleTransferLeadership.bind(this);
  }

  handleOpen = () => {
    var temp = this.createProjectObject();
    //this.setState({ projObject: temp });
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit(newFields) {
    var updateProjectSuccess = false;
    console.log(newFields);
    const submitPromise = updateProject(newFields);
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

  createProjectObject() {
    //console.log(this.props.xid);
    //var temp = [this.props.xid]
    const projectPromise = getProjectInfo([this.props.xid]);
    projectPromise.then(response => {
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
      this.setState({ projObject: projectObject });
      //console.log(temp);
      this.setState({ modalOpen: true });
    });
  }

  handleTransferLeadership(name) {
    this.setState({ modalOpen: false });
    this.props.handleTransferLeadership(name);
  }

  render() {
    return (
      <div>
        <Modal
          trigger={
            <Popup
              trigger={
                <Button icon labelPosition="left" onClick={this.handleOpen}>
                  <Icon name="settings" />
                  Edit Project
                </Button>
              }
              content="Edit team members, team size, project name, and other settings of your project"
              hideOnScroll
            />
          }
          closeIcon
          //dimmer="blurring"
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size="large"
        >
          <Header icon="settings" content="Project Settings" />
          <Modal.Content>
            <EditProjForm
              projectObject={this.state.projObject}
              handleSubmit={this.handleSubmit}
              handleCancel={this.handleClose}
              xid={this.props.xid}
              handleTransferLeadership={this.handleTransferLeadership}
            />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
