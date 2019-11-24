import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        user !== null ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(mapStateToProps, null, null, { pure: false })(PrivateRoute)
);
