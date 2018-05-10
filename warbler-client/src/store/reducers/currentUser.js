import { SET_CURRENT_USER } from "../actionTypes";

//defult State:
const DEFAULT_STATE = {
  isAuthenticated: false, //should be truth when logged in;
  user: {} //all user info whne logged in;
};

//get entire user obj inside of dispatch action and place soem of it into state;
//use this info t check if authenticated;
export default (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case SET_CURRENT_USER:
    return {
      isAuthenticated: !!Object.keys(action.user).length, //are there keys or no keys in this object?
      user: action.user
    };
    default:
      return state;
  }
};
