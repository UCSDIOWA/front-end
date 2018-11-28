import React, { Component } from "react";
import { sendRecoverPasswordEmail } from "../../server/api";
import { Redirect } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = { isSubmissionSuccessful: false, sEmail: "" };
    this.handlePasswordRecovery = this.handlePasswordRecovery.bind(this);
  }

  handlePasswordRecovery(email) {
    // TODO sendRecoverEmail functionality + callback
    const result = sendRecoverPasswordEmail(email);
    const recoverySent = result;
    if (!recoverySent) {
      this.props.onAnnouncement("Failed to send recovery email");
    } else {
      this.props.onAnnouncement("Sent Recovery Email to " + email + "!");
    }
    this.setState({ isSubmissionSuccessful: result, sEmail: email });
  }

  render() {
    return this.state.isSubmissionSuccessful ? (
      <Redirect to={"/"} />
    ) : (
      <ForgotPasswordForm onPasswordRecovery={this.handlePasswordRecovery} />
    );
  }
}
