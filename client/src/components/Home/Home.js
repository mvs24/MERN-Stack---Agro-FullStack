import React, { Component } from "react";
import { connect } from "react-redux";

import { getUserData } from "../../store/actions/user";

import "./Home.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MyCompany from "../MyCompany/MyCompany";
import TodayProducts from "../TodayProducts/TodayProducts";

class Home extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  // TODO: WITH componentDidMount() to create an action to get myCompanies looping through
  // all the companies and finding the companies corresponding to the logged in user

  render() {
    if (!this.props.user.user) return null;
    return (
      <main className="main">
        <Header userData={this.props.user.user}></Header>

        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="products">
          <TodayProducts />
        </div>
        <div className="myCompany">
          <MyCompany userData={this.props.user.user} />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getUserData })(Home);
