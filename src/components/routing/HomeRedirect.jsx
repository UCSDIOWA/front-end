import React, { Component } from "react";
import { navConsts } from "../../constants";
import { Redirect } from "react-router-dom";

class HomeRedirect extends Component {
  render() {
    const { LOGIN, GATEWAY } = navConsts;

    if (this.props.isAuthenticated) {
      return <Redirect to={LOGIN} />;
    } else {
      return <Redirect to={GATEWAY} />;
    }
  }
}
export default HomeRedirect;
