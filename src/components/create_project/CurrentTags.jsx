import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import Tag from "./Tag"

export default class CurrentTags extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(index) {
    this.props.onRemoveTag(index);
  }

  render() {
    var currentTags = this.props.tags.map((tag, index) => {
      return <Tag key={index} index={index} onRemove={this.handleRemove} tag={tag} />
    }
    )
    return (
      <div>
        {currentTags}
      </div>
    );
  }
}