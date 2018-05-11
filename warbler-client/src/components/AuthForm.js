import React, { Component } from "react";

export default class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
  }

  render(){
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText } = this.props;
    return(
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              <label htmlFor="email">Email:</label>
              <input
              className="form-control" //form-control is Bootstrap. Gives fool width;
              id="email" //for label
              name="email" //for State
              onChange={this.handleChange}
              value={email} //to be able to prepopulate with whatever Email is at the moment in case of error;
              type="text"
              />
              <label htmlFor="password">Password:</label>
              <input
              className="form-control" //form-control is Bootstrap. Gives fool width;
              id="password" //for label
              name="password" //for State
              onChange={this.handleChange}
              type="password" //to hide text
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
