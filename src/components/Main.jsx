import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginView from './LoginView';
import GatewayView from './GatewayView';
import SignUpView from './SignUpView';
import ProfileView from './ProfileView';
import {navConsts} from '../constants';
import CreateProjectView from './CreateProjectView';
import SearchProjectView from './SearchProjectView';

export default class Main extends Component {
  render() {
    const {GATEWAY, SIGNUP, PROFILE, CREATE_PROJECT, SEARCH_PROJECT} = navConsts;

    return (
        <main className="App-container">
          <Switch>
            <Route exact path='/' component={LoginView} />
            <Route exact path={'/' + GATEWAY} component={GatewayView} />
            <Route exact path={'/' + SIGNUP} component={SignUpView} />
            <Route exact path={'/' + PROFILE} component={ProfileView} />
            <Route exact path={'/' + CREATE_PROJECT} component={CreateProjectView} />
            <Route exact path={'/' + SEARCH_PROJECT} component={SearchProjectView} />
          </Switch>
        </main>
    );
  }
}
