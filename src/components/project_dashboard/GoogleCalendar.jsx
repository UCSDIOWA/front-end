import React, { Component } from "react";

export default class GoogleCalendar extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /* This function executes as soon as the component is rendered. I use this as a cheat 
  to pass a project's calendar id as a variable to the iframe.

  */
  componentDidMount() {
    // locate iframe on page
    var e = document.getElementById("embed-Calendar");
    if (e) {
      console.log("Found Google Calendar, loading id");
      e.src = e.src + this.props.calendarID;
      // should not go here
    } else {
      console.log("Error, could not find Google Calendar");
    }
  }

  render() {
    return (
      <div>
        <iframe
          id="embed-Calendar"
          src="https://calendar.google.com/calendar/embed?showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=AGENDA&amp;wkst=1&amp;bgcolor=%2300cccc&amp;src="
          width="250"
          height="250"
        />
      </div>
    );
  }
}
