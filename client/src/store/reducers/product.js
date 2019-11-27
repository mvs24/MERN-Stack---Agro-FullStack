import { ADD_NEW_PRODUCT_ERROR, 
         ADD_NEW_PRODUCT, 
         ALL_PRODUCTS_MY_COMPANY,
         GET_TODAY_PRODUCTS, 
         LOAD_MORE_TODAY_PRODUCTS,
         NR_OF_TODAY_PRODUCTS,
         REMOVE_PRODUCT, 
         PRODUCTS_LENGTH
} from "../actions/types";

const initialState = {
    productError: null,
    myCompanyProducts: null,
    todayProducts: null,
    nrTodayProducts: null
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
        case LOAD_MORE_TODAY_PRODUCTS:
            return {
                ...state,
                todayProducts: action.payload
            }
        case NR_OF_TODAY_PRODUCTS:
            return {
                ...state,
                nrTodayProducts: action.payload.nrOfTodayProducts
            } 
        case REMOVE_PRODUCT:
            return {
                ...state,
                myCompanyProducts: action.payload
            }
        case PRODUCTS_LENGTH:
            return {
                ...state,
                productsLength: action.payload
            }
        default:
            return state;
    }
}