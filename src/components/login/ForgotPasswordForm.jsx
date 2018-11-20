import React, { Component } from "react";
import {
  Grid,
  Header,
  Form,
  Input,
  Popup,
  Button,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { sEmail: "" };
  }

  render() {
    return (
      <Segment piled>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2">Forgot Password</Header>
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
                      this.props.onPasswordRecovery(this.state.sEmail);
                    }}
                  >
                    Send Recovery Email
                  </Button>
                }
                content="Send an email to your UCSD email address for password recovery"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
