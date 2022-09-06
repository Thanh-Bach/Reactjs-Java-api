import React, { Component } from "react";
import userservice from "../../services/user.service";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    
    };
  }

  componentDidMount() {
    userservice.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> Chi Tiết Thành Viên</h3>
          <div className="card-body">
            <div className="row">
              <label> Tên tài khoản: </label>
              <div> {this.state.user.username}</div>
            </div>
            <div className="row">
              <label> Mật khẩu: </label>
              <div> {this.state.user.password}</div>
            </div>
            <div className="row">
              <label> Email: </label>
              <div> {this.state.user.email}</div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;