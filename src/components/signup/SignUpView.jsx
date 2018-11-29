import React, { Component } from "react";
import { signup } from "../../server/api";
import { Redirect } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { updateUserProfile } from "../../server/api";

export default class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmittedSuccess: false,
      isSubmittedLoading: false
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(email, password, firstName, lastName) {
    this.setState({ isSubmittedLoading: true });
    const signupPromise = signup(email, password, firstName, lastName);
    var signupSuccess = false;
    signupPromise.then(response => {
      console.log("signup response: ");
      console.log(response);
      signupSuccess = response.success;
      this.setState({ isSubmittedLoading: false });
      if (!signupSuccess) {
        this.props.onAnnouncement("Email Already Taken, please try again.");
      } else {
        this.props.onAnnouncement("Sign Up Successful");
        var emptyProfile = {
          email: email,
          profile_image: "asdf",
          profile_description: "fasd",
          endorsements: ["name1", "name2", "name3"],
          current_projects: ["1"],
          previous_projects: ["2"]
        };
        var returned = updateUserProfile(emptyProfile);
        if (!returned) {
          console.log("failed to update profile");
        } else {
          console.log("success!");
        }
      }
      this.setState({ isSubmittedSuccess: signupSuccess });
    });
  }

  render() {
    return this.state.isSubmittedSuccess ? (
      <Redirect to={"/"} />
    ) : (
      <SignUpForm
        onSignUpLoading={this.state.isSubmittedLoading}
        onSignUp={this.handleSignUp}
      />
    );
  }
}
