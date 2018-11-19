import React, { Component } from "react";
import {
  Button,
  Segment,
  Grid,
  Form,
  Input,
  Header,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sFirstName: "",
      sLastName: "",
      sEmail: "",
      sPw: ""
    };
  }

  render() {
    return (
      <div>
        <Segment piled>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h2">Sign up</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <Form.Field
                    control={Input}
                    placeholder="UCSD Email"
                    onChange={e => this.setState({ sEmail: e.target.value })}
                  />
                  <Form.Field
                    control={Input}
                    placeholder="Password"
                    type="password"
                    onChange={e => this.setState({ sPw: e.target.value })}
                  />
                  <Form.Field
                    control={Input}
                    placeholder="First Name"
                    onChange={e =>
                      this.setState({ sFirstName: e.target.value })
                    }
                  />
                  <Form.Field
                    control={Input}
                    placeholder="Last Name"
                    onChange={e => this.setState({ sLastName: e.target.value })}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6} position="left">
                <Link to="/">
                  <Button color="red" size="large">
                    Back
                  </Button>
                </Link>
              </Grid.Column>
              <Grid.Column width={4} />
              <Grid.Column width={6}>
                <Popup
                  trigger={
                    <Button
                      color="teal"
                      size="large"
                      onClick={() => {
                        this.props.onSignUp(
                          this.state.sEmail,
                          this.state.sPw,
                          this.state.sFirstName,
                          this.state.sLastName
                        );
                      }}
                    >
                      Sign Up
                    </Button>
                  }
                  content="Send an email to your UCSD email address for account creation"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
