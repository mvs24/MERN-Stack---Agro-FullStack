import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import {
  paymentSuccess,
  paymentSuccessMail,
  removeQuantityOfProduct,
  getUserData,
  checkItemQuantities
} from "../store/actions/user";

class StripeButton extends Component {

  componentDidMount() {
    this.props.getUserData()
    this.checkQuantities()
  }

  checkQuantities = () => {
    if(this.props.user.user) {
      this.props.checkItemQuantities(this.props.user.user)
    }
  }

  onToken = token => {
    this.props.paymentSuccess(this.props.user);
    this.props.paymentSuccessMail(token);
    alert("Payment successful");
    this.props.removeQuantityOfProduct(this.props.user);
  };

  render() {
    let enableToBuy = true;
    const publishableKey = "pk_test_zUIsJ0pP0ioBysHoQcStX9cC00X97vuB7d";
    const priceForStripe = this.props.price * 100;

    if(this.props.user.checkItemQuantitiesError !== undefined) {
      enableToBuy = false;
    }
    console.log(enableToBuy);

    return (
      <div>
        <div>
          <StripeCheckout
            disabled={!enableToBuy}
            label="Pay now"
            name="AGRO PRICE"
            billingAddress
            shippingAddress
            description={`Your total is $${this.props.price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={this.onToken}
            stripeKey={publishableKey}
          />
        </div>

        <span style={{ color: "red", fontSize: "18px" }}>
          *Please use the following test credit card for payments*
        </span>
        <span style={{ color: "red", fontSize: "18px" }}>
          4242 4242 4242 4242 --Exp: 01/20 --CW: 123
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  paymentSuccess,
  paymentSuccessMail,
  removeQuantityOfProduct,
  getUserData,
  checkItemQuantities
})(StripeButton);

