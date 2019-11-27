import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home/Home";
import CreateCompany from "./components/CreateCompany/CreateCompany";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import AddProduct from "./components/AddProduct/AddProduct";
import MyCompanyPage from "./components/MyCompanyPage/MyCompanyPage";
import MyCart from "./components/MyCart/MyCart";
import PrivateRoute from "./hoc/PrivateRoute";
import Auth from "./hoc/Auth";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/createCompany"
          exact
          component={Auth(CreateCompany, false)}
        />
        <Route path="/signIn" exact component={Auth(SignIn, false)} />
        <Route path="/" exact component={Auth(SignUp, false)} />
        <Route path="/home" exact component={Auth(Home, true)} />
        <Route path="/company/:cid" component={Auth(CompanyDetails, true)} />
        <Route
          path="/myCompanyPage/:cid"
          exact
          component={Auth(MyCompanyPage, true)}
        />
        <Route path="/addProduct/:cid" component={Auth(AddProduct, true)} />
        <Route path="/cart" exact component={Auth(MyCart, true)} />
      </Switch>
    </BrowserRouter>
  );
};
