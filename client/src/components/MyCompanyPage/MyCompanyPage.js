import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllProducts } from "../../store/actions/product";
import { getUserData } from "../../store/actions/user";
import { getMyCompany } from "../../store/actions/company";
import CompanyDetail from "../CompanyDetail/CompanyDetail";
import Spinner from "../Spinner/Spinner";

class MyCompanyPage extends Component {
  componentDidMount() {
    this.props.getUserData();

    this.props.getMyCompany();

    this.props.getAllProducts(this.props.match.params.cid);
  }

  render() {
    const myCompany = this.props.company.myCompany;
    const myCompanyId = this.props.match.params.cid;
    if (!myCompany) return <Spinner />;

    const { myCompanyProducts } = this.props.product;
    if (!myCompanyProducts) return null;
    console.log(this.props)

    return (
      <CompanyDetail
        cid={myCompanyId}
        name={myCompany.name}
        place={myCompany.place}
        username={myCompany.user.name}
        lastname={myCompany.user.lastname}
        products={myCompanyProducts}
      />
    );
  }
}

const mapStateToProps = state => ({
  company: state.company,
  product: state.product
});

export default connect(mapStateToProps, {
  getAllProducts,
  getUserData,
  getMyCompany
})(MyCompanyPage);
