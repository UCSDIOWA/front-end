import React, { Component } from "react";
import { sendRecoverPasswordEmail } from "../../server/api";
import { Redirect } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = { isSubmissionSuccessful: false, sEmail: "", recoveryLoading: false };
    this.handlePasswordRecovery = this.handlePasswordRecovery.bind(this);
  }

  handlePasswordRecovery(email) {
    // TODO sendRecoverEmail functionality + callback
    const result = sendRecoverPasswordEmail(email);
    var recoverySuccess = false;
    this.setState({recoveryLoading: true});
    result.then((response) => {
      console.log("Recovery response");
      console.log(response);
      recoverySuccess = response.success;
      this.setState({recoveryLoading: false});

      this.setState({ recoveryLoading: false });
      if (!recoverySuccess) {
        alert("Invalid email");
      } else {
        this.props.onSystemMessage("Sent Recovery Email to " + email + "!");
        this.setState({ isSubmissionSuccessful: result, sEmail: email });

      }
    })

  }

  render() {
    return this.state.isSubmissionSuccessful ? (
      <Redirect to={"/"} />
    ) : (
      <ForgotPasswordForm onPasswordRecovery={this.handlePasswordRecovery} isLoading={this.state.recoveryLoading} />
    );
  }
}
