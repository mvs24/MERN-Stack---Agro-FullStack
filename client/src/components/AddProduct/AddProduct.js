import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addNewProduct,
  getNrOfTodayProducts
} from "../../store/actions/product";
import { getMyCompany } from "../../store/actions/company";
import { getUserData } from "../../store/actions/user";
import FileUpload from "../../utils/FileUpload";
import Header from "../Header/Header";

class AddProduct extends Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getMyCompany();
    this.props.getNrOfTodayProducts();
  }

  state = {
    productName: "",
    productQuantity: "",
    productSmallPrice: "",
    productBigPrice: "",
    images: {
      value: []
    },
    priceErr: ""
  };

  imagesHandler = images => {
    const updatedState = {
      ...this.state
    };
    updatedState.images.value = images;
    this.setState({ images: updatedState.images });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createProduct = (e, cid) => {
    e.preventDefault();

    const data = { ...this.state };
    data.images = this.state.images.value;
   
    if (data.productBigPrice * 1 < data.productSmallPrice * 1) {
      this.setState({
        priceErr: "Big Price can not be less than small Price"
      });
    } else {
      this.props.addNewProduct(cid, data, this.props.history);
    }
  };

  render() {
    const companyId = this.props.match.params.cid;
    const { productError } = this.props.product;

    if (!this.props.user.user) return null;
    if (this.props.product.nrTodayProducts === null) return null;

    return (
      <div>
        <Header
          userData={this.props.user.user}
          nrTodayProducts={this.props.product.nrTodayProducts}
        />
        <form
          className="signUp addProductForm"
          onSubmit={e => this.createProduct(e, companyId)}
          autoComplete="off"
        >
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Create a product for your company</h1>
            </div>
            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.productName}
                  onChange={this.onChange}
                  name="productName"
                  placeholder="Name of the Product"
                  type="text"
                />
                <i className="fas fa-lightbulb icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productName ? (
                      <span>{productError.productName}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.productQuantity}
                  onChange={this.onChange}
                  name="productQuantity"
                  placeholder="Quantity (Unit or Kg)"
                  type="number"
                />
                <i className="icon">=</i>
                {productError ? (
                  <div className="error">
                    {productError.productQuantity ? (
                      <span>{productError.productQuantity}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.productSmallPrice}
                  onChange={this.onChange}
                  name="productSmallPrice"
                  placeholder="Price ($), Starting from"
                  type="number"
                />
                <i className="fas fa-dollar-sign icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productSmallPrice ? (
                      <span>{productError.productSmallPrice}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.productBigPrice}
                  onChange={this.onChange}
                  name="productBigPrice"
                  placeholder="Price ($), Ending to"
                  type="number"
                />
                <i className="fas fa-dollar-sign icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productBigPrice ? (
                      <span>{productError.productBigPrice}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <FileUpload
                imagesHandler={images => this.imagesHandler(images)}
              />
            </div>
            <button className="signUpBtn createBtn">CREATE PRODUCT</button>
          </div>
        </form>
        {this.state.priceErr !== "" && (
          <span style={{ color: "red" }}>{this.state.priceErr}</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(mapStateToProps, {
  addNewProduct,
  getMyCompany,
  getUserData,
  getNrOfTodayProducts
})(AddProduct);
