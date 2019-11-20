import axios from "axios";

import { USER_ERROR,
         SIGN_IN_USER,
         USER_ERROR_LOGIN,
         GET_USER_DATA,
         GET_USER_DATA_ERROR,
         SIGN_OUT_USER,
         SIGN_OUT_USER_ERROR,
         ADD_PRODUCT_TO_CARD,
         DECREASE_ITEM_QUANTITY,
         INCREASE_ITEM_QUANTITY,
         REMOVE_ITEM_FROM_CART,
         PAYMENT_SUCCESS
} from "./types";

export const signUpUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(res => history && history.push('/signIn'))
    .catch(err =>
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    );
};

export const signInUser = (userData, history) => dispatch => {
    axios.post('/api/user/login', userData).then(res => {
      dispatch({
        type: SIGN_IN_USER,
        payload: res.data
      })
      history.push('/home');
    }).catch(err => dispatch({
      type: USER_ERROR_LOGIN,
      payload: err.response.data
    })
    )
}

export const getUserData = () => dispatch => {
  axios.get('/api/user/current')
    .then(res => dispatch({ type: GET_USER_DATA, payload: res.data }))  
    .catch(err => dispatch({ type: GET_USER_DATA_ERROR, payload: err.response.data }))
}

export const goToCompany = (data, history) => dispatch => {
  dispatch(signUpUser(data));
    history.push({
        pathname: '/createCompany',
        state: {data}
    });
}

export const signOutUser = () => dispatch => {
  axios.get('/api/user/logout')
    .then(res => dispatch({
      type: SIGN_OUT_USER
    }))
    .catch(err => dispatch({
      type: SIGN_OUT_USER_ERROR,
      payload: err.response.data
  }))
}

export const addProductToCard = (dataToBuy) => dispatch => {
  axios.post('/api/user/addToCart', dataToBuy).then(res => {
    dispatch({
      type: ADD_PRODUCT_TO_CARD,
      payload: res.data
    })
  }).catch(err => console.log(err.response.data));
}

export const decreaseItemQuantity = item => dispatch => {
  axios.post('/api/user/decreaseItemQuantity', item).then(res => {
    dispatch({
      type: DECREASE_ITEM_QUANTITY,
      payload: res.data
    })
  }).catch(err => console.log(err.response.data))
};

export const increaseItemQuantity = item => dispatch => {
  axios.post('/api/user/increaseItemQuantity', item).then(res => {
    dispatch({
      type: INCREASE_ITEM_QUANTITY,
      payload: res.data
    })
  }).catch(err => console.log(err.response.data));
};

export const removeItemFromCart = item => dispatch => {
  axios.post('/api/user/removeItemFromCart', item).then(res => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: res.data
    })
  }).catch(err => console.log(err.response.data));
};

export const paymentSuccess = (user) => dispatch => {
  axios.post(`/api/user/paymentSuccess/${user._id}`).then(res => {
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: res.data
    })
  })
} 