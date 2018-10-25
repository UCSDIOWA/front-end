import React, { Component } from 'react';
import { Button, Icon, Grid, Header, Image, Segment, Form, Message } from 'semantic-ui-react';
import holderImage from '../holder-image.jpg';

// view for the login page
export default class LoginView extends Component {
  render() {
    return (
      <div>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
            <Header as='h1' color='teal' textAlign='center' >
              <Image fluid src={holderImage} /> Tea
            </Header>
            <Form>
              <Segment stacked>
                <Form.Input icon='user' iconPosition='left' placeholder='Username or Email' />
                <Form.Input icon='lock' iconPosition='left' placeholder='Password' type='password'/>
                <Button color='teal' size='large'>
                  Login
                </Button>
                
                <Button color='teal' size='large'>
                  Sign Up
                </Button>
              </Segment>

            </Form>

          </Grid.Column>
        </Grid>
      
      </div>
    );
  }
}