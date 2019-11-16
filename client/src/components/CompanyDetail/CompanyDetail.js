import React from "react";
import { withRouter } from "react-router-dom";

import "./CompanyDetail.css";


class CompanyDetail extends React.Component {

  addProduct = (cid, history) => {
    history.push({
      pathname: `/addProduct/${cid}`
    });
  };
  render() {
    const {
      username,
      lastname,
      place,
      name,
      myCompanyInSide,
      companyId,
      history,
      products
    } = this.props;

    if (myCompanyInSide) {
      return (
        <div className="myCompanyContainer">
          <div className="myCompanyName">
            <h3 className="">
              My Company: <span>{name}</span>
            </h3>
          </div>
          <div className="btnContainer">
            <button className="button" onClick={() => this.addProduct(companyId, history)}>
              Add a new Product
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="companyDetail_container">
        <div className="companyDetailInfo">
          <h3 className="companyName">
            Company: <span>{name}</span>
          </h3>
          <div className="placeUser">
            <p>Place: {place}</p>
            <p>
              Owner: {username} {lastname}
            </p>
          </div>
        </div>
        <div className="companyProducts">
          <h1>Products</h1>
          <div>
            {!products && (<div>No products found for this company</div>)}
          </div>
          <div>
            {/* {products && products.map(product => {console.log(product)})} */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CompanyDetail);
