import React, {Component} from 'react';
import { LoginButton } from './Login';


export default class Main extends Component {
  render() {
    return (
        <main className="App-container">
          <LoginButton />
        </main>
    );
  }
}