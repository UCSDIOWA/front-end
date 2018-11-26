import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LoginView from "../login/LoginView";
import GatewayView from "../GatewayView";
import SignUpView from "../signup/SignUpView";
import ProfileView from "../profile/ProfileView";
import { navConsts } from "../../constants";
import CreateProjectView from "../CreateProjectView";
import SearchProjectView from "../SearchProjectView";
import ForgotPasswordView from "../login/ForgotPasswordView";
import ProtectedRoute from "./ProtectedRoute";
import HomeRedirect from "./HomeRedirect";
import NotFound from "../NotFound";
import ProjectDashboardView from "../project_dashboard/ProjectDashboardView";
import ProjectListingsView from "../project_listings/ProjectListingsView";

export default class Main extends Component {
  render() {
    // same as
    // const GATEWAY = navConsts.GATEWAY etc
    const {
      GATEWAY,
      SIGNUP,
      PROFILE,
      CREATE_PROJECT,
      SEARCH_PROJECT,
      LOGIN,
      RECOVER_PASSWORD,
      DASHBOARD,
      PROJECT_LISTINGS
    } = navConsts;

    const AUTHENTICATED = this.props.isAuthenticated;
    console.log("Rendering Main, isAuthenticated = " + AUTHENTICATED);
    // hard coded a redirect to gateway if logged in and on /login, TODO fix later
    return (
      <main className="App-container">
        <Switch>
          {AUTHENTICATED ? (
            <Route
              exact
              path={"/" + LOGIN}
              component={HomeRedirect}
              isAuthenticated={AUTHENTICATED}
            />
          ) : (
            <Route
              exact
              path={"/" + LOGIN}
              render={() => (
                <LoginView
                  onUserSessionUpdate={this.props.onUserSessionUpdate}
                />
              )}
            />
          )}

          <Route
            exact
            path={"/" + SIGNUP}
            render={() => (
              <SignUpView onAnnouncement={this.props.onAnnouncement} />
            )}
          />

          <Route
            exact
            path={"/" + RECOVER_PASSWORD}
            render={() => (
              <ForgotPasswordView onAnnouncement={this.props.onAnnouncement} />
            )}
          />

          <ProtectedRoute
            path={"/" + PROFILE}
            component={ProfileView}
            isAuthenticated={AUTHENTICATED}
          />
          <ProtectedRoute
            exact
            path={"/" + GATEWAY}
            component={GatewayView}
            isAuthenticated={AUTHENTICATED}
          />
          <ProtectedRoute
            path={"/" + CREATE_PROJECT}
            component={CreateProjectView}
            isAuthenticated={AUTHENTICATED}
          />
          <ProtectedRoute
            path={"/" + SEARCH_PROJECT}
            component={SearchProjectView}
            isAuthenticated={AUTHENTICATED}
          />
          <ProtectedRoute
            path={"/" + DASHBOARD}
            component={ProjectDashboardView}
            isAuthenticated={AUTHENTICATED}
          />

          <ProtectedRoute
            path={"/" + PROJECT_LISTINGS}
            component={ProjectListingsView}
            isAuthenticated={AUTHENTICATED}
          />

          <Route
            exact
            path="/"
            component={HomeRedirect}
            isAuthenticated={AUTHENTICATED}
          />

          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}
