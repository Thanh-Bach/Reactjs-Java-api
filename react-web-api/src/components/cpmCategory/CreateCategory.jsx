import React, { Component } from "react";
import CategoryServices from "../../services/category.service.js";
import UploadFilesService from "../../services/upload-files.service.js";
class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      // step 2
      id: this.props.match.params.id,
      categoryname: "",
      categoryimage: "",
      categoryslug: "",
      currentFile: null,
      previewImage: undefined,
      progress: 0,
      message: "",
      imageInfos: [],
    };
    this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
    this.changeCategorySlugHandler = this.changeCategorySlugHandler.bind(this);
    this.changeCategoryImageHandler = this.changeCategoryImageHandler.bind(this);
    this.saveOrUpdateCat = this.saveOrUpdateCat.bind(this);
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
  // step 3
  componentDidMount() {
    // step 4
    UploadFilesService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
    if (this.state.id === "_add") {
      return;
    } else {
      CategoryServices.getCatById(this.state.id).then((res) => {
        let category = res.data;
        this.setState({
          categoryname: category.categoryname,
          categoryslug: category.categoryslug,
          categoryimage: category.categoryimage,
        });
      });
    }
  }
  saveOrUpdateCat = (e) => {
    e.preventDefault();
    let category = {
      categoryname: this.state.categoryname,
      categoryslug: this.state.categoryslug,
      categoryimage: this.state.categoryimage,
    };
    console.log("category => " + JSON.stringify(category));

    // step 5
    if (this.state.id === "_add") {
      CategoryServices.createCat(category).then((res) => {
        this.props.history.push("/admin/category");
      });
    } else {
      CategoryServices.updateCat(category, this.state.id).then((res) => {
        this.props.history.push("/admin/category");
      });
    }
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

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Thêm</h3>;
    } else {
      return <h3 className="text-center">Chỉnh sửa</h3>;
    }
  }
  render() {
    console.log(this.state.fileInfos);
    // let avatar = this.state.currentFile.name;
    console.log("check", this.state.currentFile);
    const { imageInfos, currentFile, message } = this.state;
    console.log(typeof this.state.currentFile);
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
                    <label> Slug: </label>
                    <input
                      placeholder="Category Slug"
                      type="text"
                      name="categoryslug"
                      className="form-control"
                      value={this.state.categoryslug}
                      onChange={this.changeCategorySlugHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Hình: </label>
                    <input
                      placeholder="Category Image"
                      type="file"
                      accept="image/*"
                      name="categoryimage"
                      className="form-control"
                      // value={this.state.categoryimage}
                      onChange={this.changeCategoryImageHandler}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCat}
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

export default CreateCategory;
