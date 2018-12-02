import _ from 'lodash';
import React, {Component} from "react";
import {Dropdown} from "semantic-ui-react";

export default class ProjectTagsSearch extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <Dropdown 
        placeholder='Filter Projects by Tags' 
        multiple search selection floating labeled fluid scrolling
        button className='icon'
        icon="filter"
        options={this.props.options} 
        onChange={this.props.onChange}
      />
    );
  }
}