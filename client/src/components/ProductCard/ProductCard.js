import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addProductToCard } from "../../store/actions/user";
import "./ProductCard.css";

class ProductCard extends Component {
  state = {
    quantity: "",
    shouldChange: true
  };

  addToCart = async product => {
    let dataToBuy = {
      price: this.state.quantity * 1 * product.medPrice * 1,
      date: Date.now(),
      nameOfProduct: product.name,
      productId: product._id,
      quantity: this.state.quantity * 1,
      singleItemPrice: product.medPrice
    };
    if (product.images.length > 0) {
      dataToBuy.image = product.images[0].url;
    }

    this.props.addProductToCard(dataToBuy);
  };

  render() { 
    const product = this.props.product;

    if (product.quantity <= 0) return null;

    const userId = this.props.user.user._id;
    let image = undefined;

    const randomNumber = () => {
      if (this.state.shouldChange) {
        return Math.floor(Math.random() * 3);
      }
    };

    if (product.images.length > 0) {
      image = product.images[0].url;
    } else {
      image =
        "https://1740009751.rsc.cdn77.org/sites/balkanbaba/docs/al/image_1430320148_32.png";
    }

    let classNames = [
      "card__side",
      "card__side__back",
      `card__side__back__${randomNumber()}`
    ];
    classNames = classNames.join(" ");

    return (
      <div className="col-1-of-3">
        <div
          className={
            this.props.user.user.role === "seller" ? "cardOwner" : "card"
          }
        >
          {product.user.toString() === userId.toString() ? (
            <div className="card__side card__side__front">
              <div
                className="card__picture"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "14.375rem"
                }}
              >
                &nbsp;
              </div>
              <div className="card__heading">
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "rgb(197, 187, 187)"
                  }}
                >
                  Name:
                </span>
                {product.name}
              </div>
              <div className="card__detail">
                <ul>
                  <li>Company: {product.company.name}</li>
                  <li>Small Price: {product.smallPrice}</li>
                  <li>Big Price: {product.bigPrice}</li>
                  <li>Medium Price: {product.medPrice}</li>
                  <li>Quantity: {product.quantity}</li>
                  <li>
                    Date:{" "}
                    <Moment format="DD:MM:YYYY  HH:mm">{product.date}</Moment>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="card__side card__side__front">
              <div
                className="card__picture"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "14.375rem"
                }}
              >
                &nbsp;
              </div>
              <div className="card__heading">
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "rgb(197, 187, 187)"
                  }}
                >
                  Name:
                </span>
                {product.name}
              </div>
              <div className="card__detail">
                <ul>
                  <li>Company: {product.company.name}</li>
                  <li>Small Price: {product.smallPrice}</li>
                  <li>Big Price: {product.bigPrice}</li>
                  <li>Medium Price: {product.medPrice}</li>
                  <li>Quantity: {product.quantity}</li>
                  <li>
                    Date:{" "}
                    <Moment format="DD:MM:YYYY  HH:mm">{product.date}</Moment>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {product.user.toString() === userId.toString() ? null : (
            <div className={classNames}>
              <input
                onChange={e =>
                  this.setState({
                    quantity: e.target.value,
                    shouldChange: false
                  })
                }
                type="number"
                className="quantityInput"
                value={this.state.quantity}
                placeholder="Quantity to buy"
              />
              <input
                className="quantityInput priceInput"
                type="text"
                value={
                  "Price: $" + this.state.quantity * 1 * product.medPrice * 1
                }
              />
              <button
                disabled={this.state.quantity <= 0}
                className={
                  this.state.quantity <= 0 ? "btnPos" : "pointer btnPos"
                }
                onClick={() => this.addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(
  connect(mapStateToProps, { addProductToCard })(ProductCard)
);
