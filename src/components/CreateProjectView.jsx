import React, { Component } from 'react';
import { Header, Grid, Form, Input, TextArea, Segment, Checkbox, Button} from 'semantic-ui-react'
import {CalendarModule} from './CalendarModule';
import {Link} from 'react-router-dom';
import {navConsts} from '../constants';

const {GATEWAY, SIGNUP, PROFILE, CREATE_PROJECT} = navConsts;


export default class CreateProjectView extends Component {
    constructor(props){
    super(props);
    this.state = { title: '', description: '', size: 0, isPrivate: false};

    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleIsPrivate=this.handleIsPrivate.bind(this);
    }
    
    handleChange (e, {name, value}) {
        this.setState({ [name]: value});
    }

    handleIsPrivate() {
        this.setState({isPrivate : !this.state.isPrivate});
    }

    handleSubmit () {
        console.log("isPrivate:",this.state.isPrivate);
        console.log("Description:",this.state.description);
        console.log("Title:", this.state.title);
      }

<<<<<<< HEAD
  render() {
    return (
      <Grid textAlign='center' style={{ height: '80%' }} verticalAlign='middle'>
        <Grid.Row>
          <Header style={{ fontSize: '5em' }}>Create Project</Header>
        </Grid.Row>
        <Grid.Row>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                label='Title'
                placeholder='Title of Project...'
              />
              <Form.Field
                control={TextArea}
                label='Description'
                placeholder='Discription of Project...'
              />
            </Form.Group>
          </Form>
        </Grid.Row>
      </Grid>
    );
  }
=======
    render() {
        const { title, description, size, isPrivate} = this.state;
        return (
            <div>
            <Header style={{fontSize: '5em'}}>Create Project</Header>
            <Segment>
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
            <Grid.Row>
                <Form>
                    <Form.Group >
                        <Form.Input
                            control={Input}
                            label='Title'
                            placeholder='Title of Project...'
                            name='title'
                            value={title}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                         <Form.Input 
                            control={TextArea}
                            label='Description'
                             placeholder='Description of Project...'
                             name='description'
                             value={description}
                             onChange={this.handleChange}
                        />
                        <Form.Input 
                            control={Checkbox}
                            label='Private'
                            name='isPrivate'
                            onChange={this.handleIsPrivate}
                        />
                    </Form.Group>
                </Form>
            </Grid.Row>
            <Grid.Row>
            <CalendarModule></CalendarModule>
            </Grid.Row>
        </Grid>
        <Button color='teal' onClick={this.handleSubmit}>Create</Button>
        <Link to={'/' + GATEWAY}>
            <Button color='red'>Cancel</Button>
        </Link>
        </Segment>
        </div>
        );
    }
>>>>>>> 1e62a1f056dcbc628cba24bb925de44a2c5dd975
}