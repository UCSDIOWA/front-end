import React, { Component } from "react";
import { getProjectListings } from "../../server/api";
import ProjectListingsContainer from "./ProjectListingsContainer";
import ProjectNameSearch from "./ProjectNameSearch";
import { Grid } from "semantic-ui-react";
import _ from 'lodash';


/**
 * View of project listings and search 
 *   { title: string, project_leader: string, percentage_done: float, 
 *    group_size: int, user_roles: list[{user_email: string, user_role: string}], 
 *    description: string, tags: list[string] }
}
 */
var listings = []
export default class ProjectListingsView extends Component {
  constructor(props) {
    // listings is the list of all listings, 
    // searchResults is whats displayed in search form, 
    // searchListings is whats displayed in the cards layout
    super(props);
    this.state = {
      searchResults: [],
      searchListings: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchResultsReset = this.handleSearchResultsReset.bind(this);
    this.handleSearchResultsSelect = this.handleSearchResultsSelect.bind(this);
  }

  // update states upon mounting
  componentDidMount() {
    //make rest call to backend
    var listingData = getProjectListings();
    // map a key to each listing and a description for search display
    listingData = listingData.map(s => ({ ...s, key: s.title + s.project_leader }));
    listingData = listingData.map(s => ({...s, description: s.project_leader}));
    

    this.convertToPages(listingData,
      () => {
        listings = listingData;
        this.setState((prevState) => {
          return {searchResults: []};
        });
    })
    
  }

  // callback to ensure conversion for search listings
  convertToPages(pagesListings, callback) {
    var tempArr = pagesListings.slice();
    var newPagesListings = []
    while(tempArr.length) {
      newPagesListings.push(tempArr.splice(0,3));
    }
    this.setState({searchListings: newPagesListings});
    callback();

  }

  // when search is cleared
  handleSearchResultsReset() {
    this.convertToPages(listings,
      () => {
        this.setState((prevState) => {
        return {searchResults: []};
      });
    })
  }

  handleSearchResultsSelect(value) {
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.title)
    this.handleSearchChange(isMatch);
  }

  handleSearchChange(isMatch) {
    var searchResults = _.filter(listings, isMatch)
    this.convertToPages(searchResults,
      () => {
        this.setState((prevState) => {
          return {searchResults: searchResults};
        });
    })
  }

  render() {
    
    return (
      <Grid padded style={{height: '100vh', width: '100vh'}}>
        <Grid.Row style={{height:'10%'}}>
          <Grid.Column width={16}>
            <ProjectNameSearch 
              projectListings={listings}
              onSearchResultsReset={this.handleSearchResultsReset}
              onSearchChange={this.handleSearchChange}
              onSearchResultsSelect={this.handleSearchResultsSelect}
              results={this.state.searchResults}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{height:'90%'}}>
          <Grid.Column width={16}>
            <ProjectListingsContainer projectListings={this.state.searchListings}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
