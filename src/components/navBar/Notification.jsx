import React, { Component } from "react";
import { Segment, Message } from "semantic-ui-react";
import "./notification.css"


export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onViewNotification(this.props.index);
    this.props.onClick()
  }

  render() {

    return ( 
      <Segment 
        className="Change" 
        content={this.props.content} 
        onClick={this.handleOnClick}
      />
    )
  };
  
}