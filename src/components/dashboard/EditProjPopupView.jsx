import React, { Component } from "react";
import { Icon, Button, Popup } from "semantic-ui-react";
//import EditProjectView from "./EditProjectView";
import EditProjForm from "./EditProjForm";

export default class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div>
        <Popup
          trigger={
            <Button icon labelPosition="left">
              <Icon name="settings" />
              Edit Project
            </Button>
          }
          content={<EditProjForm closepopup={this.handleClose} />}
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          on="click"
        />
      </div>
    );
  }
}
