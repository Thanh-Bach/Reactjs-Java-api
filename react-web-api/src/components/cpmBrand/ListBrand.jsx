import React, { Component } from "react";
import BrandServices from "../../services/brand.service";
const IMG_URL = "http://localhost:8080/files/";
class ListBrand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Brand: [],
    };
    this.addBrand = this.addBrand.bind(this);
    this.editBrand = this.editBrand.bind(this);
    this.deleteBrand = this.deleteBrand.bind(this);
  }

  deleteBrand(id) {
    BrandServices.deleteBrd(id).then((res) => {
      this.setState({
        Brand: this.state.Brand.filter((brd) => brd.id !== id),
      });
    });
  }

  editBrand(id) {
    this.props.history.push(`/admin/update-brd/${id}`);
  }

  componentDidMount() {
    BrandServices.getBrd().then((res) => {
      this.setState({ Brand: res.data });
    });
  }

  addBrand() {
    this.props.history.push("/admin/add-brd/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Danh Sách Thương Hiệu</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addBrand}>
            {" "}
            Thêm Thương Hiệu
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Tên </th>
                <th> Hình </th>
                <th> Chức năng </th>
              </tr>
            </thead>
            <tbody>
              {this.state.Brand.map((brd) => (
                <tr key={brd.id}>
                  <td> {brd.brandname}</td>
                  
                  <td>
                    <img
                      className="img"
                      src={IMG_URL + brd.brandimage}
                      alt=""
                      width=" 200"
                      height="100"
                    />{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => this.editBrand(brd.id)}
                      className="btn btn-info"
                    >
                      Chỉnh sửa{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteBrand(brd.id)}
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

export default ListBrand;
