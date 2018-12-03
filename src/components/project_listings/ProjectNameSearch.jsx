import _ from 'lodash';
import React, {Component} from "react";
import {Search} from "semantic-ui-react";

export default class ProjectNameSearch extends Component {
  constructor(props) {
    super(props);

    this.resetComponent = this.resetComponent.bind(this);
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {
    this.props.onSearchResultsReset();
    this.setState({ isLoading: false })
  }

  handleResultSelect = (e, { result }) => {
    this.props.onSearchResultsSelect(result.title);
    //this.setState({ value: result.title });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true })
    setTimeout(() => {
      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.title)

      this.props.onSearchChange(isMatch, value);
      this.setState({isLoading : false});
    }, 300)
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Search
        align="left"
        selectFirstResult
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={this.props.results}
        value={this.props.value}
      />
    )
  }
}