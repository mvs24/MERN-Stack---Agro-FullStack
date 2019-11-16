import React, { Component } from "react";
import { connect } from "react-redux";

import "./MyCompany.css";
import { getMyCompany } from "../../store/actions/company";
import CompanyDetail from "../CompanyDetail/CompanyDetail";

class MyCompany extends Component {
  componentDidMount() {
    this.props.getMyCompany();
  }

  render() {
    if (!this.props.company.myCompany) return null;
    const myCompany = this.props.company.myCompany;

    return (
      <div>
        <CompanyDetail
          myCompanyInSide={true}
          name={myCompany.name}
          place={myCompany.place}
          username={myCompany.user.name}
          lastname={myCompany.user.lastname}
          companyId={myCompany._id}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { getMyCompany })(MyCompany);
