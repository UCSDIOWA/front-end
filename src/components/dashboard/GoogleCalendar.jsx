import React, { Component } from "react";

export default class GoogleCalendar extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var e = document.getElementById("embed-Calendar");
    if (e) {
      console.log("Found Google Calendar, loading id");
      e.src = e.src + this.props.calendarID;
    } else {
      console.log("Error, could not find Google Calendar");
    }
  }

  render() {
    return (
      <div>
        <iframe
          id="embed-Calendar"
          src="https://calendar.google.com/calendar/embed?showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=AGENDA&amp;wkst=1&amp;bgcolor=%2300cccc&amp;"
          width="260"
          height="260"
        />
      </div>
    );
  }
}
