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

export default () => {
  return (
    <BrowserRouter>
      <Route path="/createCompany" exact component={CreateCompany} />
      <Route path="/signIn" exact component={SignIn} />
      <Route path="/" exact component={SignUp} />
      <Switch>
        <PrivateRoute path="/home" exact component={Home} />{" "}
      </Switch>
      <Switch>
        <PrivateRoute path="/company/:cid" component={CompanyDetails} />
      </Switch>
      <Switch>
        <PrivateRoute
          path="/myCompanyPage/:cid"
          exact
          component={MyCompanyPage}
        />
      </Switch>
      <Switch>
        <PrivateRoute path="/addProduct/:cid" component={AddProduct} />
      </Switch>
      <Switch>
        <PrivateRoute path="/cart" exact component={MyCart} />
      </Switch>
    </BrowserRouter>
  );
};
