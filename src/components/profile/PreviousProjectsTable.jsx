import React, { Component } from "react";
import { Segment, Header, Table } from "semantic-ui-react";
import ProjectTileEvent from "./ProjectTileEvent";

export default class PreviousProjectsTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const noPreviousProjectsFound = <Segment textAlign='center'><h2> No Previous Projects</h2></Segment>;
    var Rows;
    if (this.props.previousProjects.length === 0) {
      Rows = noPreviousProjectsFound;
    } else {
      Rows = this.props.previousProjects.map(previousProject => (
        <tbody>
          <ProjectTileEvent
            projectId={previousProject.xid}
            isFinished={true}
            description={previousProject.description}
            projectleader={previousProject.projectleader}
            projName={previousProject.title}
            groupSize={previousProject.groupsize}
            tags={previousProject.tags}
          />
        </tbody>
      ));
    }

    return (
      <Segment style={{width:'100%'}}>
        <Header>Previous Project(s)</Header>
        <Table celled>{Rows}</Table>
      </Segment>
    );
  }
}

