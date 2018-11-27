import React, { Component } from "react";
import { Icon, Button, Modal, Header } from "semantic-ui-react";
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
        <Modal
          trigger={
            <Button icon labelPosition="left">
              <Icon name="settings" />
              Edit Project
            </Button>
          }
          size="small"
        >
          <Header icon="settings" content="Project Settings" />
          <Modal.Content>
            <EditProjForm />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
