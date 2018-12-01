import UserSession from "./UserSession";

export function signup(email, password, first_name, last_name, imageStr) {
  let url = "https://tea-login-api.herokuapp.com/signup";
  let data = {
    email: email,
    password: password,
    firstname: first_name,
    lastname: last_name,
    profileimage: imageStr
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(error => {
      console.log("signup post error: ");
      console.log(error);
    });
}

export function login(email, password) {
  let url = "https://tea-login-api.herokuapp.com/login";
  let data = {
    email: email,
    password: password
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("login post error: ");
      console.log(error);
    });
}

// TODO
export function sendRecoverPasswordEmail(email) {
  return true;
}

/** Notifications **/
export function getNotifications(email) {
  return ["test invite", "test request"];
}

/** User profile API  **/

export function getUserProfile(email) {
  let url = "https://tea-user-profile-api.herokuapp.com/getuserprofile";
  let data = { email: email };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("get profile post error: ");
      console.log(error);
    });
}

export function getProjectInfo(project_id) {
  let url = "https://tea-user-profile-api.herokuapp.com/getuserprofile";
  let data = { project_id: project_id };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("get project info error: ");
      console.log(error);
    });
}

export function updateUserProfile(valueList) {
  let url = "https://tea-user-profile-api.herokuapp.com/updateuserprofile";
  let data = {
    email: valueList.email,
    profile_image: valueList.profile_image,
    profile_description: valueList.profile_description,
    endorsements: valueList.endorsements,
    current_projects: valueList.current_projects,
    previous_projects: valueList.previous_projects
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("login post error: ");
      console.log(error);
    });
}

/** Project Information API **/

//{ project_name: string, percentage_done: float, group_size: int,
//  tags: list }
//TODO replace with actual project information
//https://tea-project-handler-api.herokuapp.com/getallprojects
export function getProjectListings(userEmail) {
  let url = "https://tea-project-handler-api.herokuapp.com/getallprojects";
  let data = {
    email: userEmail
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => {
      //console.log(response);
      return response.json();
    })
    .catch(error => {
      console.log("getAllProjects post error: ");
      console.log(error);
    });

  /*return [
    {
      title: "temp project name1",
      project_leader: "project leader 1",
      percentage_done: 10.0,
      group_size: 10,
      user_roles: [
        { user_email: "test_email1.1", user_role: "test_role1.1" },
        { user_email: "test_email1.2", user_role: "test_role1.2" }
      ],
      tags: ["tag1.1", "tag1.2", "tag1.3"],
      project_description: "description"
    },
    {
      title: "temp project name2",
      project_leader: "project leader 2",
      percentage_done: 20.0,
      group_size: 20,
      user_roles: [
        { user_email: "test_email2.1", user_role: "test_role2.1" },
        { user_email: "test_email2.2", user_role: "test_role2.2" }
      ],
      tags: ["tag2.1", "tag2.2", "tag2.3"],
      project_description: "description"
    },
    {
      title: "temp project name3",
      project_leader: "project leader 3",
      percentage_done: 30.0,
      group_size: 30,
      user_roles: [
        { user_email: "test_email3.1", user_role: "test_role3.1" },
        { user_email: "test_email3.2", user_role: "test_role3.2" }
      ],
      tags: ["tag3.1", "tag3.2", "tag3.3"],
      project_description: "description"
    },
    {
      title: "temp project name1",
      project_leader: "project leader 4",
      percentage_done: 10.0,
      group_size: 10,
      user_roles: [
        { user_email: "test_email1.1", user_role: "test_role1.1" },
        { user_email: "test_email1.2", user_role: "test_role1.2" }
      ],
      tags: ["tag1.1", "tag1.2", "tag1.3"],
      project_description: "description1"
    },
    {
      title: "temp project name2",
      project_leader: "project leader 5",
      percentage_done: 20.0,
      group_size: 20,
      user_roles: [
        { user_email: "test_email2.1", user_role: "test_role2.1" },
        { user_email: "test_email2.2", user_role: "test_role2.2" }
      ],
      tags: ["tag2.1", "tag2.2", "tag2.3"],
      project_description: "description"
    },
    {
      title: "temp project name3",
      project_leader: "project leader 6",
      percentage_done: 30.0,
      group_size: 30,
      user_roles: [
        { user_email: "test_email3.1", user_role: "test_role3.1" },
        { user_email: "test_email3.2", user_role: "test_role3.2" }
      ],
      tags: ["tag3.1", "tag3.2", "tag3.3"],
      project_description: "description"
    },
    {
      title: "temp project name3",
      project_leader: "project leader 7",
      percentage_done: 30.0,
      group_size: 30,
      user_roles: [
        { user_email: "test_email3.1", user_role: "test_role3.1" },
        { user_email: "test_email3.2", user_role: "test_role3.2" }
      ],
      tags: ["tag3.1", "tag3.2", "tag3.3"],
      project_description: "description"
    }
  ];
  */
}

/* Create Project API
 */
export function createProject(
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
  let url = "https://tea-project-handler-api.herokuapp.com/createproject";
  let data = {
    title: title,
    projectleader: project_leader,
    percentdone: percent_done,
    groupsize: group_size,
    isprivate: isPrivate,
    tags: tags,
    deadline: deadline,
    calendarid: calendar_id,
    description: description,
    memberslist: members_list,
    done: false
  };
  console.log(data);

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("createproject post error: ");
      console.log(error);
    });
}
