import React, { Component } from "react";
import { connect } from "react-redux";

import "./MyCart.css";
import { getUserData } from "../../store/actions/user";
import Header from "../Header/Header";
import CartItem from "../CartItem/CartItem";

class MyCart extends Component {
  componentDidMount() {
    this.props.getUserData();
  }
  render() {
    const user = this.props.user.user;
    if (!user) return null;

    return (
      <div className="shopCart__container">
        <Header userData={user} />
        <div className="cart__background">
          {" "}
          <span>Shopping Cart</span>
        </div>
        <div className="cart__list">
          {user.cart.length === 0 && <span>No items found in your cart</span>}
          {user.cart.length > 0 &&
            user.cart.map(el => <CartItem key={el.productId} item={el} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { getUserData })(MyCart);
