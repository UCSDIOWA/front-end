import _ from 'lodash';
import React, {Component} from "react";
import {Grid, Search, Segment, Header} from "semantic-ui-react";

export default class ProjectNameSearch extends Component {
  constructor(props) {
    super(props);

    this.resetComponent = this.resetComponent.bind(this);
  }

  componentDidMount() {
    var listingData = this.props.projectListings;
    this.setState((prevState, curProps) => {
      return {source: listingData};
    });
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {
    this.props.onSearchResultsReset();
    this.setState({ isLoading: false, value: '' })
  }

  handleResultSelect = (e, { result }) => {
    this.props.onSearchResultsSelect(result.title);
    this.setState({ value: result.title });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.props.onSearchChange(isMatch);
      this.setState({isLoading : false});
    }, 300)
  }

  render() {
    const { isLoading, value } = this.state;
    /*
    const showProps = (
    <Grid.Column width={10}>
    <Segment>
      <Header>State</Header>
      <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
      <Header>Options</Header>
      <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state.source, null, 2)}</pre>
    </Segment>
    </Grid.Column>
    )
  */
    return (
      <Search
        align="left"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={this.props.results}
        value={value}
      />
    )
  }
}