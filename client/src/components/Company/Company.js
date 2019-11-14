import React from "react";
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {getCompanyDetails} from '../../store/actions/company'
import './Company.css';

const Company = props => {
  const companyName = props.company.name;
  const companyOwner = props.company.user;
  const dispatch = useDispatch();

  const getCompany = (companyId, history) => {
    dispatch(getCompanyDetails(companyId, history));
  }

  return (
    <Link className='company_container'>
      <div ><h5> Company: {companyName}</h5></div>
      <div className='company_info'>
        <div>
          <h6>
          <span>Owner: </span> <span className='fullname'> {companyOwner.name} {companyOwner.lastname}</span>
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default withRouter(Company);