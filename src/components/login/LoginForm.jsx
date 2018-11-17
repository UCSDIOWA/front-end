import React, { Component } from "react";
import { Button, Grid, Header, Image, Segment, Form } from "semantic-ui-react";
import { navConsts } from "../../constants";
import { Link } from "react-router-dom";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { sEmail: "", sPw: "" };
  }

  render() {
    const { SIGNUP } = navConsts;
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
            <Segment id="forgot-pw">
              <u>Forgot password?</u>
            </Segment>
          </Grid>
        </Segment>
      </Form>
    );
  }
}