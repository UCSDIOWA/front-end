import React, { Component } from "react";
import { getUserProfile } from "../../server/api";
import { Grid, Image, Segment } from "semantic-ui-react";
import { getProjectInfo } from "../../server/api";
//import holderimage from "../../resources/holder-image.jpg";
import CurrentProjectsTable from "./CurrentProjectsTable";
import PreviousProjectsTable from "./PreviousProjectsTable";
import EndorsementsWidget from "./EndorsementsWidget";
import ProfileDescriptionWidget from "./ProfileDescriptionWidget";
import UserSession from "../../server/UserSession";
export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profileImage: "",
      profileDescription: "",
      endorsements: [],
      currentProjects: [],
      previousProjects: []
    };
    //this.fillAllProjects = this.fillAllProjects.bind(this);
  }

  componentDidMount() {
    console.log(typeof UserSession.getEmail());
    const profDataPromise = getUserProfile(UserSession.getEmail());
    profDataPromise.then(response => {
      console.log(response);
      console.log(response.currentprojects);
      console.log(response.previousprojects);
      var allProjectIDs = response.currentprojects.concat(
        response.previousprojects
      );
      this.fillAllProjects(allProjectIDs, response.currentprojects.length);
      this.setState({
        profileImage: response.profileimage,
        profileDescription: response.profiledescription,
        endorsements: response.endorsements,
        loading: false
      });
    });
  }
  fillAllProjects(allProjectIDs, currentProjectsIndex) {
    console.log(allProjectIDs);
    console.log(currentProjectsIndex);
    const projDataPromise = getProjectInfo(allProjectIDs);
    projDataPromise.then(response => {
      console.log("project response: ");
      console.log(response);
      let allProjects = response.projects;
      console.log(allProjects);
      console.log(typeof allProjects);
      console.log(allProjects[0]);
      this.setState({
        currentProjects: allProjects.slice(0, currentProjectsIndex),
        previousProjects: allProjects.slice(
          currentProjectsIndex,
          response.length
        )
      });
      console.log(this.state.currentProjects);
      console.log(this.state.previousProjects);
    });
  }

  render() {
    console.log("In render: ");
    console.log(this.state.currentProjects);
    return (
      <Segment loading={this.state.loading}>
        <div>
          <div>
            <Grid className="profile-header">
              <Grid.Row>
                <Grid.Column width={5} verticalAlign="bottom">
                  <h1>Profile</h1>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Image
                    src={UserSession.getProfileImage()}
                    width="80px"
                    rounded={true}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <div>
            <Grid columns={2} divided="vertically" className="profile-grid">
              <Grid.Row>
                <Grid.Column>
                  <CurrentProjectsTable
                    currentProjects={this.state.currentProjects}
                  />
                  <PreviousProjectsTable
                    previousProjects={this.state.previousProjects}
                  />
                </Grid.Column>
                <Grid.Column className="profile-columns3">
                  <ProfileDescriptionWidget
                    profileDescription={this.state.profileDescription}
                  />
                  {/*  <EndorsementsWidget endorsements={this.state.endorsements} /> */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </Segment>
    );
  }
}
