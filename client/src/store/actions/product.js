import axios from "axios";

import {ADD_NEW_PRODUCT_ERROR, ADD_NEW_PRODUCT, ALL_PRODUCTS_MY_COMPANY, ALL_PRODUCTS_MY_COMPANY_ERROR, GET_TODAY_PRODUCTS } from './types';

export const addNewProduct = (companyId, data, history) => dispatch => {
    axios.post(`/api/product/${companyId}`, data).then(res => {
        dispatch({
            type: ADD_NEW_PRODUCT,
            payload: res.data
        })
        history.push(`/myCompanyPage/${companyId}`);
    }).catch(err => {
        dispatch({
            type: ADD_NEW_PRODUCT_ERROR,
            payload: err.response.data
        })
    })
}

export const getAllProducts = cid => dispatch => {
    axios.get(`/api/product/all/${cid}`).then(res => {
        dispatch({
            type: ALL_PRODUCTS_MY_COMPANY,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: ALL_PRODUCTS_MY_COMPANY_ERROR,
            payload: err.response.data
        })
    })
}

export const getTodayProducts = (currentDate) => dispatch => {
    axios.get('/api/product/todayProducts').then(res => {
        dispatch({
            type: GET_TODAY_PRODUCTS,
            payload: res.data
        })
    }).catch(err => console.log(err)); 
} 