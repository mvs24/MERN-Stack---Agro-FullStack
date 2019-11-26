import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./Company.css";

const Company = props => {
  const companyName = props.company.name;
  const companyOwner = props.company.user;

  return (
 
      <Link
        to={{
          pathname: `/company/${props.company._id}`
        }}
        className="company_container effect"

      >
        <div>
          <h5 className="info"> Company: {companyName}</h5>
        </div>
        <div className="company_info">
          <div>
            <h6>
              <span className="info">Owner: </span>
              <span className="fullname info">
                {" "}
                {companyOwner.name} {companyOwner.lastname}
              </span>
            </h6>
          </div>
        </div>
      </Link>
    
  );
};

export default withRouter(Company);
