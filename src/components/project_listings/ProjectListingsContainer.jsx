import React, {Component} from "react";
import ProjectListingCard from "./ProjectListingCard";
import {Icon, Button, Card, Header, Pagination, Grid} from "semantic-ui-react";


// props: image, projectTitle, projectLeader, description, extra (extra components to render)
export default class ProjectListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {activePage: 1};
  }


  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  requestButton = () => (
    <Button inverted color="blue" primary floated='right' onClick={() => {
        alert('Request sent!');
      }}>
      Request to Join
          <Icon name='right chevron' />
    </Button>
  );

  render() {
    const noProjectListingFound = <Header>No Project Found</Header>;
    if (this.props.projectListings.length === 0) {
      var toReturn = noProjectListingFound;
    }
    else {
    var toReturn = this.props.projectListings[this.state.activePage - 1].map((projectListing) => (
      <ProjectListingCard 
        key={projectListing.project_leader}  
        projectTitle={projectListing.title}
        projectLeader={projectListing.project_leader}
        groupSize={projectListing.group_size}
        projectDescription={projectListing.project_description}
        tags={projectListing.tags}
        extra={this.requestButton()}
      />
    ))
    }
  
    return (
      <Grid centered padded>
        <Grid.Row>
          <Pagination
            activePage={this.state.activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={this.props.projectListings.length}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group centered style={{width: '100%'}}>
            {toReturn}
          </Card.Group>  
        </Grid.Row>
      </Grid>
    );

    
  }
}