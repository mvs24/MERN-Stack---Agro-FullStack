import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';


export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signIn' exact component={SignIn}/>
        <Route path='/' exact component={SignUp}/>
        <Route path='/home' exact component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}