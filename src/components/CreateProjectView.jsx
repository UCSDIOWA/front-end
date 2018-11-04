import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

export default class CreateProjectView extends Component {

    render() {
        return (
            <Grid textAlign='center' style={{height: '80%'}} verticalAlign='middle'>
            <Grid.Row>
                <Header style={{fontSize: '5em'}}>Create Project</Header>
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
}