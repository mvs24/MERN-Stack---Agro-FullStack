import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getUserData} from '../../store/actions/user';

import Header from '../Header/Header'

class Home extends Component {
    componentDidMount() {
        this.props.getUserData();
    }
    render() {
        return (
            <Header userData={this.props.user.user} >
                
            </Header>
        )
    }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {getUserData})(Home);
