import React, {Component} from "react";
import ProjectListingCard from "./ProjectListingCard";
import {Icon, Button, Card, Header, Pagination, Grid, Segment} from "semantic-ui-react";


// props: image, projectTitle, projectLeader, description, extra (extra components to render)
export default class ProjectListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {activePage: 1};
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  // TODO connect to backend
  requestButton = () => (
    <Button inverted color="blue" primary floated='right' onClick={() => {
        alert('Request sent!');
      }}>
      Request to Join
          <Icon name='right chevron' />
    </Button>
  );

  render() {
    const noProjectListingFound = <Segment style={{height:'100%'}} >No Project Found</Segment>;
    if (this.props.projectListings.length === 0) {
      var toReturn = noProjectListingFound;
    }
    else {
    var toReturn = this.props.projectListings[this.state.activePage - 1].map((projectListing) => (
      <ProjectListingCard 
        key={projectListing.xid}  
        projectTitle={projectListing.title}
        projectLeader={projectListing.projectleader}
        groupSize={projectListing.groupsize}
        projectDescription={projectListing.description}
        tags={projectListing.tags}
        extra={this.requestButton()}
      />
    ))
    }
  
    return (
      <Grid centered padded>
        <Segment textAlign='center' loading={this.props.isLoading} color="blue" inverted style={{width:'100%', height:'100%'}}>
        <Grid.Row>
          <Pagination
            activePage={this.state.activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={this.props.projectListings.length}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group centered style={{width: '100%', height:"75%"}}>
            {toReturn}
          </Card.Group>  
        </Grid.Row>
        </Segment>
      </Grid>
    );

    
  }
}