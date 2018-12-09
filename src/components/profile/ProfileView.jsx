import React, { Component } from "react";
import { getUserProfile } from "../../server/api";
import { Grid, Image, Segment } from "semantic-ui-react";
import { getProjectInfo, updateUserProfile } from "../../server/api";
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
      currentProjectsXids: [],
      previousProjects: [],
      previousProjectsXids: []
    };
    this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);
    this.fillAllProjects = this.fillAllProjects.bind(this);
  }

  componentDidMount() {
    console.log(typeof UserSession.getEmail());
    const profDataPromise = getUserProfile(UserSession.getEmail());
    profDataPromise.then(response => {
      console.log(response);
      if (response.currentprojects !== undefined || response.previousprojects !== undefined) {
        let allProjectIDs = [];
        allProjectIDs = response.currentprojects.concat(
          response.previousprojects
        );
        //if (allProjectIDs != undefined) {
        console.log(allProjectIDs);
        this.fillAllProjects(allProjectIDs, response.currentprojects.length);
      }
      else {
        console.log("no projects");
      }
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
      this.setState({
        currentProjects: allProjects.slice(0, currentProjectsIndex),
        currentProjectsXids: allProjectIDs.slice(0, currentProjectsIndex),
        previousProjects: allProjects.slice(
          currentProjectsIndex,
          response.length
        ),
        previousProjectsXids: allProjectIDs.slice(
          currentProjectsIndex,
          response.length
        )
      });
      /*
      console.log(this.state.currentProjects);
      console.log(this.state.previousProjects);
      console.log(this.state.profileDescription);
      */
    });
  }

  handleDescriptionSubmit(newDescription) {
    console.log(UserSession.getEmail());
    console.log(UserSession.getProfileImage());
    console.log(this.state);
    let userList = {
      email: UserSession.getEmail(),
      profileimage: UserSession.getProfileImage(),
      profiledescription: newDescription,
      //endorsements: this.state.endorsements,
      currentprojects: this.state.currentProjectsXids,
      previousprojects: this.state.previousProjectsXids
    };

    const updatePromise = updateUserProfile(userList);
    updatePromise.then(response => {
      console.log(response);
      this.setState({ profileDescription: newDescription });
    });
  }

  render() {
    console.log("Rendering Profile");
    return (
      <Segment loading={this.state.loading}>

            <Grid columns={2} style={{width:'100vh'}}>
              <Grid.Row centered>
                <Grid.Column width={8} textAlign='center'>
                  <h1>Profile</h1>
                  <Image
                    centered
                    src={UserSession.getProfileImage()}
                    size="small"
                    rounded
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                <ProfileDescriptionWidget
                    profileDescription={this.state.profileDescription}
                    handleSubmit={this.handleDescriptionSubmit}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <CurrentProjectsTable
                    currentProjects={this.state.currentProjects}
                  />
                  <PreviousProjectsTable
                    previousProjects={this.state.previousProjects}
                  />
                </Grid.Column>
                <Grid.Column width={8}>


                  <Segment textAlign='center' style={{height:'100%', width:'100%'}}>
                    Endorsements
                  </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
      </Segment>
    );
  }
}

