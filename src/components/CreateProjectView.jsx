import React, { Component } from "react";
import CreateProjectForm from "./CreateProjectForm";
import { createProject } from "../server/api";

export default class CreateProjectView extends Component {
  constructor(props) {
    super(props);

    this.handleCreateProject = this.handleCreateProject.bind(this);
  }

  handleCreateProject(
    title,
    project_leader,
    percent_done,
    group_size,
    isPrivate,
    tags,
    deadline,
    calendar_id,
    description,
    members_list
  ) {
    const createProjectPromise = createProject(
      title,
      project_leader,
      percent_done,
      group_size,
      isPrivate,
      tags,
      deadline,
      calendar_id,
      description,
      members_list
    );
    var createProjectSuccess = false;

    createProjectPromise.then(response => {
      console.log(response);

      createProjectSuccess = response.success;
      if (!createProjectSuccess) {
        alert("Error creating project");
      } else {
        // update
        alert("Successfully created project!");
      }
    });
  }

  render() {
    return <CreateProjectForm onCreateProject={this.handleCreateProject} />;
  }
}
