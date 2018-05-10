import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

//Error Reducer:
export default (state = { message: null }, action) => {
  switch (action.type) { //if else statement can be used instead;
    case ADD_ERROR:
      return { ...state, message: action.error };
    case REMOVE_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};
