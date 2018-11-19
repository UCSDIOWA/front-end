import React, { Component } from "react";
import { sendRecoverPasswordEmail } from "../../server/api";
import { Segment, Message, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = { isSubmissionSuccessful: false, sEmail: "" };
    this.handlePasswordRecovery = this.handlePasswordRecovery.bind(this);
  }

  handlePasswordRecovery(email) {
    sendRecoverPasswordEmail(email);
    this.setState({ isSubmissionSuccessful: true, sEmail: email });
  }

  render() {
    return this.state.isSubmissionSuccessful ? (
      <Segment>
        <Message floating size="massive">
          Sent Recovery Email to {this.state.sEmail}!
        </Message>
        <Link to={"/"}>
          <Button color="red"> Go to Login! </Button>
        </Link>
      </Segment>
    ) : (
      <ForgotPasswordForm onPasswordRecovery={this.handlePasswordRecovery} />
    );
  }
}
