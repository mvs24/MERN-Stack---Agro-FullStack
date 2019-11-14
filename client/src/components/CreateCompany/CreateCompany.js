import React, { Component } from "react";
import { connect } from 'react-redux';

import "../SignUp/SignUp.css";
import { createCompany } from '../../store/actions/company';

class CreateCompany extends Component {
  state = {
    companyName: "",
    companyPlace: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  create = e => {
    e.preventDefault();
    const user = this.props.location.state.data;

    let data = {
        email: user.email,
        companyName: this.state.companyName,
        companyPlace: this.state.companyPlace
    }
    this.props.createCompany(data, this.props.history);
  }

  render() {
      const companyErrors = this.props.company.companyError;
      console.log(companyErrors);
    return (
      <div>
        <form className="signUp" onSubmit={this.create} autoComplete="off">
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Create your Company</h1>
            </div>
            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.companyName}
                  onChange={this.onChange}
                  name="companyName"
                  placeholder="Name of the Company"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {companyErrors ? (
                  <div className="error">
                    {companyErrors.name ? <span>{companyErrors.name}</span> : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.companyPlace}
                  onChange={this.onChange}
                  name="companyPlace"
                  placeholder="Place of the company"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {companyErrors ? (
                  <div className="error">
                    {companyErrors.place ? <span>{companyErrors.place}</span> : null}
                  </div>
                ) : null}
              </div>
            </div>
            <button className="signUpBtn">
              CREATE COMPANY
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { createCompany })(CreateCompany);