import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./CompanyDetail.css";
import ProductCard from "../ProductCard/ProductCard";
import {
  loadMoreProducts,
  loadLessProducts,
  getNrOfTodayProducts,
  getProductsLength
} from "../../store/actions/product";
import { getUserData } from "../../store/actions/user";
import Header from "../Header/Header";

class CompanyDetail extends React.Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getNrOfTodayProducts();
    this.props.getProductsLength(this.props.match.params.cid);
  }

  state = {
    page: 1
  };

  loadMore = async (page, cid) => {
    await this.props.loadMoreProducts(page, cid);
    this.setState({ page: this.state.page + 1 });
  };

  loadLess = async (page, cid) => {
    await this.props.loadLessProducts(page, cid);
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    const {
      username,
      lastname,
      place,
      name,
      products,
      todayProducts,
      myCompanyProducts
    } = this.props;

    let minHeight = products ? Math.ceil(products.length / 3) * 100 : undefined;
    const { productsLength } = this.state;

    if (productsLength === "") return null;
    if (!this.props.user.user) return null;

    if (this.props.product.nrTodayProducts === null) return null;

    if (todayProducts) {
      return (
        <div>
          <Header
            userData={this.props.user.user}
            nrTodayProducts={this.props.product.nrTodayProducts}
          />
          <div>
            <div className="grid" style={{ minHeight: `${minHeight}vh` }}>
              {products &&
                products.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    myCompanyProducts={myCompanyProducts}
                  />
                ))}
            </div>
          </div>{" "}
        </div>
      );
    }

    return (
      <div>
        <Header
          userData={this.props.user.user}
          nrTodayProducts={this.props.product.nrTodayProducts}
        />
        <div>
          <div className="companyDetail_container">
            <div className="companyDetailInfo">
              <h3 className="companyName">
                Market: <span>{name}</span>
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
                <div style={{ color: "green" }}>
                  No products found for this company
                </div>
              ) : (
                <span style={{ padding: "1rem", color: "green" }}>
                  Total: {this.props.product.productsLength}{" "}
                  {this.props.product.productsLength === 1 ? (
                    <span>Product</span>
                  ) : (
                    <span>Products</span>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="grid" style={{ minHeight: `${minHeight}vh` }}>
            {products &&
              products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  myCompanyProducts={myCompanyProducts}
                />
              ))}
          </div>
          {myCompanyProducts === true ? null : (
            <div className="btns__container">
              {this.state.page > 1 && (
                <button
                  className="loadLessBtn"
                  onClick={() =>
                    this.loadLess(
                      this.state.page - 1,
                      this.props.match.params.cid
                    )
                  }
                >
                  Load Less
                </button>
              )}
              {products.length < 6 ||
              (products.length === 6 &&
                productsLength % products.length === 0) ? null : (
                <button
                  className="loadMoreBtn"
                  onClick={() =>
                    this.loadMore(
                      this.state.page + 1,
                      this.props.match.params.cid
                    )
                  }
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  product: state.product,
  company: state.company
});

export default withRouter(
  connect(mapStateToProps, {
    loadMoreProducts,
    loadLessProducts,
    getUserData,
    getNrOfTodayProducts,
    getProductsLength
  })(CompanyDetail)
);
