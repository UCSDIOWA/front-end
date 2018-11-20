import React, { Component } from "react";
import CalendarWidget from "./CalendarWidget";
import { Container } from "semantic-ui-react";

export default class DashboardView extends Component {
  render() {
    return (
      <Container>
        <CalendarWidget />
      </Container>
    );
  }
}
