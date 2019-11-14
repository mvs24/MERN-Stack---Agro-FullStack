import axios from 'axios';

import { COMPANY_CREATION_ERROR, CREATE_COMPANY, GET_COMPANIES_ERROR, GET_ALL_COMPANIES } from './types';

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
        console.log(res.data);
    }).catch(err => console.log(err.response.data));
}