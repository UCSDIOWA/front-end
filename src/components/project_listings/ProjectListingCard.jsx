import React, { Component } from "react";
import { Card, List, Label, Progress, Segment } from "semantic-ui-react";
import holderImage from "../../resources/holder-image.jpg";

export default class ProjectListingCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Card fluid centered style={{width:'100vh', height:'25vh'}}>
        <Card.Content>
          <List inverted>
            <List.Item>
              <List.Icon name='coffee' />
              <List.Content>
                Project Title: {this.props.projectTitle}
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="chess king" />
              <List.Content>Project Leader: {this.props.projectLeader}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="group" />
              <List.Content>
                Group Size: {this.props.groupSize}
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name="tags" />
              <List.Content>
                Tags: {this.props.tags.map((tag, index) => {return <Label key={index}>{tag}</Label>;})}
              </List.Content>
            </List.Item>
            <List.Item>
              <Progress size='small' percent={this.props.percentDone} progress >Progress Done</Progress>
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          {this.props.extra}
        </Card.Content>
      </Card>
    );
  }
}