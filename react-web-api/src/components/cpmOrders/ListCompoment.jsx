import React, { Component } from "react";
import OrderService from "../../services/OrderService";
class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
    };
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  deleteCategory(id) {
    OrderService.deleteOrder(id).then((res) => {
      this.setState({
        Orders: this.state.Orders.filter((ord) => ord.id !== id),
      });
    });
  }

  editCategory(id) {
    this.props.history.push(`/admin/update-ord/${id}`);
  }

  componentDidMount() {
    OrderService.getOrder().then((res) => {
      this.setState({ Orders: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Danh Sách Đơn Hàng</h2>
        <div className="row">
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> STT </th>
                <th> Tên </th>
                <th> Địa chỉ </th>
                <th> Email </th>
                <th> Điện thoại </th>
                <th> Chức năng </th>
              </tr>
            </thead>
            <tbody>
              {this.state.Orders.map((ord, index) => (
                <tr key={ord.id}>
                   <td> {index + 1}</td>
                  <td> {ord.tenkh}</td>
                  <td> {ord.address}</td>
                  <td> {ord.email}</td>
                  <td> {ord.phone}</td>


                  <td>
                    
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteCategory(ord.id)}
                      className="btn btn-danger"
                    >
                      Xóa{" "}
                    </button>
                  </td>
                  <td> <a href={`/admin/orderdetail/${ord.id}`}>Xem chi tiết</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListCategory;
