import { COMPANY_CREATION_ERROR, CREATE_COMPANY } from "../actions/types";

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
                companies: [...state.companies, action.payload]
            }
        default:
            return state;
    }
}