import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes"; // /index
import { addError, removeError } from "./errors";

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token){
  setTokenHeader(token);
}

// login = delete token from LocalStorage;
//Turn currentUser into empty obj;
export function logout(){
  return dispatch => { //use Thunk
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

//func to login or signup:
// login = place token into LocalStorage

export function authUser(type, userData){
  return dispatch => { //wait for api call to finish before dispatch;
    // wrap thunk in promise to wait for API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => { //destructure resp from server
          localStorage.setItem("jwtToken", token); //if succ. mark user as loggedin;
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user)); //sets currUser with whatever comes back in API call
          dispatch(removeError());
          resolve(); //indicate API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message)); //comes from server in err obj.
          reject(); //indicate API call failed
        });
    });
  };
}
