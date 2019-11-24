import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
import { getUserData } from "../store/actions/user";
import Spinner from "../components/Spinner/Spinner";

export default (ComposedClass, reload, prevent) => {
  class Auth extends Component {
    state = {
      loading: true
    };

    async componentDidMount() {
      await this.props.getUserData();
      let user = this.props.user;
      await this.props.getUserData();
     user = this.props.user

      if (!user.isAuth) {
        if (reload) {
          this.props.history.push("/");
        }
      } 

      console.log(user.user)
      

      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return <Spinner />;
      }
      return <ComposedClass {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user,
      auth: state.auth
    };
  };

  return withRouter(connect(mapStateToProps, { getUserData })(Auth));
};
