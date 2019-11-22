import { GET_COMPANY_PRODUCTS, LOAD_MORE_PRODUCTS, LOAD_LESS_PRODUCTS, REMOVE_QUANTITY_OF_PRODUCT } from "../actions/types";

const initialState = {
    companyProducts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY_PRODUCTS:
            return {
                companyProducts: action.payload
            }
        case LOAD_MORE_PRODUCTS:
            return {
                ...state,
                companyProducts: action.payload
            }
        case LOAD_LESS_PRODUCTS:
            return {
                ...state,
                companyProducts: action.payload
            }
        default:
            return state;
    }
}