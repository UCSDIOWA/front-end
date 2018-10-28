import React, { Component } from 'react';
import { Button, Icon, Grid, Header, Image, Segment, Form, Message, Container,} from 'semantic-ui-react';
import holderImage from '../holder-image.jpg';
import logoImage from '../tealogosmall.png';

// view for the login page
export default class LoginView extends Component {
  constructor(props){
    super(props);
    this.state={isGary:true, submittedEmail:'', submittedPw:''};
    this.handlePicClick=this.handlePicClick.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    
  }

  handleSubmit(){
    const {email, pw} = this.state;
    this.setState({submittedEmail:email, submittedPw: pw});
  }

  handlePicClick(){
    this.setState(state => ({isGary : !state.isGary}));
  }
  render() {
    const {email, pw} = this.state;
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
              <Image  spaced='right' rounded='true' onClick={this.handlePicClick} src={this.state.isGary ? holderImage : logoImage } width='100px' />
            </Grid.Column>
            </Grid>
            </Header>
            <Form >
              <Segment stacked>
                <Form.Input icon='user' iconPosition='right' placeholder='UCSD Email' name='email' value={email}/>
                <Form.Input icon='lock' iconPosition='right' placeholder='Password' type='password' name='pw' value={pw}/>
                <Button color='teal' size='medium'>
                  Sign Up
                </Button>
                
                <Button color='linkedin' size='huge' onClick={this.handleSubmit}>
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
