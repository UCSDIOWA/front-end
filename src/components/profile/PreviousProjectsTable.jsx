import React, { Component } from "react";
import { Segment, Header, Table } from "semantic-ui-react";
import ProjectTileEvent from "./ProjectTileEvent";

export default class PreviousProjectsTable extends Component {
  constructor(props) {
    super(props);
    this.tableGenerate = this.tableGenerate.bind(this);
    this.state = { numberViews: 4, tableRows: [] };
  }

  tableGenerate() {
    this.state.tableRows = [];
    for (var i = 0; i < this.state.numberViews; i++) {
      this.state.tableRows.push(
        <tbody key={i}>
          <ProjectTileEvent
            isFinished={true}
            projName="Gary's CSE110 Group"
            groupSize={6}
            projRole="Software Architect"
          />
        </tbody>
      );
    }
  }

  render() {
    this.tableGenerate();
    return (
      <Segment className="profile-columns1">
        <Header>Previous Project(s)</Header>
        <Table celled>{this.state.tableRows}</Table>
      </Segment>
    );
  }
}
