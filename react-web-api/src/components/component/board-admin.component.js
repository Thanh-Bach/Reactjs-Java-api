import React, { Component } from "react";

import UserService from "../../services/test.service";
import EventBus from "../../common/EventBus";
import Main from "../../components/pages/backend/Main";

export default class BoardAdmin extends Component {
  

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
     <>
     <Main/>
     </>
    );
  }
}
