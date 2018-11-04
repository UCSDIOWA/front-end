import React, {Component} from 'react';
import LoginView from './LoginView';
import NavBar from './NavBar';
import CreateProject from './CreateProject';
import { Container } from 'semantic-ui-react';

export default class Main extends Component {
  render() {
    return (
        <main className="App-container">
        <NavBar />
        <CreateProject />
        </main>
    );
  }
}
