import React, { Component } from "react";
import { getProjectListings } from "../../server/api";
import ProjectListingsContainer from "./ProjectListingsContainer";
import ProjectNameSearch from "./ProjectNameSearch";
import { Grid } from "semantic-ui-react";
import _ from 'lodash';
import UserSession from "../../server/UserSession";


/**
 * View of project listings and search 
 *   { title: string, project_leader: string, percentage_done: float, 
 *    group_size: int, 
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
      searchListings: [],
      isLoading: false
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchResultsReset = this.handleSearchResultsReset.bind(this);
    this.handleSearchResultsSelect = this.handleSearchResultsSelect.bind(this);
  }

  // update states upon mounting
  componentDidMount() {
    const listingsPromise = getProjectListings(UserSession.getEmail());
    this.setState({isLoading: true});
    listingsPromise.then(response => {
      console.log("get listings response: ");
      console.log(response);
      let successful = response.success;
      if (!successful) {
        alert("Error loading projects")
      }
      // should be the second value in the aray
      return response.projects;
    })
      .then((listingData)=> {
        this.setState({isLoading: false});

        listingData = listingData.map(s => ({ ...s, key: s.xid }));
        listingData = listingData.map(s => ({...s, description: s.project_leader}));
        
        listings = listingData;
        let newSearchListings = [];
        this.convertToPages(listingData, newSearchListings,
          () => {
            this.setState((prevState) => {
              return {searchResults: [], searchListings: newSearchListings};
            });
        })
      })
      .catch(error => {
        console.log("set listings error: ");
        console.log(error);
      })
    
  }

  // callback to ensure conversion for search listings
  convertToPages(pagesListings, newSearchListings, callback) {
    var tempArr = pagesListings.slice();

    while(tempArr.length) {
      newSearchListings.push(tempArr.splice(0,3));
    }

    callback();
  }

  // when search is cleared
  handleSearchResultsReset() {
    var newSearchListings = [];
    this.convertToPages(listings, newSearchListings,
      () => {
        this.setState((prevState) => {
        return {searchResults: [], searchListings: newSearchListings};
      });
    })
  }

  handleSearchResultsSelect(value) {
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.title)
    this.handleSearchChange(isMatch);
  }

  handleSearchChange(isMatch) {
    var searchResults = _.filter(listings, isMatch);
    var newSearchListings = [];
    this.convertToPages(searchResults, newSearchListings,
      () => {
        this.setState((prevState) => {
          return {searchResults: searchResults, searchListings: newSearchListings};
        });
    })
  }

  render() {
    
    return (
      <Grid padded style={{height: '100vh', width: '100vh'}}>
        <Grid.Row style={{height:'15%'}}>
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
        <Grid.Row style={{height:'85%'}}>
          <Grid.Column width={16}>
            <ProjectListingsContainer 
              isLoading={this.state.isLoading} 
              projectListings={this.state.searchListings}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
