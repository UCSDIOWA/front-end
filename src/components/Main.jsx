import React, {Component} from 'react';
import LoginView from './LoginView';
import NavBar from './NavBar';


export default class Main extends Component {
  render() {
    return (
        <main className="App-container">
          <NavBar />
          <LoginView />
        </main>
    );
  }
}
