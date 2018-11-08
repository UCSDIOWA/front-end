import React, { Component } from 'react';
import { Button, Icon, Grid, Header, Image, Segment, Form, Message, Container, Dropdown} from 'semantic-ui-react';
import holderImage from '../logo.png';
import logoImage from '../tealogosmall.png';
import {navConsts} from '../constants';
import {Link} from 'react-router-dom';

 const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]   

export default class GatewayView extends Component {
    
  render() {

    return (
      <div>
        <Button  id='create_project' color="blue" size='huge'>Create Project</Button>
            
            <Button  id='find_a_team' color='green' size='huge'>Find A Team</Button> 
            <hr></hr>
            <h1>My Projects</h1>
            <Dropdown placeholder='My Projects' fluid search selection options={options} />
            
            
      </div>
    );
  }
}