import React, { Component, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import cartService from "../../../../services/cartService";
import PrdServices from "../../../../services/product.service";
import OrderService from "../../../../services/OrderService";
import OrderDetailService from "../../../../services/OrderDetailService";

class ListOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mod: "",
      ten: "",
      gia: "",
      thanhtien: "",
      dongia: "", //da dung
      soluong: "",
      Products: [],
      Cart: [],
      tong: 0,
    };
    this.delete = this.delete.bind(this);
    this.deleteall = this.deleteall.bind(this);
    this.orders = this.orders.bind(this);
    this.orderdetail = this.orderdetail.bind(this);
  }
  componentDidMount() {
    PrdServices.getPrd().then((respond) => {
      this.setState({ Products: respond.data });
      console.log(this.state.Products);
    });

    cartService.getCart().then((res) => {
      this.setState({ Cart: res.data });
      console.log("componentDidMount" + this.state.Cart);
    });
  }

  componentWillUpdate() {
    cartService.getCart().then((res) => {
      this.setState({ Cart: res.data });
    });
  }

  delete(id) {
    cartService.deleteCart(id).then((res) => {
      this.setState({
        Cart: this.state.Cart.filter((cart) => cart.id !== id),
      });
    });
  }

  deleteall() {
    cartService.deleteAllCart().then((res) => {
      this.setState({ Cart: [] });
    });
  }

  changeUploadSizeHandler = (card, e) => {
    console.log(card);
    console.log(e.target.value);
    this.state.Products.map((product) => {
      if (card.ten === product.productname) {
        console.log("diungs" + product.price);
        this.state.dongia = product.price;
      }
    });



    let cart = {
      ten: card.ten,
      dongia: card.dongia,
      soluong: card.soluong,
    };
    cartService
      .updateCart(cart, card.id)
      .then((res) => {
        console.log("OK");
      })
      .catch((err) => {
        console.log("fail");
      });
  };

  updatesoluongtang(card) {
    console.log(card);
    //code cua bao
    let cart = {
      ten: card.ten,
      dongia: card.dongia,
      soluong: card.soluong + 1,
    };
    cartService
      .updateCart(cart, card.id)
      .then((res) => {
        console.log("OK");
      })
      .catch((err) => {
        console.log("fail");
      });
  }

  updatesoluonggiam(card) {
    let cart = {
      ten: card.ten,
      dongia: card.dongia,
      soluong: card.soluong - 1,
    };

    cartService
      .updateCart(cart, card.id)
      .then((res) => {
        console.log("OK");
      })
      .catch((err) => {
        console.log("fail");
      });
    if (cart.soluong === 0) {
      this.delete(card.id);
    }
  }
  orders() {
    this.state.Cart.map((cart) => {
      this.state.mod = cart.id;
      this.state.tong += cart.soluong * cart.dongia;
    });

    let order = {
      morder: this.state.mod.toString(),
      nv: localStorage.getItem("username"),
      tong: this.state.tong,
    };
    console.log("order", order);
    OrderService.createOrder(order)
      .then((res) => {
        console.log("OK");
      })
      .catch((err) => {
        console.log("fail");
      });
    this.orderdetail();
    alert("Thanh toán thành công");
    this.deleteall();
    this.props.history.push("/");
  }
  orderdetail() {
    this.state.Cart.map((cart) => {
      this.state.ten = cart.id;
      this.state.gia = cart.dongia;
      this.state.soluong = cart.soluong;
      this.state.thanhtien = cart.soluong * cart.dongia;

      let orderdetail = {
        ten: this.state.ten,
        dongia: this.state.gia,
        soluong: this.state.soluong,
        thanhtien: this.state.thanhtien,
        maorder: this.state.mod.toString(),
      };
      console.log("orderdetail", orderdetail);
      OrderDetailService.createOrderDetail(orderdetail)
        .then((res) => {
          console.log("OK");
        })
        .catch((err) => {
          console.log("fail");
        });
    });
  }
  render() {
    this.state.Cart.sort(function (a, b) {
      return a.id - b.id;
    });
    //console.log("check add", this.props.arrAdd);
    // console.log(this.updateCart);
    var totalPrice = 0;
    return (
      <>
        <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>Quantity</th>
                      <th scope="col" width={120}>Price</th>
                      <th scope="col" className="text-right" width={200}> </th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* {this.state.Cart.map((cart, index) => {
                  totalPrice += cart.soluong * cart.dongia;
                  return (
                    
                    <tr key={cart.id}>
                      <td>{index + 1}</td>
                      <td>{cart.tenmon}</td>
                      <td>{cart.dongia}.000</td>
                      
                      <td>
                        <button onClick={(e) => this.updatesoluonggiam(cart)}>
                          -
                        </button>
                        {cart.soluong}
                        <button onClick={(e) => this.updatesoluongtang(cart)}>
                          +
                        </button>
                      </td>
                      <td>{cart.soluong * cart.dongia}.000</td>
                      <td>
                        <textarea />
                      </td>
                      <td>
                        <button
                          style={{ marginLeft: "10px" }}
                          onClick={() => this.delete(cart.id)}
                          className="btn btn-danger"
                        >
                          x
                        </button>
                      </td>
                    </tr>
                    
                  );
                })} */}
                 {this.state.Cart.map((cart, index) => {
                  totalPrice += cart.soluong * cart.dongia;
                  return (
                    <tr key={cart.id}>
                      <td>
                        <figure className="itemside">
                          <div className="aside"><img src="images/items/1.jpg" className="img-sm" /></div>
                          <figcaption className="info">
                            <a href="#" className="title text-dark">{cart.ten}</a>
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        <button onClick={(e) => this.updatesoluonggiam(cart)}>
                          -
                        </button>
                        {cart.soluong}
                        <button onClick={(e) => this.updatesoluongtang(cart)}>
                          +
                        </button>
                      </td>
                      <td> 
                        <div className="price-wrap"> 
                          <var className="price">{cart.dongia}</var> 
                          <small className="text-muted"> $315.20 each </small> 
                        </div> {/* price-wrap .// */}
                      </td>
                      <td>{cart.soluong * cart.dongia}.000</td>
                      <td className="text-right"> 
                        <a data-original-title="Save to Wishlist" title href className="btn btn-light" data-toggle="tooltip"> <i className="fa fa-heart" /></a> 
                        <a  onClick={() => this.delete(cart.id)} className="btn btn-light"> Remove</a>
                      </td>
                    </tr>
                    );
                })}
                  </tbody>
                </table>
                <div className="card-body border-top">
                  <a href="#" className="btn btn-primary float-md-right"> Make Purchase <i className="fa fa-chevron-right" /> </a>
                  <a href="#" className="btn btn-light"> <i className="fa fa-chevron-left" /> Continue shopping </a>
                </div>	
              </div> {/* card.// */}
              <div className="alert alert-success mt-3">
                <p className="icontext"><i className="icon text-success fa fa-truck" /> Free Delivery within 1-2 weeks</p>
              </div>
            </main> {/* col.// */}
            <aside className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Have coupon?</label>
                      <div className="input-group">
                        <input type="text" className="form-control" name placeholder="Coupon code" />
                        <span className="input-group-append"> 
                          <button className="btn btn-primary">Apply</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div> {/* card-body.// */}
              </div>  {/* card .// */}
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">USD 568</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Discount:</dt>
                    <dd className="text-right">USD 658</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right  h5"><strong>$1,650</strong></dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="images/misc/payments.png" height={26} />
                  </p>
                </div> {/* card-body.// */}
              </div>  {/* card .// */}
            </aside> {/* col.// */}
          </div>
        </div> {/* container .//  */}
      </section>
      </>
    );
  }
}
export default withRouter(ListOrder);
