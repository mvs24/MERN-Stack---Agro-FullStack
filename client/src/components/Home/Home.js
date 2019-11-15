import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getUserData} from '../../store/actions/user';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import MyCompany from '../MyCompany/MyCompany';

class Home extends Component {
    componentDidMount() {
        this.props.getUserData();
    }

    // TODO: WITH componentDidMount() to create an action to get myCompanies looping through 
    // all the companies and finding the companies corresponding to the logged in user

    render() {
        return (
            <div>
                <Header userData={this.props.user.user} ></Header>
                <Sidebar/>
                <div>
                    <MyCompany/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {getUserData})(Home);
