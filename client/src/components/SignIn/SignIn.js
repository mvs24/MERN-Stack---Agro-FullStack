import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import '../SignUp/SignUp.css';
import './SignIn.css'

import { signInUser } from '../../store/actions/user';

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signIn = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signInUser(data, this.props.history);
  };

  render() {
    const loginErrors = this.props.user.loginError;
    return (
      <div className="signIn-signUp">
        <form className="signUp" onSubmit={this.signIn} autoComplete='off'>
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Sign in to Social Network</h1>
            </div>

            <div className="formContainer">
              <div className="input inputS">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <i className="fas fa-envelope icon"></i>
                {loginErrors ? (
                  <div className="error">
                    {loginErrors.email ? <span>{loginErrors.email}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input inputS">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <i className="fas fa-lock icon"></i>
                {loginErrors ? (
                  <div className="error">
                    {loginErrors.password ? <span>{loginErrors.password}</span> : null}
                  </div>
                ) : null}
              </div>
            </div>
            <button className="signUpBtn" onClick={this.signIn}>
              SIGN IN
            </button>
          </div>
        </form>
        <div className="signIn">
          <div className="welcome">
            <div>
              <h1>Hello, Friend!!</h1>
              <p>Enter your personal details and start journey with us</p>
            </div>
            <div className="signInBtnContainer">
              <Link to="/">
                <button className="signInBtn signInBtnS">SIGN UP</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {signInUser}
)(SignIn);
