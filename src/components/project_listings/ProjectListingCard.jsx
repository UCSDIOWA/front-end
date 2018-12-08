import React, { Component } from "react";
import { Card, List, Label, Progress, Button, Icon } from "semantic-ui-react";
import UserSession from "../../server/UserSession";
import { sendJoinRequest } from '../../server/api';

export default class ProjectListingCard extends Component {
  constructor(props) {
    super(props);
  }

  requestButton = () => (
    <Button inverted color="blue" primary floated='right' onClick={() => {
 
        const joinReqPromise = sendJoinRequest(this.props.projectId, UserSession.getEmail());
        var sendSuccess = false;
        joinReqPromise.then(response => {
          console.log(response);
          sendSuccess = response.success;
          if (sendSuccess) {
            alert('Request sent!');
          } else {
            alert('Error sending Request, try again later');
          }
        });
      }}>
        Request to Join
        <Icon name='right chevron' />
    </Button>
  );

  render() {

    return (
      <Card fluid centered style={{width:'100%'}}>
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
          {this.requestButton()}
        </Card.Content>
      </Card>
    );
  }
}