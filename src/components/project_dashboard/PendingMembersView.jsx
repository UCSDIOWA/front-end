import React, { Component } from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

export default class PendingMembersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }
  handleClose() {
    this.setState({ modalOpen: false });
  }
  render() {
    return (
      <Modal
        trigger={
          <Button color="green" onClick={this.handleOpen}>
            Member Requests
          </Button>
        }
        size="large"
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="address card" content="Member Requests" />
        <Modal.Content>{this.props.pendingMembersView}</Modal.Content>
        <Modal.Actions>
          {/*  <Button color="red" inverted>
            <Icon name="remove" /> Cancel
          </Button> */}
          <Button color="linkedin" inverted onClick={this.handleClose}>
            <Icon name="checkmark" /> Back to Form
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
