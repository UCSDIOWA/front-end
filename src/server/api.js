import axios from "axios";

export function login(email, password) {
  axios({
    method: "post",
    url: "https://tea-login-api.herokuapp.com/login",

    data: {
      email: email,
      password: password
    },
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    validateStatus: status => {
      if (status != "200") {
        console.log("login post request failed with status code: " + status);
        return false;
      }
      return true; // I'm always returning true, you may want to do it depending on the status received
    }
  })
    .catch(error => {})
    .then(response => {
      // this is now called!
      console.log(response);
    });
}

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
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    }
  })
    .then(response => response.json())
    .catch(error => {
      console.log("signup post error: ");
      console.log(error);
    });
  /*
  return axios({
    url: url,
    method: "post",
    data: {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name
    },
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    validateStatus: status => {
      if (status != "200") {
        console.log("Sign up post request failed with status code: " + status);
      }
    }
  })
  */
}
