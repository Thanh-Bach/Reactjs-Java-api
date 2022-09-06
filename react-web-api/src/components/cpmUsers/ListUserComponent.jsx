import React, { Component } from "react";
import userservice from "../../services/user.service";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      user_roles: [],
    };
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(id) {
    userservice.deleteUser(id).then((res) => {
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    });
    alert("Xoa thanh cong");
  }
  viewUser(id) {
    this.props.history.push(`/admin/view-user/${id}`);
  }
  editUser(id) {
    this.props.history.push(`/admin/add-user/${id}`);
  }

  componentDidMount() {
    userservice.getUser().then((res) => {
      this.setState({ users: res.data });
    });
  }

  addUser() {
    this.props.history.push("/admin/add-user/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Danh Sách Người Dùng</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addUser}>
            {" "}
            Thêm
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Tên tài khoản </th>
                <th> Mật khẩu </th>
                <th> Email</th>
                <th> Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td> {user.username} </td>
                  <td> {user.password}</td>
                  <td> {user.email}</td>
                  <td>
                    <button
                      onClick={() => this.editUser(user.id)}
                      className="btn btn-info"
                    >
                      Chỉnh sửa{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteUser(user.id)}
                      
                      className="btn btn-danger"
                    >
                      Xóa{" "}
                    </button>
                   
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewUser(user.id)}
                      className="btn btn-info"
                    >
                      Thông tin{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListUserComponent;