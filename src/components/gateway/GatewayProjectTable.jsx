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
      /* testList: [
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
      ] */
    };
  }
  componentDidMount() {
    const userProfilePromise = getUserProfile(UserSession.getEmail());
    userProfilePromise.then(response => {
      console.log(response);
      var idArray = response.currentprojects;
      console.log(idArray);
      if (idArray !== undefined) {
        const projDataPromise = getProjectInfo(idArray);
        projDataPromise
          .then(response => {
            console.log(response);
            console.log(response.projects);
            this.setState({ projectList: response.projects });
            return response;
          })
          .then(response => {
            console.log(this.state.projectList);
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
    //console.log("herro");
    //console.log(this.state.projectList);
    //console.log(this.state.projectList.length);
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
          isFinished={false}
          projName={this.state.projectList[i].title}
          groupSize={this.state.projectList[i].groupsize}
          //projRole={this.state.projectList[i].projRole}
          percentDone={30}
          tags={this.state.projectList[i].tags}
          key={i}
        />
      );
    }
    console.log(list);
    this.setState({ tableRows: list, activePage: activePage });
    console.log(this.state.tableRows);
  }

  render() {
    return (
      <Segment>
        {!this.state.empty && (
          <Segment>
            <Segment.Group style={{ width: "50vh" }}>
              {this.state.tableRows}
            </Segment.Group>
            <Pagination
              totalPages={Math.ceil(
                this.props.totalProjs / this.state.projsPerPage
              )}
              boundaryRange={0}
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
            />
          </Segment>
        )}
        {this.state.empty && <Header>No Current Projects Found</Header>}
      </Segment>
    );
  }
}
