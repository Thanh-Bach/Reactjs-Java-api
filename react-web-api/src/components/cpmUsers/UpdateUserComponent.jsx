import React, { Component } from "react";
import userservice from "../../services/user.service";

class UpdateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      username: "",
      password: "",
      email: "",
    };
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changePassWordHandler = this.changePassWordHandler.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    userservice.getUserById(this.state.id).then((res) => {
      let user = res.data;
      this.setState({
        username: user.username,
        password: user.password,
        email: user.email,
      });
    });
  }

  updateUser = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    console.log("user => " + JSON.stringify(user));
    console.log("id => " + JSON.stringify(this.state.id));
    userservice.updateUser(user, this.state.id).then((res) => {
      this.props.history.push("/users");
    });
    
  };

  changeUserNameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changePassWordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Chỉnh sửa</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Tên tài khoản: </label>
                    <input
                      placeholder="Nhập tên tài khoản"
                      name="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.changeUserNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Mật khẩu: </label>
                    <input
                      placeholder="Nhập mật khẩu"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePassWordHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email: </label>
                    <input
                      placeholder="Nhập Email"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.updateUser}>
                    Lưu
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Thoát
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUserComponent;