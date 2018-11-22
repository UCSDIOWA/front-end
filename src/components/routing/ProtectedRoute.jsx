import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { navConsts } from "../../constants";

class ProtectedRoute extends Component {
  render() {
    // copies Component and its props from this prop "component"
    // const Component = this.props.component
    // ...props is an array with all parameters passed to props
    const { component: Component, ...props } = this.props;
    const { LOGIN } = navConsts;
    // render Component with props if authenticated
    return (
      <Route
        {...props}
        render={props =>
          this.props.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={LOGIN} />
          )
        }
      />
    );
  }
}
export default ProtectedRoute;
