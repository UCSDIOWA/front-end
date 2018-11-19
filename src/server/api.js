import UserSession from "./UserSession";

export function signup(email, password, first_name, last_name) {
  let url = "https://tea-login-api.herokuapp.com/signup";
  let data = {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name
  };
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
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

export function logout() {
  UserSession.setAuthenticated(false);
  UserSession.setEmail(null);
}

export function sendRecoverPasswordEmail(email) {
  return true;
}

export function getProfileData(userEmail) {
  let url = "https://tea-user-profile-api.herokuapp.com/userprofile";
  let data = {};
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
