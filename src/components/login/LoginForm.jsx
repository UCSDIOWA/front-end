import React, { Component } from "react";
import { Button, Grid, Segment, Form, Message } from "semantic-ui-react";
import { navConsts } from "../../constants";
import { Link } from "react-router-dom";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { sEmail: "", sPw: "" };
  }

  render() {
    const { SIGNUP, RECOVER_PASSWORD } = navConsts;
    return (
      <Form>
        <Segment stacked size="huge">
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="UCSD Email"
            onChange={e => this.setState({ sEmail: e.target.value })}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={e => this.setState({ sPw: e.target.value })}
          />
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Link to={"/" + SIGNUP}>
                  <Button color="teal" size="huge">
                    Sign Up
                  </Button>
                </Link>

                <Button
                  color="linkedin"
                  size="huge"
                  onClick={() => {
                    this.props.onLogin(this.state.sEmail, this.state.sPw);
                  }}
                >
                  Login
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered>
            <Link to={"/" + RECOVER_PASSWORD}>
              <Message id="forgot-pw">
                <a href="#">Forgot password?</a>
              </Message>
            </Link>
          </Grid>
        </Segment>
      </Form>
    );
  }
}
