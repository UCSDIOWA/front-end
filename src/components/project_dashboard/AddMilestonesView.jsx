import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Grid,
  Input,
  Modal
} from "semantic-ui-react";
import MilestonesViewEvent from "./MilestonesViewEvent";

export default class AddMilestonesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      msName: "",
      msWeight: 0,
      msDeadline: "",
      msDescription: ""
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit() {
    this.props.addMilestone(
      this.state.msName,
      this.state.msWeight,
      this.state.msDeadline,
      this.state.msDescription
    );
    this.handleClose();
  }

  render() {
    return (
      <Modal
        trigger={
          <Button inverted color="blue" onClick={this.handleOpen}>
            Add milestone
          </Button>
        }
        dimmer="blurring"
        size="mini"
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Segment>
          <h1>Add a Milestone!</h1>
          <Segment vertical id="test">
            <Icon name="keyboard" />
            <Input
              placeholder="Name"
              onChange={e => this.setState({ msName: e.target.value })}
            />
          </Segment>
          <Segment vertical>
            <Icon name="weight" />
            <Input
              type="integer"
              placeholder="Weight (Integer)"
              onChange={e => this.setState({ msWeight: e.target.value })}
            />
          </Segment>
          <Segment vertical>
            <Icon name="calendar alternate" />
            <Input
              placeholder="Deadline"
              onChange={e => this.setState({ msDeadline: e.target.value })}
            />
          </Segment>
          <Segment vertical>
            <Icon name="tasks" />
            <Input
              placeholder="Description"
              onChange={e => this.setState({ msDescription: e.target.value })}
            />
          </Segment>
          <Segment vertical>
            <Button inverted color="red" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button inverted color="blue" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Segment>
        </Segment>
      </Modal>
    );
  }
}
