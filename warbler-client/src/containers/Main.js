import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth"; //pass down as prop to AuthForm
import { removeError } from "../store/actions/errors";

//Routing logic

const Main = props => {
  const { authUser, errors, removeError } = props;
  return(
    <div className="container">
      <Switch> //allows multip. routes
        <Route exact path="/" render={props => <Homepage {...props} /> } /> //render func that renders Homepage comp;
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Sign me up!"
                heading="Join Warbler today."
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Log in"
                heading="Welcome Back."
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state){ //connects component to Redux store;
  return {
    currentUser: state.currentUser, //for Homepage to either disp landingOage or the timeline of Messages
    errors: state.errors
  };
}

export default withRouter( //allows to get props from Router to Component
  connect(mapStateToProps, { authUser, removeError })(Main)
);
