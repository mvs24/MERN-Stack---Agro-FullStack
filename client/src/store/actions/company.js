import axios from 'axios';

import { COMPANY_CREATION_ERROR,
         CREATE_COMPANY,
         GET_COMPANIES_ERROR,
         GET_ALL_COMPANIES,
         GET_COMPANY_DETAILS_ERROR,
         GET_COMPANY_DETAILS,
         GET_MY_COMPANY,
         GET_MY_COMPANY_ERROR
} from './types';


export const createCompany = (data, history) => dispatch => {
   axios.post('/api/company', data).then(res => {
       res.data.user.password = undefined;
       dispatch({
           type: CREATE_COMPANY,
           payload: res.data
       })
       history.push('/signIn');
   }).catch(err => {
       dispatch({
           type: COMPANY_CREATION_ERROR,
           payload: err.response.data
       })
   })
}

export const getAllCompanies = () => dispatch => {
    axios.get('/api/company').then(res => {
        dispatch({
            type: GET_ALL_COMPANIES,
            payload: res.data
        })
    }).catch(err => dispatch({
        type: GET_COMPANIES_ERROR,
        payload: err.response.data
    }))
}

export const getCompanyDetails = (companyId, history) => dispatch => {
    axios.get('/api/company/' + companyId).then(res => {
        dispatch({
            type: GET_COMPANY_DETAILS,
            payload: res.data
        })
    }).catch(err => dispatch({
        type: GET_COMPANY_DETAILS_ERROR,
        payload: err.response.data.companyNotFound
    }));
}

export const getMyCompany = () => dispatch => {
    axios.get('/api/company/my/myCompany').then(res => {
        dispatch({
            type: GET_MY_COMPANY,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_MY_COMPANY_ERROR,
            payload: err.response.data

        })
    })
}