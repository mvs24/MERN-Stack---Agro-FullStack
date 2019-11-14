import { COMPANY_CREATION_ERROR, CREATE_COMPANY, GET_ALL_COMPANIES } from "../actions/types";

const initialState = {
    companyError: null,
    companies: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_CREATION_ERROR:
            return {
                ...state,
                companyError: action.payload
            }
        case CREATE_COMPANY:
            return {
                ...state,
                companyError: null,
            }
        case GET_ALL_COMPANIES: 
            return {
                ...state,
                companies: action.payload
            }
        default:
            return state;
    }
}