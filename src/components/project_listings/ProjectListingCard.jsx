import React, { Component } from "react";
import { Card, Image} from "semantic-ui-react";
import holderImage from "../../resources/holder-image.jpg";

export default class ProjectListingCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Card fluid centered>
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