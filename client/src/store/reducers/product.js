import { ADD_NEW_PRODUCT_ERROR, ADD_NEW_PRODUCT, ALL_PRODUCTS_MY_COMPANY, GET_TODAY_PRODUCTS } from "../actions/types";

const initialState = {
    productError: null,
    myCompanyProducts: null,
    todayProducts: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_PRODUCT_ERROR:
            return {
                ...state,
                productError: action.payload
            }
        case ADD_NEW_PRODUCT:
            return {
                ...state
            }
        case ALL_PRODUCTS_MY_COMPANY:
            return {
                ...state,
                myCompanyProducts: action.payload
            }
        case GET_TODAY_PRODUCTS:
            return {
                ...state,
                todayProducts: action.payload
            }
        default:
            return state;
    }
}