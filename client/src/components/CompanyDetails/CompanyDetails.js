import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyDetails } from '../../store/actions/company';
import CompanyDetail from '../CompanyDetail/CompanyDetail';
import Spinner from '../Spinner/Spinner';

class CompanyDetails extends Component {
   componentDidMount() {
        const companyId = this.props.location.search.replace('?companyId=', '');
        this.props.getCompanyDetails(companyId);
   }
    render() {
        const { companyDetail } = this.props.company;
        const { companyDetailError } = this.props.company;

        if(companyDetailError) return <div>{companyDetailError}</div>
        if(!companyDetail) return <Spinner/>

        return <CompanyDetail
        lastname={companyDetail.user.lastname}
        username={companyDetail.user.name}
        place={companyDetail.place}
        name={companyDetail.name}
        />
    }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { getCompanyDetails })(CompanyDetails);
