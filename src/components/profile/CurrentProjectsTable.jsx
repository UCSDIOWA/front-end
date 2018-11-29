import React, { Component } from "react";
import { Segment, Header, Table } from "semantic-ui-react";
import ProjectTileEvent from "./ProjectTileEvent";
import { getProjectInfo } from "../../server/api";

export default class CurrentProjectsTable extends Component {
  constructor(props) {
    super(props);
    console.log("current projects is: " + this.props.currentProjects);
    this.state = {
      tableRows: this.props.currentProjects
    };
    console.log("length: ");
    console.log(this.props.currentProjects.length);
  }

  /* getProjects(projHolder) {
    console.log("prop is: ");
    console.log(this.props.currentProjects);
    for (var i = 0; i < this.props.currentProjects.length; i++) {
      const profDataPromise = getProjectInfo(this.props.currentProjects[i]);
      profDataPromise.then(response => {
        console.log("project response: ");
        console.log(response);
        projHolder.push(response.toString());
      });
    }
  }

  fillTable(tempTable, projHolder, callback) {
    for (var i = 0; i < projHolder.length; i++) {
      tempTable.push(
        <tbody key={i}>
          <ProjectTileEvent
            isFinished={false}
            projName={projHolder[i].project_name}
            groupSize={projHolder[i].group_size}
            projRole="Software Architect"
            percentDone={projHolder[i].percent_done}
          />
        </tbody>
      );
    }
    callback();
  }

  componentDidMount() {
    var projHolder = [];
    this.getProjects(projHolder);
    var tempTable = [];
    this.fillTable(tempTable, projHolder, () => {
      this.setState({ tableRows: tempTable });
    });
  } */

  componentDidMount() {
    this.setState({ tableRows: this.props.currentProjects });
    console.log("table rows is " + this.state.tableRows);
  }

  render() {
    return (
      <Segment className="profile-columns1">
        <Header>Current Project(s)</Header>
        {this.props.currentProjects}
        {/* <Table celled>{this.state.tableRows[0]}</Table> */}
      </Segment>
    );
  }
}
