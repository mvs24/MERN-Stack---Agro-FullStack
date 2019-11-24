import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignUp.css";
import { Link } from "react-router-dom";
import Select from 'react-select'

import { signUpUser, goToCompany } from "../../store/actions/user";

const options = [
  { value: 'user', label: 'User' },
  { value: 'seller', label: 'Seller' }
];

export class SignUp extends Component {
  state = {
    name: "",
    lastname: "",
    email: "",
    password: "",
    place: '', 
    role: 'user'
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  signUp = e => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      lastname: this.state.lastname,
      place: this.state.place,
      role: this.state.role.value
    };
    if(data.role === 'seller') {
      this.props.goToCompany(data, this.props.history)
    } else {
      this.props.signUpUser(data, this.props.history);
    }
  };

  handleChange = role => {
    this.setState({role})
  };

  render() {
    const registerErrors = this.props.user.registerError;
    const { role } = this.state;
    return (
      <div className="signIn-signUp">
        <div className="signIn">
          <div className="welcome">
            <div>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
            </div>
            <div className="signInBtnContainer">
              <Link to="/signIn">
                <button className="signInBtn">SIGN IN</button>
              </Link>
            </div>
          </div>
        </div>
        <form className="signUp" onSubmit={this.signUp} autoComplete='off'>
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Create Account</h1>
            </div>
            <p className="createText">Complete all the fields to register</p>
            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  name="name"
                  placeholder="Name"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {registerErrors ? (
                  <div className="error">
                    {registerErrors.name ? <span>{registerErrors.name}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.lastname}
                  onChange={this.onChange}
                  name="lastname"
                  placeholder="Lastname"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {registerErrors ? (
                  <div className="error">
                    {registerErrors.lastname ? <span>{registerErrors.lastname}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <i className="fas fa-envelope icon"></i>
                {registerErrors ? (
                  <div className="error">
                    {registerErrors.email ? <span>{registerErrors.email}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <i className="fas fa-lock icon"></i>
                {registerErrors ? (
                  <div className="error">
                    {registerErrors.password ? <span>{registerErrors.password}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.place}
                  onChange={this.onChange}
                  name="place"
                  placeholder="Living place"
                  type="text"
                />
                <i className="fas fa-envelope icon"></i>
                {registerErrors ? (
                  <div className="error">
                    {registerErrors.place ? <span>{registerErrors.place}</span> : null}
                  </div>
                ) : null}
              </div>
              <Select 
               value={role}
               onChange={this.handleChange}
               options={options}
               autoFocus
               placeholder='User'
              />
              {/* {this.state.roleChanged && (<div className='input'>
                <input
                  value={this.state.company}
                  onChange={this.onChange}
                  name="company"
                  placeholder="Your Company"
                  type="text"
                  required
                />
                <i className="fas fa-envelope icon"></i>
              </div>)} */}
            </div>
            <button className="signUpBtn" onClick={this.signUp}>
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {signUpUser, goToCompany}
)(SignUp);
