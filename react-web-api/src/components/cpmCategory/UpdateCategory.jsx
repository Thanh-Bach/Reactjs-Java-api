import React, { Component } from "react";
import PrdServices from "../../services/product.service";
import CategoryServices from "../../services/category.service";
import BrandServices from "../../services/brand.service";
import UploadFilesService from "../../services/upload-files.service.js";
class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      id: this.props.match.params.id,
      categoryname: "",
      categoryslug: "",
      categoryimage: "",
      currentFile: null,
      previewImage: undefined,
      progress: 0,
      message: "",
      imageInfos: [],
    };
    this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
    this.changeCategoryImageHandler = this.changeCategoryImageHandler.bind(this);
    this.changeCategorySlugHandler = this.changeCategorySlugHandler.bind(this);
    this.editCat = this.editCat.bind(this);
  }
  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: "",
      // avatar: event.target.files[0].name,
    });
  }
  upload() {
    this.setState({
      progress: 0,
    });

    UploadFilesService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadFilesService.getFiles();
      })
      .then((files) => {
        this.setState({
          imageInfos: files.data,
        });
      })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: undefined,
        });
      });
  }
  componentDidMount() {
    UploadFilesService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
    CategoryServices.getCatById(this.state.id).then((res) => {
      let category = res.data;
      this.setState({
        categoryname: category.categoryname,
          categoryslug: category.categoryslug,
          categoryimage: category.categoryimage,
          
      });
    });
    
  }

  editCat = (e) => {
    e.preventDefault();
    let category = {
      categoryname: this.state.categoryname,
      categoryslug: this.state.categoryslug,
      categoryimage: this.state.categoryimage,
    };
    console.log("category => " + JSON.stringify(category));
    console.log("id => " + JSON.stringify(this.state.id));
    CategoryServices.updateCat(category, this.state.id).then((res) => {
      this.props.history.push("/admin/category");
    });
    this.upload();
  };

  changeCategoryNameHandler = (event) => {
    this.setState({ categoryname: event.target.value });
  };
  changeCategorySlugHandler = (event) => {
    this.setState({ categoryslug: event.target.value });
  };
  changeCategoryImageHandler = (event) => {
    this.setState({
      categoryimage: event.target.files[0].name,
    });
    this.selectFile(event);
  };

  cancel() {
    this.props.history.push("/admin/category");
  }
  render() {
    console.log(this.state.fileInfos);
    // let avatar = this.state.currentFile.name;
    console.log("check", this.state.currentFile);
    const { imageInfos, currentFile, message } = this.state;
    console.log("demo", typeof this.state.category);
    console.log(typeof this.state.currentFile);
    console.log("category la gi", this.state.category);
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
                    <label> Tên: </label>
                    <input
                      placeholder="Nhập tên"
                      type="text"
                      name="categoryname"
                      className="form-control"
                      value={this.state.categoryname}
                      onChange={this.changeCategoryNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Cat slug: </label>
                    <input
                      placeholder="Nhập tên"
                      type="text"
                      name="categoryslug"
                      className="form-control"
                      value={this.state.categoryslug}
                      onChange={this.changeCategorySlugHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Hình: </label>
                    {imageInfos &&
                      imageInfos.map((img, index) => (
                        <li className="list-group-item" key={index}>
                          <a href={img.url}>{img.name}</a>
                        </li>
                      ))}
                    <input
                      placeholder="Avatar"
                      type="file"
                      accept="image/*"
                      name="categoryimage"
                      className="form-control"
                      // value={this.avatar}
                      onChange={this.changeCategoryImageHandler}
                    />
                  </div>
                  
                  

                  <button className="btn btn-success" onClick={this.editCat}>
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

export default UpdateCategory;