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

handleChange = e => { //with this syntax no need to bind this;
  this.setState({
    [e.target.name]: e.target.value //ES2015 computed propery names - allows generic handle change for any imputs
  });
};

handleSubmit = e => {
  e.preventDefault();//stop page from refreshing
  const authType = this.props.signUp ? "signup" : "signin"; //determines type of request to make
  this.props
    .onAuth(authType, this.state)
    .then(() => {
      this.props.history.push("/");
  })
  .catch(() => {
    return;
  });
};

  render(){
    const { email, username, password, profileImageUrl } = this.state;
    const {
      heading,
      buttonText,
      signUp,
      errors,
      history, //from React-Router as this.props.history
      removeError
    } = this.props;

    history.listen(() => { //listen to any change in the route and remove err.
      removeError();
    });

    return(
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && ( //if there's message ins of err obj -> display it
                <div className="alert alert-danger">{errors.message}</div>
              )}
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
            { signUp && ( //if then... if Route AuthoForm has SignUp prop:
                <div>
                  <label htmlFor="email">Username:</label>
                  <input
                    className="form-control" //form-control is Bootstrap. Gives fool width;
                    id="username" //for label
                    name="username" //for State
                    onChange={this.handleChange}
                    value={username} //to prepopulate with whatever current Email in case of errors;
                    type="text"
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    className="form-control" //form-control is Bootstrap. Gives fool width;
                    id="image-url" //for label
                    name="profileImageUrl" //for State
                    onChange={this.handleChange}
                    type="text" //to hide text
                    value={profileImageUrl} //to prepopulate with whatever current Image in case of errors;
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
