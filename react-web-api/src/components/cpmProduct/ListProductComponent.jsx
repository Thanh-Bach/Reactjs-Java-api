import React, { Component } from "react";
import PrdServices from "../../services/product.service.js";
import CategoryServices from "../../services/category.service.js";
import numberWithCommas from '../../utils/numberWithCommas';
const IMG_URL = "http://localhost:8080/files/";
class ListProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
    this.addPrd = this.addPrd.bind(this);
    this.editPrd = this.editPrd.bind(this);
    this.deletePrd = this.deletePrd.bind(this);
  }

  deletePrd(id) {
    PrdServices.deletePrd(id).then((res) => {
      this.setState({
        products: this.state.products.filter((product) => product.id !== id),
      });
    });
  }
  editPrd(id) {
    this.props.history.push(`/admin/update-prd/${id}`);
  }

  componentDidMount() {
    PrdServices.getPrd().then((res) => {
      this.setState({ products: res.data });
    });
      CategoryServices.getCat().then((respond) => {
        this.setState({ Category: respond.data });
      });
  }

  addPrd() {
    this.props.history.push("/admin/add-prd/_add");
  }

  render() {
    const { products } = this.state
    const { Category } = this.state
    return (
      <div>
        <h2 className="text-center">Danh mục sản phẩm</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addPrd}>
            {" "}
            Thêm sản phẩm
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Tên </th>
                <th> Hình </th>
                <th> Giá </th>
                <th> Giá giảm </th>
                <th> Chi tiết </th>
                <th> Thương hiệu </th>
                <th> Danh mục </th>
                <th> category slug </th>
                <th> Chức năng </th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.products.map((product, index) => (
                <tr key={product.id}>
                  <td> {product.productname}</td>
                  <td>
                    <img
                      className="img"
                      src={IMG_URL + product.avatar}
                      alt=""
                      width=" 70"
                      height="100"
                    />{" "}
                  </td>
                  <td> {numberWithCommas(product.price + ' VNĐ')}</td>
                  <td>  {numberWithCommas(product.discount + ' VNĐ')}</td>
                  <td> {product.description}</td>
                  <td> {product.brand}</td>
                  <td> {product.category}</td>
                  <td> {product.categoryslug}</td>
                  <td>
                    <button
                      onClick={() => this.editPrd(product.id)}
                      className="btn btn-info"
                    >
                      Chỉnh sửa{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deletePrd(product.id)}
                      className="btn btn-danger"
                    >
                      Xóa{" "}
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

export default ListProducts;