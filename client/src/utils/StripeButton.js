import React from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import { paymentSuccess } from '../store/actions/user';

const StripeButton = props => {
  const dispatch = useDispatch();
  const publishableKey = "pk_test_zUIsJ0pP0ioBysHoQcStX9cC00X97vuB7d";
  const priceForStripe = props.price * 100;

  const onToken = token => {
      dispatch(paymentSuccess(props.user, token));
    alert("Payment successful");
  };

  return (
    <div>
      <div>
        <StripeCheckout
          label="Pay now"
          name="AGRO PRICE"
          billingAddress
          shippingAddress
          description={`Your total is $${props.price}`}
          amount={priceForStripe}
          panelLabel="Pay Now"
          token={onToken}
          stripeKey={publishableKey}
        />
      </div>

      <span style={{ color: "red", fontSize: "18px" }}>
        *Please user the following test credit card for payments*
      </span>
      <span style={{ color: "red", fontSize: "18px" }}>
        4242 4242 4242 4242 --Exp: 01/20 --CW: 123
      </span>
    </div>
  );
};

export default StripeButton;
