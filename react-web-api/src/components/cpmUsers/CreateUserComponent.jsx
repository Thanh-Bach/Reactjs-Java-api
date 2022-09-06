import React, { Component } from "react";
import userservice from "../../services/user.service";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      username: "",
      password: "",
      email: "",
      
    };
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changePassWordHandler = this.changePassWordHandler.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    // this.changeRoleHandler = this.changeRoleHandler.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
        userservice.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          username: user.username,
          password: user.password,
          email: user.email,
        //   role:user.role,
        });
      });
    }
  }
  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      role: this.state.role,
    };
    alert("tao thanh cong");
    console.log("user => " + JSON.stringify(user));

    // step 5
    if (this.state.id === "_add") {
        userservice.createUser(user).then((res) => {
        this.props.history.push("/admin/users");
      });
    } else {
        userservice.updateUser(user, this.state.id).then((res) => {
        this.props.history.push("/admin/users");
      });
    }
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
//   changeRoleHandler = (event) => {
//     this.setState({ role: event.target.value });
//   };

  cancel() {
    this.props.history.push("/admin/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Thêm</h3>;
    } else {
      return <h3 className="text-center">Sửa</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
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

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
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

export default CreateUserComponent;
