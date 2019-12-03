import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import './MyCompany.css'
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
      <div className='myCompanyCnt'>
        <div className='block'>
          <Link
          className='linkCnt'
          to={{ pathname: `/myCompanyPage/${myCompany._id}` }}>
            My Market: {myCompany.name}
          </Link>
        </div>
        <div className='buttonCnt'>
          <button 
             onClick={() => this.addProduct(myCompany._id, this.props.history)}
          className='addButton'
          >Add a new Product</button>
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
