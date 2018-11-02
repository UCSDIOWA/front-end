import React, { Component } from 'react';
import { Button, Icon, Grid, Header, Image, Segment, Form, Message, Container} from 'semantic-ui-react';
import holderImage from '../logo.png';
import logoImage from '../tealogosmall.png';

// view for the login page
export default class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = { isGary:true, sEmail: '', sPw: '' }
    this.handlePicClick=this.handlePicClick.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    
  }

  handleSubmit () {
    console.log(this.state.sEmail);
    console.log(this.state.sPw);
  }
  handlePW(){
    console.log("Forgot Password");
  }

  handlePicClick(){
    this.setState(state => ({isGary : !state.isGary}));
  }
  render() {
    const { sEmail, sPw } = this.state
    return (
      <div>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 800 }}>
          <Header>
            <Grid>
            <Grid.Column width={8} floated='left' textAlign='left' verticalAlign='bottom'>
              
             <Header as='h1' id="login_tea">TEA</Header>
            </Grid.Column>
            <Grid.Column width={8} floated='right'>
              <Image  spaced='right' rounded={true} onClick={this.handlePicClick} src={this.state.isGary ? holderImage : logoImage } width='100px' />
            </Grid.Column>
            </Grid>
            </Header>
            <Form>
              <Segment stacked size="huge">
                <Form.Input icon='user' iconPosition='left' placeholder='UCSD Email' onChange={e=>this.setState({sEmail:e.target.value})}/>
                <Form.Input icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={e=>this.setState({sPw:e.target.value})} />
                <Grid>
                <Grid.Row>
                  <Grid.Column>
                <Button color='teal' size='huge'>
                  Sign Up
                </Button>
                
                <Button color='linkedin' size='huge' onClick={this.handleSubmit}>
                  Login
                </Button>
                </Grid.Column>
                </Grid.Row>
                </Grid >
                <Grid centered>
                <Segment onClick={this.handlePW} id="forgot-pw">
                <u>
                  Forgot password?
                  </u>
                </Segment>
                </Grid>
              </Segment>

            </Form>

          </Grid.Column>
        </Grid>
        <div>
      <strong>onChange:</strong>
      <pre>{JSON.stringify({ sEmail, sPw }, null, 2)}</pre>
      </div>
      </div>
    );
  }
}
