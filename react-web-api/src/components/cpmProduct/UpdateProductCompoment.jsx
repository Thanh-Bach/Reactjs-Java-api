import React, { Component } from "react";
import PrdServices from "../../services/product.service";
import CategoryServices from "../../services/category.service";
import BrandServices from "../../services/brand.service";
import UploadFilesService from "../../services/upload-files.service.js";
class UpdateProducts extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      id: this.props.match.params.id,
      productname: "",
      avatar: "",
      price: "",
      discount: "",
      category: "Đồng Hồ HUBLOT",
      Category: [],
      brand: "HUBLOT",
      Brand: [],
      categoryslug: "",
      description: "",
      currentFile: null,
      previewImage: undefined,
      progress: 0,
      message: "",
      imageInfos: [],
    };
    this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
    this.changeAvatarHandler = this.changeAvatarHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
    this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
    this.changeBrandHandler = this.changeBrandHandler.bind(this);
    this.changeCategorySlugHandler = this.changeCategorySlugHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.editPrd = this.editPrd.bind(this);
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
    PrdServices.getPrdById(this.state.id).then((res) => {
      let products = res.data;
      this.setState({
        productname: products.productname,
          avatar: products.avatar,
          price: products.price,
          discount: products.discount,
          category: products.category,
          brand: products.brand,
          categoryslug: products.categoryslug,
          description: products.description,
          
          
      });
      console.log("etsss",  products);
      CategoryServices.getCat().then((respond) => {
        this.setState({ Category: respond.data });
      });
      BrandServices.getBrd().then((res) => {
        this.setState({ Brand: res.data });
      });
    });
    
  }

  editPrd = (e) => {
    e.preventDefault();
    let products = {
      productname: this.state.productname,
      avatar: this.state.avatar,
      price: this.state.price,
      discount: this.state.discount,
      category: this.state.category,
      brand: this.state.brand,
      categoryslug: this.state.categoryslug,
      description: this.state.description,
    };
    console.log("products => " + JSON.stringify(products));
    console.log("id => " + JSON.stringify(this.state.id));
    PrdServices.updatePrd(products, this.state.id).then((res) => {
      this.props.history.push("/admin/products");
    });
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
  
  changeCategoryHandler = (event) => {
    this.setState({ category: event.target.value });
  };
  
  changeBrandHandler = (event) => {
    this.setState({ brand: event.target.value });
  };
  changeCategorySlugHandler = (event) => {
    this.setState({ categoryslug: event.target.value });
  };
  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  cancel() {
    this.props.history.push("/admin/products");
  }
  render() {
    console.log(this.state.fileInfos);
    // let avatar = this.state.currentFile.name;
    console.log("check", this.state.currentFile);
    const { imageInfos, currentFile, message } = this.state;
    console.log("demo",  this.state.productname);
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
                      name="productname"
                      className="form-control"
                      value={this.state.productname}
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
                      value={this.state.price}
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
                      value={this.state.discount}
                      onChange={this.changeDiscountHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Thương hiệu: </label>
                    <select
                      className="form-control"
                      value={this.state.brandname}
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
                      value={this.state.category}
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
                      value={this.state.categoryslug}
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
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>
                  

                  <button className="btn btn-success" onClick={this.editPrd}>
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

export default UpdateProducts;