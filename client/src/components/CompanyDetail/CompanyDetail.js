import React from "react";
import { withRouter } from "react-router-dom";

import "./CompanyDetail.css";
import ProductCard from "../ProductCard/ProductCard";

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

    let minHeight = Math.ceil((products.length / 3)) * 100;

    if (myCompanyInSide) {
      return (
        <div className="myCompanyContainer">
          <div className="myCompanyName">
            <h3 className="">
              My Company: <span>{name}</span>
            </h3>
          </div>
          <div className="btnContainer">
            <button
              className="button"
              onClick={() => this.addProduct(companyId, history)}
            >
              Add a new Product
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
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
            {!products ? (
              <div>No products found for this company</div>
            ) : (
              <span style={{ padding: "1rem" }}>
                Total: {products.length} Products
              </span>
            )}
          </div>
        </div>
        <div className="grid" style={{ minHeight: `${minHeight}vh` }}>
          {products &&
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(CompanyDetail);