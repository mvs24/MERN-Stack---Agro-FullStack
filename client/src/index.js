import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import userReducer from './store/reducers/user';
import companyReducer from './store/reducers/company';
import productReducer from './store/reducers/product';
import companyProductsReducer from './store/reducers/companyProducts';

const rootReducer = combineReducers({
    user: userReducer,
    company: companyReducer,
    product: productReducer,
    companyProducts: companyProductsReducer
});

const initialState = {};
let middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

ReactDOM.render(
    <Provider store={store}>
       <App /> 
    </Provider>
, document.getElementById('root'));
