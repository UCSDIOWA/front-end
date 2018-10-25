import React, {Component} from 'react';
import LoginView from './LoginView';


export default class Main extends Component {
  render() {
    return (
        <main className="App-container">
          <LoginView />
        </main>
    );
  }
}