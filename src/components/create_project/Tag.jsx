import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.onRemove(this.props.index);
  }

  render() {

    return (
      <Label onClick={this.handleRemove}>
        {this.props.tag}
        <Icon name='delete' />
      </Label>
    );
  }
}