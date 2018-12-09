import React, { Component } from "react";
import { getProjectInfo, getUserProfile } from "../../server/api";
import { Segment, Pagination, Header, Grid } from "semantic-ui-react";
import GatewayProjectTileEvent from "./GatewayProjectTileEvent";
import UserSession from "../../server/UserSession";

export default class GatewayProjectTable extends Component {
  constructor(props) {
    super(props);
    this.tableGenerate = this.tableGenerate.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    //TODO GRAB NUMBER OF PROJECTS FROM BACKEND
    this.state = {
      empty: false,
      projsPerPage: 4,
      tableRows: [],
      activePage: 1,
      projectList: []
    };
  }
  componentDidMount() {
    const userProfilePromise = getUserProfile(UserSession.getEmail());
    userProfilePromise.then(response => {
      //console.log(response);
      var idArray = response.currentprojects;
      //console.log(idArray);
      if (idArray !== undefined) {
        const projDataPromise = getProjectInfo(idArray);
        projDataPromise
          .then(response => {
            console.log(response);
            console.log(response.projects);
            console.log(response.percentdone);
            this.setState({ projectList: response.projects });
            return response;
          })
          .then(response => {
            //console.log(this.state.projectList);
            this.tableGenerate(this.state.activePage);
          });
      } else {
        this.setState({ empty: true });
      }
    });
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
      i < activePage * this.state.projsPerPage &&
      i < this.state.projectList.length;
      i++
    ) {
      list.push(
        <GatewayProjectTileEvent
          projectId={this.state.projectList[i].xid}
          projName={this.state.projectList[i].title}
          groupSize={this.state.projectList[i].groupsize}
          tags={this.state.projectList[i].tags}
          key={this.state.projectList[i].xid}
        />
      );
    }
    //console.log(list);
    this.setState({ tableRows: list, activePage: activePage });
    //console.log(this.state.tableRows);
  }

  render() {
    return (
      <Segment>
        {!this.state.empty && (
          <Segment>
            <Segment.Group style={{ width: "80vh" }}>
              {this.state.tableRows}
            </Segment.Group>
            {Math.ceil(
              this.state.projectList.length / this.state.projsPerPage
            ) > 1 && (
              <Pagination
                totalPages={Math.ceil(
                  this.state.projectList.length / this.state.projsPerPage
                )}
                boundaryRange={1}
                activePage={this.state.activePage}
                onPageChange={this.handlePaginationChange}
              />
            )}
          </Segment>
        )}
        {this.state.empty && <Header>No Current Projects Found</Header>}
      </Segment>
    );
  }
}
