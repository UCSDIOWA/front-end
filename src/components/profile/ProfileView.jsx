import React, { Component } from "react";
import { getUserProfileInfo } from "../../server/api";
import { Grid, Image } from "semantic-ui-react";

//import holderimage from "../../resources/holder-image.jpg";
import CurrentProjectsTable from "./CurrentProjectsTable";
import PreviousProjectsTable from "./PreviousProjectsTable";
import EndorsementsWidget from "./EndorsementsWidget";
import ProfileDescriptionWidget from "./ProfileDescriptionWidget";
import paulImage from "../../resources/paul_cao.jpg";
export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      profileDescription: null,
      endorsements: null,
      currentProjects: null,
      previousProjects: null
    };
    this.getUserProfileInfo = this.getUserProfileInfo.bind(this);
  }

  componentDidMount() {
    this.getUserProfileInfo(this.props.username);
  }

  getUserProfileInfo(useremail) {
    const profDataPromise = getUserProfileInfo(useremail);
    profDataPromise.then(response => {
      console.log("profile response: ");
      console.log(response);

      this.setState({
        profileImage: response.toString().profileImage,
        profileDescription: response.toString().profileDescription,
        endorsements: response.toString().endorsements,
        currentProjects: response.toString().currentProjects,
        previousProjects: response.toString().previousProjects
      });
    });
  }

  render() {
    const testDesc =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus";
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
                <CurrentProjectsTable />
                <PreviousProjectsTable />
              </Grid.Column>
              <Grid.Column className="profile-columns3">
                <ProfileDescriptionWidget />
                <EndorsementsWidget />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
