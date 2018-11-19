import React from "react";
import ModernDatepicker from "react-modern-datepicker";
import moment from "moment";

export default class CalendarModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <ModernDatepicker
        date={this.state.endDate}
        format={"MM-DD-YYYY"}
        showBorder
        onChange={date => this.handleChange(date)}
        placeholder={"Select an end date"}
      />
    );
  }
}
