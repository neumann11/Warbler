import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";

//Routing logic

const Main = props => {
  return(
    <div className="container">
      <Switch> //allows multip. routes
        <Route exact path="/" render={props => <Homepage {...props} /> } /> //render func that renders Homepage comp;
      </Switch>
    </div>
  );
};

function mapStateToProps(state){ //connects component to Redux store;
  return {
    currentUser: state.currentUser //for Homepage to either disp landingOage or the timeline of Messages
  };
}

export default withRouter(connect(mapStateToProps, null)(Main)); //allows to get props from Router to Component
