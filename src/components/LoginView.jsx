import React, { Component } from 'react';
import { Button, Icon, Grid, Header, Image, Segment, Form, Message, Container,} from 'semantic-ui-react';
import holderImage from '../holder-image.jpg';

// view for the login page
export default class LoginView extends Component {
  render() {
    return (
      <div>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 650 }}>
          <Header>
            <Grid>
            <Grid.Column width={7} floated='left' textAlign='left' verticalAlign='bottom'>
              
              Tea
              
            </Grid.Column>
            <Grid.Column width={7} floated='right'>
              <Image  spaced='right' rounded='true' src={holderImage} width='100px' />
            </Grid.Column>
            </Grid>
            </Header>
            <Form>
              <Segment stacked>
                <Form.Input icon='user' iconPosition='right' placeholder='UCSD Email' />
                <Form.Input icon='lock' iconPosition='right' placeholder='Password' type='password'/>
                <Button color='teal' size='medium'>
                  Sign Up
                </Button>
                
                <Button color='linkedin' size='huge'>
                  Login
                </Button>
              </Segment>

            </Form>

          </Grid.Column>
        </Grid>
      
      </div>
      /*
      <div>
          <Button icon color='blue' labelPosition='left' size='medium'>
            <Icon name='user' color='white'/>
            Login
          </Button>
    
          <Button icon color='blue' labelPosition='left' size='medium'>
            <Icon name='user plus' color='white'/>
            Sign Up
          </Button>
          
      </div>
      */
    );
  }
}
