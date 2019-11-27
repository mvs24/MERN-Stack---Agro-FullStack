import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "../Spinner/Spinner";
import "./Header.css";
import { signOutUser } from "../../store/actions/user";
import { connect } from "react-redux";

const Header = ({ userData, nrTodayProducts, children, reload }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUser());
  };

  if (!userData)
    return (
      <div className="u-center-text">
        <Spinner />
      </div>
    );

    if(userData.name.length > 12) {
      userData.name = userData.name.substring(0, 11);
      userData.name += '...';
    }
    if(userData.lastname.length > 12) {
      userData.lastname = userData.lastname.substring(0, 11);
      userData.lastname += '...';
    }

  return (
    <div>
      <div className="header_container">
        <div style={{ marginRight: "2rem" }} className="iconLink">
          <Link to="/home">
            <i className="fas fa-home"></i>
          </Link>
        </div>
        <div className="user white">
          <p className="white">
            Welcome: {userData.name + "  "}
            {userData.lastname}
          </p>
        </div>
        <div className="user">
          <p className="white">Today's Products: {nrTodayProducts}</p>
        </div>
        <div className="cart">
          <div className="icon-flex">
            {userData.role !== "user" ? null : (
              <div className="iconLink">
                <Link to="/cart">
                  <span className="cartLength">{userData.cart.length}</span>
                  <i className="fas fa-shopping-cart"></i>
                </Link>
              </div>
            )}
            <div onClick={signOut} className="iconLink">
              <Link to="/">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default connect()(Header);
