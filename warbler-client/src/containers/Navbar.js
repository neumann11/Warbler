import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/signin">Log in</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){ //pass state from Redux state
  return { //return an obj
    currentUser: state.currentUser //currUser placed of props. Value taken from State
  };
}

export default connect(mapStateToProps, null)(Navbar);
