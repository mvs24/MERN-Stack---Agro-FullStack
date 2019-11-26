import React, { Component } from "react";
import { connect } from "react-redux";

import "../SignUp/SignUp.css";
import { createCompany } from "../../store/actions/company";

class CreateCompany extends Component {
  state = {
    companyName: "",
    companyPlace: "",
    companyError: null
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  create = e => {
    e.preventDefault();

    let user = undefined;
    if (!this.props.location.state) {
      this.setState({
        companyError:
          "You do not have permission to create a market. You need to be a seller!!"
      });
      return;
    }

    if (this.props.location.state.data) {
      user = this.props.location.state.data;
    }

    let data = {
      email: user.email,
      companyName: this.state.companyName,
      companyPlace: this.state.companyPlace
    };
    this.props.createCompany(data, this.props.history);
  };

  render() {
    const companyErrors = this.props.company.companyError;

    return (
      <div>
        <form className="signUp" onSubmit={this.create} autoComplete="off">
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Create your Market</h1>
            </div>
            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.companyName}
                  onChange={this.onChange}
                  name="companyName"
                  placeholder="Name of the Market"
                  type="text"
                />
                <i class="fas fa-lightbulb icon"></i>
                {companyErrors ? (
                  <div className="error">
                    {companyErrors.name ? (
                      <span>{companyErrors.name}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.companyPlace}
                  onChange={this.onChange}
                  name="companyPlace"
                  placeholder="Place of the Market"
                  type="text"
                />
                <i className="fas fa-location-arrow icon"></i>
                {companyErrors ? (
                  <div className="error">
                    {companyErrors.place ? (
                      <span>{companyErrors.place}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <button className="signUpBtn" disabled={!this.props.location}>
              CREATE MARKET
            </button>
          </div>
        </form>
        {this.state.companyError && (
          <span style={{ color: "red" }}>{this.state.companyError}</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { createCompany })(CreateCompany);
