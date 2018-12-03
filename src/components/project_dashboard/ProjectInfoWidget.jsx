import React, { Component } from "react";
import { Segment, List, Label } from "semantic-ui-react";


export default class ProjectInfoWidget extends Component {
  render() {
    return (
      <Segment>
          <List >
            <List.Item floated='left' icon='chess king' content={"project leader: " + this.props.projectLeader} />
            <List.Item floated='left' icon='lock' content={"private: " + this.props.isPrivate} />
            <List.Item floated='left' icon='group' content={"group size: " + this.props.groupSize} />
            <List.Item floated='left' icon='calendar outline' content={"deadline: " + this.props.deadline} />
            <List.Item floated='left' icon='pencil alternate' content={"description: " +  this.props.description} />
            <List.Item floated='left' icon='handshake outline' content={this.props.memberslist!=null && this.props.memberslist.map((member, index) => {return <Label key={index}>{member}</Label>;})} />
            <List.Item floated='left' icon="tags" content={this.props.tags!=null && this.props.tags.map((tag, index) => {return <Label key={index}>{tag}</Label>;})}/>
          </List>
      </Segment>
    );
  }
}