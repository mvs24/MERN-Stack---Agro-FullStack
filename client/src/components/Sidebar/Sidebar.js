import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllCompanies, getNrOfCompanies } from "../../store/actions/company";
import Spinner from "../Spinner/Spinner";
import Company from "../Company/Company";
import "./Sidebar.css";

class Sidebar extends Component {
  componentDidMount() {
    this.props.getAllCompanies();
    this.props.getNrOfCompanies();
  }

  render() {
    const companies = this.props.company.companies;
    if (this.props.company.nrOfCompanies === null) return null;

    if (companies.length === 0) return <Spinner />;
    return (
      <div className="allCompanies">
        <div className="companies">
          {" "}
          <span>Companies: {this.props.company.nrOfCompanies}</span>{" "}
        </div>
        {companies.map(company => (
          <Company key={company._id} company={company} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { getAllCompanies, getNrOfCompanies })(
  Sidebar
);
