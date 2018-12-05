import UserSession from "./UserSession";

export function signup(email, password, first_name, last_name, imageStr) {
  let url = "https://tea-login-api.herokuapp.com/signup";
  console.log(imageStr);
  let data = {
    email: email,
    password: password,
    firstname: first_name,
    lastname: last_name,
    profileimage: imageStr
  };
  console.log(data);
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
    .then(response => {
      console.log("get user profile response");
      console.log(response);
      return response.json();
    })
    .catch(error => {
      console.log("get profile post error: ");
      console.log(error);
    });
}

export function getProjectInfo(projectids) {
  let url = "https://tea-project-handler-api.herokuapp.com/getprojects";
  let data = { xid: projectids };
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
    profileimage: valueList.profileimage,
    profiledescription: valueList.profiledescription,
    endorsements: valueList.endorsements,
    currentprojects: valueList.currentprojects,
    previousprojects: valueList.previousprojects
  };
  console.log(data);
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
      return response.json();
    })
    .catch(error => {
      console.log("getAllProjects post error: ");
      console.log(error);
    });
}

// backend not ready
export function inviteUser(xid, remail, semail) {
  let url = "https://tea-project-handler-api.herokuapp.com/inviteuser";
  let data = {
    projectid: xid,
    recipientemail: remail,
    senderemail: semail
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
}
// to fix
export function getEditProjForm(valueList) {
  let url = "https://tea-login-api.herokuapp.com/editProjForm";
  let data = {
    title: valueList.title,
    description: valueList.description,
    //tags: valueList.tags,
    deadline: valueList.deadline,
    teamSize: valueList.teamSize,
    privacy: valueList.privacy,
    members: valueList.members,
    membersViewer: valueList.membersViewer,
    pendingMembers: valueList.pendingMembers,
    pendingMembersView: valueList.pendingMembersView
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("edit proj form post error: ");
      console.log(error);
    });
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
    done: false,
    email: project_leader
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

export function updateProject(projectFields) {
  let url = "https://tea-project-handler-api.herokuapp.com/updateproject";
  let data = {
    xid: projectFields.xid,
    title: projectFields.title,
    projectleader: projectFields.projectleader,
    percentdone: projectFields.percentdone,
    groupsize: projectFields.groupsize,
    isprivate: projectFields.isprivate,
    tags: projectFields.tags,
    deadline: projectFields.deadline,
    calendarid: projectFields.calendarid,
    description: projectFields.description,
    done: projectFields.done,
    joinrequests: projectFields.joinrequests,
    memberslist: projectFields.memberslist,
    milestones: projectFields.milestones,
    pinnedannouncements: projectFields.pinnedannouncements,
    unpinnedannouncements: projectFields.unpinnedannouncements
  };
  console.log(data);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      console.log("update project post error: ");
      console.log(error);
    });
}

export function sendJoinRequest(projectId, useremail) {
  let url = "https://tea-project-handler-api.herokuapp.com/joinprojects";
  let data = {
    xid: projectId,
    email: useremail
  };
  console.log(data);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .catch(error => {
      console.log("send join request post error: ");
      console.log(error);
    });
}
