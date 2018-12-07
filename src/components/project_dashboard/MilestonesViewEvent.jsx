import React, { Component } from "react";
import {
  Popup,
  Segment,
  Icon,
  Button,
  Modal,
  Confirm
} from "semantic-ui-react";
import MilestoneEventPopup from "./MilestoneEventPopup";

export default class MilestonesViewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinish: this.props.isFinish,
      deleteOpen: false,
      finishOpen: false
    };
    this.handleEditMS = this.handleEditMS.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFinishMS = this.handleFinishMS.bind(this);
    this.handleFinishConfirm = this.handleFinishConfirm.bind(this);
  }
  handleEditMS() {
    this.setState({ deleteOpen: !this.state.deleteOpen });
  }
  handleDelete() {
    //TODO include backend call to send deleted milestone id
    this.props.deleteFunc(this.props.msWeight, this.props.msID);
  }

  handleFinishConfirm() {
    //method is for showing/hiding confirmation popup for finish ms
    this.setState({ finishOpen: !this.state.finishOpen });
  }

  handleFinishMS() {
    //TODO tell backend to update finishMS request to flip boolean
    if (this.state.isFinish == false) {
      this.props.updateProgFunc(this.props.msWeight);
    } else {
      this.props.decrementProgFunc(this.props.msWeight);
    }
    //TODO handle call to backend to send completion for MS id
    this.setState({
      isFinish: !this.state.isFinish,
      finishOpen: !this.state.finishOpen
    });
  }

  render() {
    return (
      <Segment vertical textAlign="center">
        {(!this.state.isFinish && (
          <Icon
            name={!this.props.isDelete ? "circle outline" : "x"}
            onClick={
              !this.props.isDelete
                ? this.handleFinishConfirm
                : this.handleEditMS
            }
            color={!this.props.isDelete ? "black" : "red"}
          />
        )) ||
          (this.state.isFinish && (
            <Icon
              name="check circle outline"
              color="green"
              onClick={this.handleFinishConfirm}
            />
          ))}
        <Confirm
          open={this.state.deleteOpen}
          onCancel={this.handleEditMS}
          onConfirm={this.handleDelete}
          content={"Delete " + this.props.msName + "?"}
          confirmButton="Yep!"
          cancelButton="Nope!"
        />
        <Confirm
          open={this.state.finishOpen}
          onCancel={this.handleFinishConfirm}
          onConfirm={this.handleFinishMS}
          content={
            !this.state.isFinish
              ? this.props.msName + " is completed?"
              : this.props.msName + " actually isnt done?"
          }
          confirmButton={
            !this.state.isFinish
              ? "Yep!"
              : "Yes, please un-complete this milestone."
          }
          cancelButton={
            !this.state.isFinish ? "Nope!" : "Nope, it's still done!"
          }
        />

        <Popup
          content={
            <MilestoneEventPopup
              msName={this.props.msName}
              msWeight={this.props.msWeight}
              msDeadline={this.props.msDeadline}
              msDescription={this.props.msDescription}
            />
          }
          trigger={<Button>{this.props.msName}</Button>}
          on="click"
          basic
          position="top center"
        />
      </Segment>
    );
  }
}
