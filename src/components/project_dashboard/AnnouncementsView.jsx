import React, { Component } from "react";
import { Segment, Comment, Icon, Grid, Input, Modal } from "semantic-ui-react";
import holderimage from "../../resources/holder-image.jpg";

export default class AnnouncementsView extends Component {
  render() {
    return (
      <Segment textAlign="center">
        <h1>Project Announcements</h1>
        <Segment>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src={holderimage} />
              <Comment.Content>
                <Comment.Author as="a">Gary</Comment.Author>
                <Comment.Metadata>
                  <div> Pinned Yesterday at 5:00pm</div>

                  <div>
                    <Icon name="hand lizard" />
                    x12 Acknowledgements
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  Changed the docker file. Make sure you read the documentation!
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action> Got it! </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Segment>
      </Segment>
    );
  }
}
