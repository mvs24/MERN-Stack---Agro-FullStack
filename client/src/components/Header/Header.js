import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Spinner from "../Spinner/Spinner";
import "./Header.css";
import { signOutUser } from "../../store/actions/user";

const Header = ({ userData, children }) => {
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
  return (
    <div>
      <div className="header_container">
        <div className="user">
          Welcome {userData.name.toUpperCase()}{" "}
          {userData.lastname.toUpperCase()}
        </div>
        <div className="cart">
          <div className="icon-flex">
            {userData.role !== "user" ? null : (
              <div className="iconLink">
                <Link to="/cart">
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

export default Header;
