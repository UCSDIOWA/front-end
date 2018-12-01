import React, { Component } from "react";
import {
  Segment,
  Progress,
  Transition,
  List,
  Accordion,
  Header,
  Icon
} from "semantic-ui-react";

export default class ProjectTileEvent extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: -1, isVis: false };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({
      activeIndex: newIndex,
      isVis: !this.state.isVis
    });
  };
  render() {
    var tagsDisplay;
    if (this.props.tags.length != 0) {
      for (let i = 0; i < this.props.tags.length; i++) {
        tagsDisplay = tagsDisplay + ", " + this.props.tags[i];
      }
    } else {
      tagsDisplay = "No tags";
    }
    const { activeIndex, isVis } = this.state;
    return (
      <Segment>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Header as="h4">
              <Header.Content>{this.props.projName}</Header.Content>
              <Icon name="dropdown" />
            </Header>
          </Accordion.Title>
          <Transition.Group animation="slide down" duration={150}>
            {isVis && (
              <Accordion.Content active={activeIndex === 0}>
                {!this.props.isFinished && (
                  <Progress percent={this.props.percentDone} progress />
                )}
                <List>
                  <List.Item>
                    <List.Icon name="group" />
                    <List.Content>
                      Description: {this.props.description}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="chess king" />
                    <List.Content>
                      Project Leader: {this.props.projectleader}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="user" />
                    <List.Content>
                      Group Size: {this.props.groupSize}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="tags" />
                    <List.Content>Tags: {tagsDisplay}</List.Content>
                  </List.Item>
                </List>
              </Accordion.Content>
            )}
          </Transition.Group>
        </Accordion>
      </Segment>
    );
  }
}
