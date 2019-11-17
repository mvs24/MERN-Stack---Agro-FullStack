import { GET_COMPANY_PRODUCTS } from "../actions/types";

const initialState = {
    companyProducts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY_PRODUCTS:
            return {
                companyProducts: action.payload
            }
        default:
            return state;
    }
}