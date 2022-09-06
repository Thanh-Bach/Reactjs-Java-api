import React, { Component } from "react";
import PrdServices from "../../services/product.service.js";
import CategoryServices from "../../services/category.service.js";
import BrandServices from "../../services/brand.service.js";
import UploadFilesService from "../../services/upload-files.service.js";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
class CreateProducts extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      // step 2
      id: this.props.match.params.id,
      productname: "",
      avatar: "",
      price: "",
      description: "",
      category: "Đồng Hồ HUBLOT",
      Category: [],
      categoryslug: "",
      brand:"HUBLOT",
      Brand: [],
      discount: "",
      currentFile: null,
      previewImage: undefined,
      progress: 0,
      message: "",

      imageInfos: [],
    };
    this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
    this.changeAvatarHandler = this.changeAvatarHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
    this.changeBrandHandler = this.changeBrandHandler.bind(this);
    this.changeCategorySlugHandler = this.changeCategorySlugHandler.bind(this);
    this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
    this.saveOrUpdatePrd = this.saveOrUpdatePrd.bind(this);
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
    
    if (this.state.Category.length > 0, this.state.Brand.length > 0) {
      if (this.state.id === "_add") {
        return;
      }
       else {
        PrdServices.getPrdById(this.state.id).then((res) => {
          let products = res.data;
          this.setState({
            productname: products.productname,
            avatar: products.avatar,
            price: products.price,
            description: products.description,
            category: products.category,
            categoryslug: products.categoryslug,
            brand: products.brand,
            discount: products.discount,
          });
        });
      }
    } else {
      CategoryServices.getCat().then((respond) => {
        this.setState({ Category: respond.data });
      });
      BrandServices.getBrd().then((res) => {
        this.setState({ Brand: res.data });
      });
    }
  }

  saveOrUpdatePrd = (e) => {
    e.preventDefault();
    let products = {
      productname: this.state.productname,
      avatar: this.state.avatar,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      categoryslug: this.state.categoryslug,
      brand: this.state.brand,
      discount: this.state.discount,
    };
    console.log("products => " + JSON.stringify(products));

    // step 5
    if (this.state.id === "_add") {
      PrdServices.createPrd(products).then((res) => {
        this.props.history.push("/admin/products");
      });
    } else {
      PrdServices.updatePrd(products, this.state.id).then((res) => {
        this.props.history.push("/admin/products");
      });
    }
    ////////////////////////////////////////
    this.upload();
  };

  changeProductNameHandler = (event) => {
    this.setState({ productname: event.target.value });
  };
  changeAvatarHandler = (event) => {
    this.setState({
      avatar: event.target.files[0].name,
    });
    this.selectFile(event);
  };
  changePriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };
  changeDiscountHandler = (event) => {
    this.setState({ discount: event.target.value });
  };
  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };
  changeCategoryHandler = (event) => {
    this.setState({ category: event.target.value });
  };
  changeCategorySlugHandler = (event) => {
    this.setState({ categoryslug: event.target.value });
  };
  changeBrandHandler = (event) => {
    this.setState({ brand: event.target.value });
  };

  cancel() {
    this.props.history.push("/admin/products");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Thêm sản phẩm</h3>;
    } else {
      return <h3 className="text-center">Update Products</h3>;
    }
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
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Tên: </label>
                    <input
                      placeholder="Nhập tên"
                      type="text"
                      name="productname"
                      className="form-control"
                      onChange={this.changeProductNameHandler}
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
                      name="avatar"
                      className="form-control"
                      // value={this.avatar}
                      onChange={this.changeAvatarHandler}
                    />
                  </div>
                  {/* <button
                    className="btn btn-success"
                    disabled={!currentFile}
                    onClick={this.upload}
                  >
                    Upload
                  </button>
                  <div className="alert alert-light" role="alert">
                    {message}
                  </div> */}
                  <div className="form-group">
                    <label> Giá: </label>
                    <input
                      placeholder="Nhập giá sản phẩm"
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={this.changePriceHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Giá giảm: </label>
                    <input
                      placeholder="Nhập giá giảm"
                      type="text"
                      name="discount"
                      className="form-control"
                      onChange={this.changeDiscountHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Thương hiệu: </label>
                    <select
                      className="form-control"
                      //value={this.state.category}
                      onChange={this.changeBrandHandler}
                    >
                      {this.state.Brand.map((brd, index) => (
                        <option key={brd.id}>
                          {brd.brandname}
                        </option>
                      ))}
                    </select>
                    {/* <input
                      placeholder="Brand"
                      type="text"
                      name="brand"
                      className="form-control"
                      onChange={this.changeBrandHandler}
                    /> */}
                  </div>
                  <div className="form-group">
                    <label> Danh mục: </label>
                    <select
                      className="form-control"
                      //value={this.state.category}
                      onChange={this.changeCategoryHandler}
                    >
                      {this.state.Category.map((cat, index) => (
                        <option key={cat.id}>
                          {cat.categoryname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label> cat slug: </label>
                    <input
                      placeholder="slug"
                      type="text"
                      name="categoryslug"
                      className="form-control"
                      onChange={this.changeCategorySlugHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Chi tiết: </label>
                    <input
                      placeholder="Nhập chi tiết"
                      type="text"
                      name="description"
                      className="form-control"
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdatePrd}
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

export default CreateProducts;