import React, { Component } from "react";
import { connect } from "react-redux";

import { getUserData } from "../../store/actions/user";
import { getNrOfTodayProducts } from "../../store/actions/product";

import "./Home.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MyCompany from "../MyCompany/MyCompany";
import TodayProducts from "../TodayProducts/TodayProducts";

class Home extends Component {


  componentDidMount() {
    this.props.getUserData();
    this.props.getNrOfTodayProducts(); 
  }

  render() {
    if (!this.props.user.user) return null;
    const {nrTodayProducts} = this.props.product
    if(nrTodayProducts === null) return null;
    
    return (
      <main className="main">
        <Header nrTodayProducts={nrTodayProducts} userData={this.props.user.user}></Header>

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
  user: state.user,
  product: state.product
});

export default connect(mapStateToProps, { getUserData, getNrOfTodayProducts })(Home);
 