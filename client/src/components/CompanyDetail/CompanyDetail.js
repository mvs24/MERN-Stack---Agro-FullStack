import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import "./CompanyDetail.css";
import ProductCard from "../ProductCard/ProductCard";
import {
  loadMoreProducts,
  loadLessProducts,
  getNrOfTodayProducts
} from "../../store/actions/product";
import { getUserData } from "../../store/actions/user";
import Header from "../Header/Header";

class CompanyDetail extends React.Component {
  componentDidMount() {
    this.props.getUserData();
    this.getProductsLength();
    this.props.getNrOfTodayProducts();
  }

  state = {
    page: 1,
    productsLength: ""
  };

  getProductsLength = async () => {
    let productsLength = await axios.get(
      `/api/product/companyProductsLength/${this.props.match.params.cid}`
    );
    this.setState({ productsLength: productsLength.data });
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
      todayProducts
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
                  <ProductCard key={product._id} product={product} />
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
                  Total: {productsLength} Products
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  product: state.product
});

export default withRouter(
  connect(mapStateToProps, {
    loadMoreProducts,
    loadLessProducts,
    getUserData,
    getNrOfTodayProducts
  })(CompanyDetail)
);
