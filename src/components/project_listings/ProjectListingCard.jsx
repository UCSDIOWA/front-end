import React, { Component } from "react";
import { Card, Image, Button, Item } from "semantic-ui-react";
import holderImage from "../../resources/holder-image.jpg";


// { project_name: string, project_leader: string, percentage_done: float, 
// group_size: int, user_roles: list[{user_email: string, user_role: string}], 
// description: string, tags: list }


export default class ProjectListingCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Card fluid>
        <Card.Content>
          <Image floated='right' size='mini' src={holderImage} />
          <Card.Header content={this.props.projectTitle} />
          <Card.Meta content={this.props.projectLeader}/>
          <Card.Meta content={"group size "+ this.props.groupSize}/>
          <Card.Description content={this.props.projectDescription}/>
          <Card.Meta content={this.props.tags}/>
        </Card.Content>
        <Card.Content extra>
          {this.props.extra}
        </Card.Content>
      </Card>
    );
  }
}