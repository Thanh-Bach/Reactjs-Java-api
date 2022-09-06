import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserService from "../../services/test.service";
import Header from "../../components/pages/frontend/Header";
import Footer from "../../components/pages/frontend/Footer";
import Content from "../../components/pages/frontend/Main";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <>
       <Header/>

       <Content/>

       <Footer/>
      </>
     
    );
  }
}
