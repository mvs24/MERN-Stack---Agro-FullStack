import {
  COMPANY_CREATION_ERROR,
  CREATE_COMPANY,
  GET_ALL_COMPANIES,
  GET_COMPANY_DETAILS_ERROR,
  GET_COMPANY_DETAILS,
  GET_MY_COMPANY_ERROR,
  GET_MY_COMPANY,
  SIGN_OUT_USER,
  ADD_NEW_PRODUCT
} from "../actions/types";

const initialState = {
  companyError: null,
  companies: [],
  myCompanyError: null,
  myCompany: null,
  companyDetail: null,
  companyDetailError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_CREATION_ERROR:
      return {
        ...state,
        companyError: action.payload
      };
    case CREATE_COMPANY:
      return {
        ...state,
        companyError: null
      };
    case GET_ALL_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    case GET_COMPANY_DETAILS_ERROR:
      return {
        ...state,
        companyDetailError: action.payload
      };
    case GET_COMPANY_DETAILS:
      return {
        ...state,
        companyDetail: action.payload
      };
    case GET_MY_COMPANY_ERROR:
      return {
        ...state,
        myCompanyError: action.payload
      };
    case GET_MY_COMPANY:
      return {
        ...state,
        myCompany: action.payload
      };
    case SIGN_OUT_USER:
      return {
        companyError: null,
        companies: [],
        myCompanyError: null,
        myCompany: null,
        companyDetail: null,
        companyDetailError: null
      };
    case ADD_NEW_PRODUCT:
      return {
        ...state
      }
    default:
      return {...state}
  }
};
