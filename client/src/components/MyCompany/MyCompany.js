import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import "./MyCompany.css";
import { getMyCompany } from "../../store/actions/company";
import { getUserData } from "../../store/actions/user";

class MyCompany extends Component {
  componentDidMount() {
    this.props.getMyCompany();
  }

  addProduct = (cid, history) => {
    history.push({
      pathname: `/addProduct/${cid}`
    });
  }; 
  render() {
    if (!this.props.company.myCompany) return null;

    const myCompany = this.props.company.myCompany;

    return (
      <div>
        <div className="myCompanyContainer">
          <Link style={{textDecoration: 'white', color: '#eee'}} to={{pathname: `/myCompanyPage/${myCompany._id}`}} className="myCompanyName">
            <h3 className="">
              My Company: <span>{myCompany.name}</span>
            </h3>
          </Link>
          <div className="btnContainer">
            <button
              className="button"
              onClick={() => this.addProduct(myCompany._id, this.props.history)}
            >
              Add a new Product
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

export default withRouter(
  connect(mapStateToProps, { getMyCompany, getUserData })(MyCompany)
);
