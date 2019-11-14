import { COMPANY_CREATION_ERROR, CREATE_COMPANY, GET_ALL_COMPANIES, GET_COMPANY_DETAILS_ERROR, GET_COMPANY_DETAILS } from "../actions/types";

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
        case GET_COMPANY_DETAILS_ERROR:
            return {
                ...state,
                companyDetailError: action.payload
            }
        case GET_COMPANY_DETAILS:
            return {
                ...state,
                companyDetail: action.payload
            }
        default:
            return state;
    }
}