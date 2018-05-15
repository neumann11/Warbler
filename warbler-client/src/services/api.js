import axios from "axios";

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; //att. token to all future requests
  } else {
    delete axios.defaults.headers.common["Authorization"]; //if user logges out
  }
}

// A wrapper around axios API call that formats errors, setCurrentUser;
// @param {string} - method the HTTP verb you want to user;
// @param {string} - path the route path / endpoint;
// @param {string} - data (optional) data in JSON form for POST requests;

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then(res => {
        return resolve(res.data); //resp from Axios is an obj called Response, w. Subobject Data and then subobject Error (if not successful)
      })
      .catch(err => {
        return reject(err.response.data.error); //err is sent by our server from errorHandler
      });
  });
}
