import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MyCompany.css';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

class MyCompany extends Component {

    state = {
        myCompany: null
    }
    
    getMyCompany = userId => {
        axios.get(`/api/company/user/${userId}`).then(res => {
            console.log(res);
        })
    }

    render() {
        const user = this.props.user;

        if (!user) return <Spinner/>
        if (user.role === 'user') {
            return <div>
                You need to be a seller to have your own company
            </div>
        } else {
            this.getMyCompany(user._id)
        }
        return (
            <div>
                my company
            </div>
        )
    }
}

export default connect(null)(MyCompany);