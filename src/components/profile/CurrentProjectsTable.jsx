import React, { Component } from "react";
import { Segment, Header, Table } from "semantic-ui-react";
import ProjectTileEvent from "./ProjectTileEvent";
import { getProjectInfo } from "../../server/api";

export default class CurrentProjectsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRows: []
    };
  }

  getProjects(projHolder) {
    for (var i = 0; i < this.props.currProj.length; i++) {
      const profDataPromise = getProjectInfo(this.props.currProj[i]);
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
            projName={projectInfoList[i].project_name}
            groupSize={projectInfoList[i].group_size}
            projRole="Software Architect"
            percentDone={projectInfoList[i].percent_done}
          />
        </tbody>
      );
    }
    callback();
  }

  componentDidMount() {
    projHolder = [];
    this.getProjects(projHolder);
    tempTable = [];
    this.fillTable(tempTable, projHolder, () => {
      this.setState({ tableRows: tempTable });
    });
  }

  render() {
    return (
      <Segment className="profile-columns1">
        <Header>Current Project(s)</Header>
        <Table celled>{tableRows}</Table> />
      </Segment>
    );
  }
}
