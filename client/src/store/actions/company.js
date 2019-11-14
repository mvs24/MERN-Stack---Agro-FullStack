import axios from 'axios';

import { COMPANY_CREATION_ERROR, CREATE_COMPANY } from './types';

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