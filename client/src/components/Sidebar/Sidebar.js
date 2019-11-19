import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAllCompanies } from '../../store/actions/company';
import Spinner from '../Spinner/Spinner';
import Company from '../Company/Company';
import './Sidebar.css'

class Sidebar extends Component {
    componentDidMount(){
        this.props.getAllCompanies();
    }

    render() {
        const companies = this.props.company.companies;

        if (companies.length === 0) return <Spinner/>
        return (
            <div>
                <div>Companies</div>
                {companies.map(company => <Company key={company._id} company={company}/>)}
            </div>
        )
        
    }
}

const mapStateToProps = state => ({
  company: state.company
});

export default connect(mapStateToProps, { getAllCompanies })(Sidebar);
