import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import CreateCompany from './components/CreateCompany/CreateCompany';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import AddProduct from './components/AddProduct/AddProduct';
import MyCompanyPage from './components/MyCompanyPage/MyCompanyPage';
import MyCart from './components/MyCart/MyCart';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signIn' exact component={SignIn}/>
        <Route path='/' exact component={SignUp}/>
        <Route path='/home' exact component={Home}/>
        <Route path='/createCompany' exact component={CreateCompany}/>
        <Route path='/company/:cid' component={CompanyDetails}/>
        <Route path='/addProduct/:cid'  component={AddProduct}/>
        <Route path='/myCompanyPage/:cid' exact component={MyCompanyPage}/>
        <Route path='/cart' exact component={MyCart}/>
        <Route path="/reload" component={null} key="reload" />
      </Switch>
    </BrowserRouter>
  );
}