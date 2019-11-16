import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddProduct extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                {/* TODO: ADD PRODUCT FORM */}
            </div>
        )
    }
}

export default connect()(AddProduct);
