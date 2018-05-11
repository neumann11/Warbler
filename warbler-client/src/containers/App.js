import React, { Component } from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store"; // ../store/index.js
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar"
import Main from "./Main"
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode"; //decodes middle part of Token(payload) into correct object to pass to current user;

//create a store:
const store = configureStore();

//if ReduxStore cleared or server goes down, it allows to keep our state/repopulate state with the current user;
if(localStorage.jwtToken){ //checks if there's Token when page refreshes
  setAuthorizationToken(localStorage.jwtToken); //if exists, incl. Token in all future request in Authorization HEader
  //prevent someone from manually tempering with key in local storage:
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken))); //decode middle part of the token to extract correct object
  } catch (err) { //handle if token modified/not valid - force logout
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
