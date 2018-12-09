import React, { Component } from "react";
import { Segment, List, Label } from "semantic-ui-react";

export default class ProjectInfoWidget extends Component {
  render() {
    return (
      <Segment>
        <List>
          <List.Item
            floated="left"
            icon="chess king"
            content={"Project leader: " + this.props.projectLeader}
          />
          <List.Item
            floated="left"
            icon="lock"
            content={
              "Private: " + (this.props.isPrivate != undefined ? "Yes" : "No")
            }
          />
          <List.Item
            floated="left"
            icon="group"
            content={"Group Size: " + this.props.groupSize}
          />
          <List.Item
            floated="left"
            icon="calendar outline"
            content={"Deadline: " + this.props.deadline}
          />
          <List.Item
            floated="left"
            icon="pencil alternate"
            content={"Description: " + this.props.description}
          />
          <List.Item
            floated="left"
            icon="handshake outline"
            content={
              this.props.memberslist != null &&
              this.props.memberslist.map((member, index) => {
                return <Label key={index}>{member}</Label>;
              })
            }
          />
          <List.Item
            floated="left"
            icon="tags"
            content={
              this.props.tags != null &&
              this.props.tags.map((tag, index) => {
                return <Label key={index}>{tag}</Label>;
              })
            }
          />
        </List>
      </Segment>
    );
  }
}
