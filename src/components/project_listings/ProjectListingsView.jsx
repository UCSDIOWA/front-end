import React, { Component } from "react";
import { getProjectListings } from "../../server/api";
import ProjectListingsContainer from "./ProjectListingsContainer";
import ProjectNameSearch from "./ProjectNameSearch";
import ProjectTagsSearch from "./ProjectTagsSearch";
import { Grid, Segment, Header } from "semantic-ui-react";
import _ from 'lodash';
import UserSession from "../../server/UserSession";


/**
 * View of project listings and search 
 *   { title: string, project_leader: string, percentage_done: float, 
 *    group_size: int, 
 *    description: string, tags: list[string] }
 */

 // listings - const for a list of listings there are
var listings = [];
// allTags - const for a list of all tags there are
var allTags = [];
// filteredListings
var filteredListings = [];
export default class ProjectListingsView extends Component {
  constructor(props) {
    // searchResults is whats displayed in search form, 
    // searchListings is whats displayed in the cards layout
    // tagSelections tags chosen
    super(props);
    this.state = {
      searchValue: '',

      searchResults: [],
      searchListings: [],

      tagSelections: [],
      isLoading: false,

      activePage: 1
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchResultsReset = this.handleSearchResultsReset.bind(this);
    this.handleSearchResultsSelect = this.handleSearchResultsSelect.bind(this);
    this.handleAddTags = this.handleAddTags.bind(this);
    this.filterOnTags = this.filterOnTags.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
        alert("Error loading projects, please try again later");
      }
      return response.projects;
    })
      .then((listingData) => {
        this.setState({isLoading: false});
        console.log(listingData);
        listingData = listingData.map(s => {
          if (s.tags == null) {
            return {...s, tags: []};
          }
          else {
            return s;
          }
        })
        console.log(listingData);
        return listingData;
    })
      .then((listingData) => {
        // populate all tags
        let listOfAllTags = listingData.map(obj => obj.tags);
        allTags = _.union(...listOfAllTags).map(tag =>{return{key: tag, value: tag, text: tag};});
        return listingData;
        })
      .then((listingData) => {
        listingData = listingData.map(s => ({ ...s, key: s.xid }));
        listingData = listingData.map(s => ({...s, description: s.project_leader}));
        
        listings = listingData;
        filteredListings = listingData;
        let newSearchListings = [];
        this.convertToPages(listingData, newSearchListings,
          () => {
            this.setState((prevState) => {
              return {searchResults: [], searchListings: newSearchListings, tagsResults: []};
            });
        })
      })
      .catch(error => {
        console.log("get listings error: ");
        console.log(error);
      })
    
  }

  handlePageChange(activePage) {
    this.setState({activePage: activePage});
  }

  /** Search via title handler functions **/

  // pagesListings the search terms to turn into pages
  // newSearchListings stores the pages as
  convertToPages(pagesListings, newSearchListings, callback) {
    var tempArr = pagesListings.slice();
    while(tempArr.length) {
      newSearchListings.push(tempArr.splice(0,2));
    }
    callback();
  }

  // when search is cleared
  handleSearchResultsReset() {
    var newSearchListings = [];
    this.convertToPages(filteredListings, newSearchListings,
      () => {
        this.setState((prevState) => {
        return {searchResults: [], searchListings: newSearchListings, searchValue: '', activePage: 1};
      });
    })
  }
  
  handleSearchResultsSelect(searchValue) {
    const re = new RegExp(_.escapeRegExp(searchValue), 'i')
    const isMatch = result => re.test(result.title)
    this.handleSearchChange(isMatch, searchValue);
  }
  
  handleSearchChange(isMatch, searchValue) {
    let searchResults = _.filter(filteredListings, isMatch); // only look at filteredListings
    let newSearchListings = [];
    this.convertToPages(searchResults, newSearchListings,
      () => {
        this.setState((prevState) => {
          return {searchResults: searchResults, 
            searchListings: newSearchListings, searchValue: searchValue, activePage: 1};
        });
    })
  }
  
  /** Tag Filters handlers **/

  // create an array of projects filtered on tags
  filterOnTags(tags, tempFilteredProjects, callback) {
    for (let i = 0; i < listings.length; i++) {
      if(tags.every(tag => listings[i].tags.includes(tag))) {
        tempFilteredProjects.push(listings[i]);
      }
    }
    
    callback();
  }

  handleAddTags(e, { value }) {
    let tempFilteredListings = [];
    this.filterOnTags(value, tempFilteredListings,
      () => {
        filteredListings = tempFilteredListings;
        this.handleSearchResultsSelect(this.state.searchValue); // search again on filteredListings
      }
    );
  }
  

  render() {
    //console.log(filteredListings);
    return (
      <Grid padded style={{height: '100vh', width: '100vh'}}>
        <Grid.Row style={{height:'15%'}}>
          <Grid.Column width={16}>
            <Grid.Row style={{height:'85%'}}>
            <Header size='small' textAlign='left'>Search by Title</Header>
            <ProjectNameSearch 
              onSearchResultsReset={this.handleSearchResultsReset}
              onSearchChange={this.handleSearchChange}
              onSearchResultsSelect={this.handleSearchResultsSelect}
              results={this.state.searchResults}
              value={this.state.searchValue}
            />
            </Grid.Row>
            <Grid.Row>
            <ProjectTagsSearch 
              options={allTags}
              onChange={this.handleAddTags}
            />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{height:'85%'}}>
          <Grid.Column width={16}>
            <ProjectListingsContainer 
              isLoading={this.state.isLoading} 
              projectListings={this.state.searchListings}
              activePage={this.state.activePage}
              onPageChange={this.handlePageChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
