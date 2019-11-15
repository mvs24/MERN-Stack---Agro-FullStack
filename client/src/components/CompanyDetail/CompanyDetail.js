import React from "react";

import "./CompanyDetail.css";

export default ({ username, lastname, place, name, myCompany }) => {
  if (myCompany) {
    return (
      <div className="myCompanyContainer">
        <div className="myCompanyName">
          <h3 className="">
            My Company: <span>{name}</span>
          </h3>
        </div>
        <div className='btnContainer'>
            <button type='button'>Add a new Product</button>
        </div>
      </div>
    );
  }
  return (
    <div className="companyDetail_container">
      <div className="companyDetailInfo">
        <h3 className="companyName">
          {" "}
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
