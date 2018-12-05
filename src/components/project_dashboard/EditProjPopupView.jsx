import React, { Component } from "react";
import { Icon, Button, Modal, Header, Popup } from "semantic-ui-react";
//import EditProjectView from "./EditProjectView";
import EditProjForm from "./EditProjForm";
import { getProjectInfo } from "../../server/api";

export default class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, msName: "" };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  createProjectObject() {
    const projectPromise = getProjectInfo(this.props.xid);
    projectPromise.then(response => {
      var projectObject = {
        xid: response.xid,
        title: response.title,
        projectleader: response.projectleader,
        percentdone: response.percentdone,
        groupsize: response.groupsize,
        isprivate: response.isprivate,
        tags: response.tags,
        deadline: response.deadline,
        calendarid: response.calendarid,
        description: response.description,
        done: response.done,
        joinrequests: response.joinrequests,
        memberslist: response.memberslist,
        milestones: response.milestones,
        pinnedannouncements: response.pinnedannouncements,
        unpinnedannouncements: response.unpinnedannouncements
      };
      return projectObject;
    });
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
            <EditProjForm projectObject={this.createProjectObject} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
