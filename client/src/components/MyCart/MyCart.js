import React, { Component } from "react";
import { connect } from "react-redux";

import "./MyCart.css";
import { getUserData } from "../../store/actions/user";
import { getNrOfTodayProducts } from "../../store/actions/product";
import Header from "../Header/Header";
import CartItem from "../CartItem/CartItem";
import StripeButton from "../../utils/StripeButton";

class MyCart extends Component {
  componentDidMount() {
    this.props.getUserData();
    this.props.getNrOfTodayProducts();
  }

  render() {
    const user = this.props.user.user;
    if (!user) return null;

    const totalPrice = user.cart.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);

    if (this.props.product.nrTodayProducts === null) return null;

    return (
      <div className="shopCart__container">
        <Header
          userData={user}
          nrTodayProducts={this.props.product.nrTodayProducts}
        />
        <div className="cart__background">
          <span>Shopping Cart</span>
        </div>
        <div className="flex">
          <div className="cart__list">
            {user.cart.length === 0 && <span>No items found in your cart</span>}
            {user.cart.length > 0 &&
              user.cart.map(el => <CartItem key={el.productId} item={el} />)}
          </div>
          <div>
            <div>
              <span>
                Total Price: <strong>${totalPrice.toFixed(2)}</strong>{" "}
              </span>
            </div>
            <StripeButton user={user} price={totalPrice} />
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

export default connect(mapStateToProps, { getUserData, getNrOfTodayProducts })(
  MyCart
);
