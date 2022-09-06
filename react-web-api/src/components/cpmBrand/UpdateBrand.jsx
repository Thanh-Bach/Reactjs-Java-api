import React, { Component } from "react";
import BrandServices from "../../services/brand.service";
import UploadFilesService from "../../services/upload-files.service.js";

class UpdateBrand extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      id: this.props.match.params.id,
      brandname: "",
      brandimage: "",
      currentFile: null,
      previewImage: undefined,
      progress: 0,
      message: "",
      imageInfos: [],
    };
    this.changeBrandNameHandler = this.changeBrandNameHandler.bind(this);
    this.changeBrandImageHandler = this.changeBrandImageHandler.bind(this);
    this.editBrand = this.editBrand.bind(this);
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
    BrandServices.getBrdById(this.state.id).then((res) => {
      let brand = res.data;
      this.setState({
        brandname: brand.brandname,
        brandimage: brand.brandimage,
      });
    });
  }

  editBrand = (e) => {
    e.preventDefault();
    let brand = {
        brandname: this.state.brandname,
      brandimage: this.state.brandimage,
    };
    console.log("brand => " + JSON.stringify(brand));
    console.log("id => " + JSON.stringify(this.state.id));
    BrandServices.updateBrd(brand, this.state.id).then((res) => {
      this.props.history.push("/admin/brand");
    });
    this.upload();
  };

  changeBrandNameHandler = (event) => {
    this.setState({ brandname: event.target.value });
  };

  changeBrandImageHandler = (event) => {
    this.setState({
     brandimage: event.target.files[0].name,
    });
    this.selectFile(event);
  };

  cancel() {
    this.props.history.push("/admin/brand");
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
              <h3 className="text-center">Chỉnh sửa</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Tên: </label>
                    <input
                      placeholder="Nhập tên"
                      name="brandname"
                      className="form-control"
                      value={this.state.brandname}
                      onChange={this.changeBrandNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Hình: </label>
                    <input
                      placeholder="Brand Image"
                      type="file"
                      accept="image/*"
                      name="brandimage"
                      className="form-control"
                      // value={this.state.categoryimage}
                      onChange={this.changeBrandImageHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.editBrand}>
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

export default UpdateBrand;