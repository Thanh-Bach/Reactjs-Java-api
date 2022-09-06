import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";
import Header from "../../components/pages/frontend/Header";
import Footer from "../../components/pages/frontend/Footer";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Trường này là bắt buộc!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Emai không hợp lệ.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Tên người dùng phải có từ 3 đến 20 ký tự.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Mật khẩu phải có từ 6 đến 40 ký tự.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <>
      <Header/>
       {/* ========================= SECTION CONTENT ========================= */}
       <section className="section-content padding-y">
        {/* ============================ COMPONENT REGISTER   ================================= */}
        <div className="card mx-auto" style={{maxWidth: '520px', marginTop: '40px'}}>
          <article className="card-body">
            <header className="mb-4"><h4 className="card-title">Đăng Kí</h4></header>
            <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
            <div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Tên</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div> {/* form-group end.// */}
                
              </div> {/* form-row end.// */}
              <div className="form-group">
                <label>Email</label>
                <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                <small className="form-text text-muted">Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất kỳ ai khác.</small>
              </div> {/* form-group end.// */}
              <div className="form-group">
                <label className="custom-control custom-radio custom-control-inline">
                  <input className="custom-control-input" defaultChecked type="radio" name="gender" defaultValue="option1" />
                  <span className="custom-control-label"> Nam </span>
                </label>
                <label className="custom-control custom-radio custom-control-inline">
                  <input className="custom-control-input" type="radio" name="gender" defaultValue="option2" />
                  <span className="custom-control-label"> Nữ </span>
                </label>
              </div> {/* form-group end.// */}
            
              <div className="form-group">
                
                  <label>Tạo mật khẩu</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
              </div>
              <div className="form-group">
                  <button className="btn btn-primary btn-block">Đăng kí</button>
                </div>   
              <div className="form-group"> 
                <label className="custom-control custom-checkbox"> <input type="checkbox" className="custom-control-input" defaultChecked /> <div className="custom-control-label"> Tôi đồng ý với các <a href="#">điều kiện và điều khoản </a></div> </label>
              </div> {/* form-group end.// */}           
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
          </article>{/* card-body.// */}
        </div> {/* card .// */}
        <p className="text-center mt-4">Có tài khoản không? <a href="/login">Đăng nhập</a></p>
        <br /><br />
        {/* ============================ COMPONENT REGISTER  END.// ================================= */}
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}
      <Footer/>
      </>
    );
  }
}
