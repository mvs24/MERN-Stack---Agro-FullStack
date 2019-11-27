import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./Company.css";

const Company = props => {
  let companyName = props.company.name;
  let companyOwner = props.company.user;

  if (companyName.length > 14) {
    companyName = companyName.substring(0, 13);
    companyName += "...";
  }
  if (companyOwner.name.length > 8) {
    companyOwner.name = companyOwner.name.substring(0, 7);
    companyOwner.name += "...";
  }
  if (companyOwner.lastname.length > 8) {
    companyOwner.lastname = companyOwner.lastname.substring(0, 7);
    companyOwner.lastname += "...";
  }

  return (
    <Link
      to={{
        pathname: `/company/${props.company._id}`
      }}
      className="company_container effect"
    >
      <div>
        <h5 className="info"> Market: {companyName}</h5>
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
