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

    this.setState({ activeIndex: newIndex, isVis: !this.state.isVis });
  };
  render() {
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
                      Group Size: {this.props.groupSize}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="id badge outline" />
                    <List.Content>Role: {this.props.projRole}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="tags" />
                    <List.Content>
                      Tags: Software, Workflow, CSE110
                    </List.Content>
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
