import React, { Component } from "react";

import { Segment, Header, Table } from "semantic-ui-react";
import ProjectTileEvent from "./ProjectTileEvent";

export default class CurrentProjectsTable extends Component {
  constructor(props) {
    super(props);
    this.tableGenerate = this.tableGenerate.bind(this);
    //TODO GRAB NUMBER OF PROJECTS FROM BACKEND
    this.state = { numberViews: 4, tableRows: [] };
  }

  tableGenerate() {
    var list = [];
    //loop through retrieved current projects and grab each
    for (var i = 0; i < this.state.numberViews; i++) {
      list.push(
        <tbody key={i}>
          <ProjectTileEvent
            isFinished={false}
            projName="Gary's CSE110 Group"
            groupSize={5}
            projRole="Software Architect"
            percentDone={30}
            key={i}
          />
        </tbody>
      );
    }
    this.setState({ tableRows: list });
  }

  //calls on every re-render
  componentDidMount() {
    this.tableGenerate();
  }
  render() {
    return (
      <Segment className="profile-columns1">
        <Header>Current Project(s)</Header>
        <Table celled>{this.state.tableRows}</Table>
      </Segment>
    );
  }
}
