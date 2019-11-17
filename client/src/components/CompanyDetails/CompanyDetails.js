import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyDetails, getCompanyProducts } from '../../store/actions/company';
import CompanyDetail from '../CompanyDetail/CompanyDetail';
import Spinner from '../Spinner/Spinner';

class CompanyDetails extends Component {
   componentDidMount() {
        const companyId = this.props.match.params.cid;
        this.props.getCompanyDetails(companyId);
        this.props.getCompanyProducts(companyId);
   }
    render() {
        const { companyDetail } = this.props.company;
        const { companyDetailError } = this.props.company;
        const { companyProducts } = this.props.companyProducts;

        if(companyDetailError) return <div>{companyDetailError}</div>
        if(!companyDetail) return <Spinner/>

        return <CompanyDetail
        lastname={companyDetail.user.lastname}
        username={companyDetail.user.name}
        place={companyDetail.place}
        name={companyDetail.name}
        products={companyProducts}
        />
    }
}

const mapStateToProps = state => ({
  company: state.company,
  companyProducts: state.companyProducts
});

export default connect(mapStateToProps, { getCompanyDetails, getCompanyProducts })(CompanyDetails);
