import React, {Component} from "react";
import ProjectListingCard from "./ProjectListingCard";
import { Icon, Button, Header, Pagination, Grid, Segment } from "semantic-ui-react";


// props: image, projectTitle, projectLeader, description, extra (extra components to render)
export default class ProjectListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {activePage: 1};
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })



  render() {
    const noProjectListingFound = <Header >No Project Found</Header>;
    if (this.props.projectListings.length === 0) {
      var toReturn = noProjectListingFound;
    }
    else {
      let list = this.props.projectListings[this.state.activePage - 1].map((projectListing) => (
        <ProjectListingCard 
          key={projectListing.xid}
          projectTitle={projectListing.title}
          projectLeader={projectListing.projectleader}
          groupSize={projectListing.groupsize}
          percentDone={projectListing.percentdone}
          projectDescription={projectListing.description}
          tags={projectListing.tags}
          projectId={projectListing.xid}
        />
      ))
      var toReturn = list;
    }
  
    return (
      <Grid centered padded>
        <Segment vertical padded loading={this.props.isLoading} style={{width:'100vh', height:'100%'}}>
          <Segment.Group>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={this.props.projectListings.length}
            />
          </Segment.Group>
          <Segment.Group>
            {toReturn}
          </Segment.Group>
        </Segment>
      </Grid>
    );

    
  }
}