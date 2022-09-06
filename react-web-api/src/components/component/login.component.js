import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Header from "../../components/pages/frontend/Header";
import Footer from "../../components/pages/frontend/Footer";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <>
      <Header/>
        {/* ========================= SECTION CONTENT ========================= */}
        <section className="section-conten padding-y" style={{minHeight: '84vh'}}>
          {/* ============================ COMPONENT LOGIN   ================================= */}
          <div className="card mx-auto" style={{maxWidth: '380px', marginTop: '100px'}}>
            <div className="card-body">
              <h4 className="card-title mb-4">Đăng Nhập</h4>
              <form>
                <a href="#" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f" /> &nbsp;  Đăng nhập bằng Facebook</a>
                <a href="#" className="btn btn-google btn-block mb-4"> <i className="fab fa-google" /> &nbsp;  Đăng nhập bằng Google</a>
               
               
                
              </form>
              <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <Input
                type="text"
                placeholder="Tên tài khoản"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
                  <a href="#" className="float-right">Quên mật khẩu?</a> 
                  <label className="float-left custom-control custom-checkbox"> <input type="checkbox" className="custom-control-input" defaultChecked /> <div className="custom-control-label"> Nhớ </div> </label>
                </div> {/* form-group form-check .// */}
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Đăng nhập</span>
              </button>
            </div>
                  
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
            </div> {/* card-body.// */}
          </div> {/* card .// */}
          <p className="text-center mt-4">Không có tài khoản? <a href="/register">Đăng kí</a></p>
          <br /><br />
          {/* ============================ COMPONENT LOGIN  END.// ================================= */}
        </section>
        {/* ========================= SECTION CONTENT END// ========================= */}
      <Footer/>
      </>
    );
  }
}
