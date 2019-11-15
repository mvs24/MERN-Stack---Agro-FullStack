import React from "react";
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addNewProduct } from '../../store/actions/company';
import "./CompanyDetail.css";


const CompanyDetail = ({ username, lastname, place, name, myCompany, companyId, history }) => {
    const dispatch = useDispatch();

    const addProduct = cid => {
        dispatch(addNewProduct(cid, history));
    }

  if (myCompany) {
    return (
      <div className="myCompanyContainer">
        <div className="myCompanyName">
          <h3 className="">
            My Company: <span>{name}</span>
          </h3>
        </div>
        <div className='btnContainer'>
            <button className='button' onClick={() => addProduct(companyId)}>Add a new Product</button>
        </div>
      </div>
    );
  }
  return (
    <div className="companyDetail_container">
      <div className="companyDetailInfo">
        <h3 className="companyName">
          Company: <span>{name}</span>
        </h3>
        <div className="placeUser">
          <p>Place: {place}</p>
          <p>
            Owner: {username} {lastname}
          </p>
        </div>
      </div>
      <div className="companyProducts">
        <h1>Products</h1>
        <div></div>
      </div>
    </div>
  );
};

export default withRouter(CompanyDetail);