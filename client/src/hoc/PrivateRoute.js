import React, { useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { getUserData } from "../store/actions/user";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserData());
  // }, []);

  // if(user.user === null) return null;

  return (
    <Route
      {...rest}
      render={props => {
        if (user.user) {
          return <Component {...props} />;
        } 
        else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
