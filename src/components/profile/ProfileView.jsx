import React, { Component } from "react";
import { getUserProfile } from "../../server/api";
import { Grid, Image } from "semantic-ui-react";

//import holderimage from "../../resources/holder-image.jpg";
import CurrentProjectsTable from "./CurrentProjectsTable";
import PreviousProjectsTable from "./PreviousProjectsTable";
import EndorsementsWidget from "./EndorsementsWidget";
import ProfileDescriptionWidget from "./ProfileDescriptionWidget";
import paulImage from "../../resources/paul_cao.jpg";
import UserSession from "../../server/UserSession";
export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: "yo",
      profileDescription: "bro",
      endorsements: ["xd"],
      currentProjects: ["dx"],
      previousProjects: ["dx"]
    };
  }

  componentDidMount() {
    const profDataPromise = getUserProfile(UserSession.getEmail());
    profDataPromise.then(response => {
      //console.log(response);
      //console.log("curr proj is: ");
      this.setState({
        profileImage: response.profile_image,
        profileDescription: response.profile_description,
        //endorsements: response.endorsements,
        currentProjects: response.current_projects,
        previousProjects: response.previous_projects
      });
      console.log("curr proj is: ");
      console.log(this.state);
    });
    /* this.getUserProfileInfo(UserSession.getEmail(), response => {
      this.setState({
        profileImage: response.profile_image,
        profileDescription: response.profile_description,
        //endorsements: response.endorsements,
        currentProjects: response.current_projects,
        previousProjects: response.previous_projects
      });
      console.log("states set!");
      console.log(this.state);
    }); */
  }

  /* getUserProfileInfo(useremail, callback) {
    const profDataPromise = getUserProfileInfo(useremail);
    profDataPromise.then(response => {
      console.log(response);
      console.log("curr proj is: ");
      this.setState({
        profileImage: response.profile_image,
        profileDescription: response.profile_description,
        //endorsements: response.endorsements,
        currentProjects: response.current_projects,
        previousProjects: response.previous_projects
      });
      console.log(response.current_projects);
      //callback(response);
    }); */

  //console.log("curr proj is: ");
  //console.log(this.state.currentProjects);
  //}

  render() {
    console.log("In render: ");
    console.log(this.state.currentProjects);

    const testDesc =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus";
    //return <div>{this.state.currentProjects[0]}</div>;

    return (
      <div>
        <div>
          <Grid className="profile-header">
            <Grid.Row>
              <Grid.Column width={5} verticalAlign="bottom">
                <h1>Profile</h1>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src={paulImage} width="80px" rounded={true} />
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
                {/* <PreviousProjectsTable /> */}
              </Grid.Column>
              <Grid.Column className="profile-columns3">
                {/* <ProfileDescriptionWidget /> */}
                <EndorsementsWidget />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
