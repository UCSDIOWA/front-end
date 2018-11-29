import React, { Component } from "react";

import { Segment, Pagination, Table, Grid } from "semantic-ui-react";
import GatewayProjectTileEvent from "./GatewayProjectTileEvent";

export default class GatewayProjectTable extends Component {
  constructor(props) {
    super(props);
    this.tableGenerate = this.tableGenerate.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    //TODO GRAB NUMBER OF PROJECTS FROM BACKEND
    this.state = {
      projsPerPage: 4,
      tableRows: [],
      activePage: 1,
      testList: [
        {
          projName: "name1",
          groupSize: 5,
          projRole: "role1",
          percentDone: 34,
          tags: "Hello, my, name, jeff"
        },
        {
          projName: "name2",
          groupSize: 5,
          projRole: "role2",
          percentDone: 34,
          tags: "Hello, my, name, jeff"
        },
        {
          projName: "name3",
          groupSize: 5,
          projRole: "role3",
          percentDone: 34,
          tags: "Hello, my, name, jeff"
        },
        {
          projName: "name4",
          groupSize: 5,
          projRole: "role4",
          percentDone: 34,
          tags: "Hello, my, name, jeff"
        },
        {
          projName: "name5",
          groupSize: 5,
          projRole: "role5",
          percentDone: 34,
          tags: "Hello, my, name, jeff"
        }
      ]
    };
  }

  handlePaginationChange = (e, { activePage }) => {
    this.tableGenerate(activePage);
  };

  tableGenerate(activePage) {
    var list = [];
    //loop through retrieved current projects and grab each based on active page index
    for (
      //grabs up to 4 total projects to populate a page of the pagination
      var i = (activePage - 1) * this.state.projsPerPage;
      i < activePage * this.state.projsPerPage && i < this.props.totalProjs;
      i++
    ) {
      list.push(
          <GatewayProjectTileEvent
            isFinished={false}
            projName={this.state.testList[i].projName}
            groupSize={this.state.testList[i].groupSize}
            projRole={this.state.testList[i].projRole}
            percentDone={this.state.testList[i].percentDone}
            tags={this.state.testList[i].tags}
            key={i}
          />
  
      );
    }
    this.setState({ tableRows: list, activePage: activePage });
  }

  //calls on every re-render
  componentDidMount() {
    this.tableGenerate(this.state.activePage);
  }
  render() {
    return (
      <Segment>
        <Segment.Group style={{width:'50vh'}} >{this.state.tableRows}</Segment.Group>
        <Pagination
          totalPages={Math.ceil(
            this.props.totalProjs / this.state.projsPerPage
          )}
          boundaryRange={0}
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationChange}
        />
      </Segment>
    );
  }
}
