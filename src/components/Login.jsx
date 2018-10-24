import React, { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react';

export class LoginButton extends Component {
  render() {
   return (
   < div className='login-button'>
      <Button
        color='blue'
        onClick = {() => { 
          this.props.onClick();
        }}
      >
        Log In
      </Button>
    </div>
      );
  }
}