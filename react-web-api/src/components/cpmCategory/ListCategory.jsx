import React, { Component } from "react";
import CategoryServices from "../../services/category.service.js";
const IMG_URL = "http://localhost:8080/files/";
class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Category: [],
    };
    this.addCategory = this.addCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  deleteCategory(id) {
    CategoryServices.deleteCat(id).then((res) => {
      this.setState({
        Category: this.state.Category.filter((cat) => cat.id !== id),
      });
    });
  }

  editCategory(id) {
    this.props.history.push(`/admin/update-cat/${id}`);
  }

  componentDidMount() {
    CategoryServices.getCat().then((res) => {
      this.setState({ Category: res.data });
    });
  }

  addCategory() {
    this.props.history.push("/admin/add-cat/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Danh Sách Danh Mục</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addCategory}>
            {" "}
            Thêm danh mục
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Tên </th>
                <th> Slug </th>
                <th> Hình </th>
                <th> Chức năng </th>
              </tr>
            </thead>
            <tbody>
              {this.state.Category.map((cat) => (
                <tr key={cat.id}>
                  <td> {cat.categoryname}</td>
                  <td> {cat.categoryslug}</td>
                  <td>
                    <img
                      className="img"
                      src={IMG_URL + cat.categoryimage}
                      alt=""
                      width=" 200"
                      height="100"
                    />{" "}
                  </td>
                  <td>
                    <button
                      onClick={() => this.editCategory(cat.id)}
                      className="btn btn-info"
                    >
                      Chỉnh sửa{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteCategory(cat.id)}
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

export default ListCategory;
