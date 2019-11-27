import React, { Component } from "react";
import axios from "axios";

import Spinner from "../components/Spinner/Spinner";

export default (ComposedClass, reload) => {
  class Auth extends Component {
    state = {
      loading: true
    };

    async componentDidMount() {
      let isAuth = await axios.get("/api/user/auth");

      if (isAuth.data) {
        if (isAuth.data.isAuth === false) {
          if (reload) {
            this.props.history.push("/");
          }
        }
      }

      if (isAuth.data === true) {
        if (reload === false) {
          this.props.history.push("/home");
        }
      }

      this.setState({ loading: false });
    }
    render() {
      if (this.state.loading) {
        return <Spinner />;
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  return Auth;
};
