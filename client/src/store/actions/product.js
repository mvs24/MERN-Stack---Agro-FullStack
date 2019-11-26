import axios from "axios";

import {
  ADD_NEW_PRODUCT_ERROR,
  ADD_NEW_PRODUCT,
  ALL_PRODUCTS_MY_COMPANY,
  ALL_PRODUCTS_MY_COMPANY_ERROR,
  GET_TODAY_PRODUCTS,
  LOAD_MORE_PRODUCTS,
  LOAD_LESS_PRODUCTS,
  LOAD_MORE_TODAY_PRODUCTS,
  NR_OF_TODAY_PRODUCTS
} from "./types";

export const addNewProduct = (companyId, data, history) => dispatch => {
  axios
    .post(`/api/product/${companyId}`, data)
    .then(res => {
      dispatch({
        type: ADD_NEW_PRODUCT,
        payload: res.data
      });
      history.push(`/myCompanyPage/${companyId}`);
    })
    .catch(err => {
      dispatch({
        type: ADD_NEW_PRODUCT_ERROR,
        payload: err.response.data
      });
    });
};

export const getAllProducts = cid => dispatch => {
  axios
    .get(`/api/product/allProducts/${cid}`)
    .then(res => {
      dispatch({
        type: ALL_PRODUCTS_MY_COMPANY,
        payload: res.data
      }); 
    })
    .catch(err => {
      dispatch({
        type: ALL_PRODUCTS_MY_COMPANY_ERROR,
        payload: err.response.data
      }); 
    });
};

export const getTodayProducts = page => dispatch => {
  axios
    .get(`/api/product/todayProducts?page=2`)
    .then(res => {
      dispatch({
        type: GET_TODAY_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const loadMoreProducts = (page, cid) => dispatch => {
  axios
    .get(`/api/product/all/${cid}?page=${page}`)
    .then(res => {
      dispatch({
        type: LOAD_MORE_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err.response.data));
};

export const loadLessProducts = (page, cid) => dispatch => {
  axios
    .get(`/api/product/all/${cid}?page=${page}`)
    .then(res => {
      dispatch({
        type: LOAD_LESS_PRODUCTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err.response.data));
};

export const loadMoreTodayProducts = page => dispatch => {
  axios.get(`/api/product/todayProducts?page=${page}`).then(res => {
    dispatch({
      type: LOAD_MORE_TODAY_PRODUCTS,
      payload: res.data
    });
  });
};

export const loadLessTodayProducts = page => dispatch => {
  axios.get(`/api/product/todayProducts?page=${page}`).then(res => {
    dispatch({
      type: LOAD_MORE_TODAY_PRODUCTS,
      payload: res.data
    });
  });
};

export const getNrOfTodayProducts = () => dispatch => {
  axios.get("/api/product/numberOfTodayProducts").then(res => {
    dispatch({
      type: NR_OF_TODAY_PRODUCTS,
      payload: res.data
    });
  });
};
