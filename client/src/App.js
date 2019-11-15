import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import CreateCompany from './components/CreateCompany/CreateCompany';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';



export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signIn' exact component={SignIn}/>
        <Route path='/' exact component={SignUp}/>
        <Route path='/home' exact component={Home}/>
        <Route path='/createCompany' exact component={CreateCompany}/>
        <Route path='/company' component={CompanyDetails}/>
      </Switch>
    </BrowserRouter>
  );
}