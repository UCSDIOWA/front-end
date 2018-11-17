import React, { Component } from "react";
import {
  Progress,
  Segment,
  Header,
  Icon,
  Button,
  Grid
} from "semantic-ui-react";

export default class MilestonesView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment>
        <Header size="medium">Milestones View</Header>
        <Progress percent={55}>Current Project Progress</Progress>
        <Segment vertical>
          <Icon name="check circle outline" />
          <Button>Sketch plan for essay</Button>
        </Segment>
        <Segment vertical>
          <Icon name="check circle outline" />
          <Button>Make essay skeleton</Button>
        </Segment>
        <Segment vertical>
          <Icon name="check circle outline" />
          <Button>Rough Draft 1</Button>
        </Segment>
        <Segment vertical>
          <Icon name="check circle outline" />
          <Button>Rough Draft 2</Button>
        </Segment>
        <Segment vertical>
          <Segment vertical>
            <Button inverted color="red">
              Remove milestone
            </Button>
          </Segment>
          <Segment vertical>
            <Button inverted color="blue">
              Add milestone
            </Button>
          </Segment>
        </Segment>
      </Segment>
    );
  }
}
