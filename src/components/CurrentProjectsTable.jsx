import React, { Component } from "react";

import { Segment, Header, Image, Table } from "semantic-ui-react";
import ProjectTileEvent from "./ProjectTileEvent";


export default class CurrentProjectsTable extends Component {
  constructor(props) {
    super(props);
    this.tableGenerate = this.tableGenerate.bind(this);
    this.state = { numberViews: 4, tableRows: [] };
  }

  tableGenerate() {
    for (var i = 0; i < this.state.numberViews; i++) {
      this.state.tableRows.push(
        <tbody key={i}>
          <ProjectTileEvent
            isFinished={false}
            projName="Gary's CSE110 Group"
            groupSize={5}
            projRole="Software Architect"
            percentDone={69}
          />
        </tbody>
      );
    }
  }

  render() {
    this.tableGenerate();
    return (
      <Segment className="profile-columns1">
        <Header>Current Project(s)</Header>
        <Table celled>{this.state.tableRows}</Table>
      </Segment>
    );
  }
}
