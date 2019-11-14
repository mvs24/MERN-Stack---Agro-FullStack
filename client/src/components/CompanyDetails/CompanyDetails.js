import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCompanyDetails } from '../../store/actions/company';
import Spinner from '../Spinner/Spinner';
import './CompanyDetails.css';

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

        return (
            <div className='companyDetail_container'>
                <div className='companyDetailInfo'>
                    <h3 className='companyName'>Company: <span>{companyDetail.name}</span></h3>
                    <div className='placeUser'>
                        <p>Place: {companyDetail.place}</p>
                        <p>Owner: {companyDetail.user.name} {companyDetail.user.lastname}</p>
                    </div>
                </div>
                <div className='companyProducts'>
                    <h1>Products</h1>
                    <div></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { getCompanyDetails })(CompanyDetails);
