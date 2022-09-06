import React, { useState, useEffect } from 'react'
import { CartProvider, useCart } from "react-use-cart";
import PropTypes from 'prop-types'
import Header from './Header'
import numberWithCommas from '../../../utils/numberWithCommas';
import Footer from './Footer';
const IMG_URL = "http://localhost:8080/files/";

const CartContainer = (props) => {

    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();
  
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);
    const sum = (price, discount, quantity) => {
      return (discount) * quantity
    }

    const Empty = (isEmpty) => {
      if (isEmpty) {
        return <p style={{textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold'}}>Chưa có sản phẩm trong giỏ</p>
      }
    }

    console.log(items)
    const total = () => {
      var result = 0
      var arrayLength = items.length
      const quantity = document.getElementsByClassName('quantity')
      // const getQuantity = quantity.innerText
      for (var i = 0; i < arrayLength; i++) {
        result = result + ((items[i].discount)  * items[i].quantity) 
      }
      return result
    }
    const quantity = document.querySelector('quantity')
    // const getQuantity = quantity.innerText
    console.log(quantity)
  
    return(
        <div>
            <div>
            <Header cart={totalUniqueItems}/>
            {/* ========================= SECTION CONTENT ========================= */}
            <section className="section-content padding-y">
              <div className="container">
                <div className="row">
                  <main className="col-md-9">
                    <div className="card">
                      <table className="table table-borderless table-shopping-cart">
                        <thead className="text-muted">
                          <tr className="small text-uppercase">
                            <th scope="col">Sản phẩm</th>
                            <th scope="col" width={120}>Số lượng</th>
                            <th scope="col" width={120}>Giá</th>
                            <th scope="col" className="text-right" width={200}> </th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          {
                            Empty(isEmpty)
                          }
                       {items.map(item => (
                         
                          <tr>
                          <td>
                              <figure className="itemside">
                                  <div className="aside"><img src={IMG_URL + item.avatar} width={50} /></div>
                                  <figcaption className="info">
                                      <a href="#" className="title text-dark">{item.productname}</a>
                                      
                                  </figcaption>
                              </figure>
                          </td>
                          <td className='center-on-small-only'>

                              
                              <label className='btn btn-sm btn-primary btn-rounded waves-effect waves-light'
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              >
                                  <a>-</a>
                              </label>
                              
              
                              <span className='quantity' style={{  fontWeight: 'bold' }}>{item.quantity }</span>

                              
                              <label className='btn btn-sm btn-primary btn-rounded waves-effect waves-light'
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              >
                                  <a>+</a>
                              </label>
                              
                              {/* <select className="form-control">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                              </select> */}
                          </td>
                          <td >
                              <div className="price-wrap" style={{width: '150px'}}>
                                  <var className="price">{numberWithCommas(sum(item.price, item.discount, item.quantity)) + ' đ'}</var>
                                  <small className="text-muted" style={{textDecoration: 'line-through'}}>{numberWithCommas(item.price) + ' đ'}</small>
                              </div> {/* price-wrap .// */}
                          </td>
                          <td className="text-right" >
                          
                              <a data-original-title="Save to Wishlist" title href className="btn btn-light" data-toggle="tooltip"> <i className="fa fa-heart" /></a>
                              <a href className="btn btn-light btn-round" onClick={() => removeItem(item.id)}> Xóa</a>
                          
                          </td>
                      </tr>
                       ))}


                        </tbody>
                      </table>
                      <div className="card-body border-top">
                        <a href="/checkout" className="btn btn-primary float-md-right"> Mua hàng <i className="fa fa-chevron-right" /> </a>
                        <a href="http://localhost:3000/" className="btn btn-light"> <i className="fa fa-chevron-left" /> Tiếp tục lựa sản phẩm </a>
                      </div>	
                    </div> {/* card.// */}
                    <div className="alert alert-success mt-3">
                      <p className="icontext"><i className="icon text-success fa fa-truck" /> Miễn phí vận chuyển từ 3 - 7 ngày</p>
                    </div>
                  </main> {/* col.// */}
                  <aside className="col-md-3">
                    <div className="card mb-3">
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label>Bạn có phiếu giảm giá không?</label>
                            <div className="input-group">
                              <input type="text" className="form-control" name placeholder="Mã giảm giá" />
                              <span className="input-group-append"> 
                                <button className="btn btn-primary">Xác nhận</button>
                              </span>
                            </div>
                          </div>
                        </form>
                      </div> {/* card-body.// */}
                    </div>  {/* card .// */}
                    <div className="card">
                      <div className="card-body">
                        <dl className="dlist-align">
                          <dt>Tổng đơn hàng:</dt>
                          <dd className="text-right">{numberWithCommas(total())+ ' đ'}</dd>
                        </dl>
                        <dl className="dlist-align">
                          <dt>Khuyến mãi:</dt>
                          <dd className="text-right">{numberWithCommas(total() * 0.2 /100)+ ' đ'}</dd>
                        </dl>
                        <dl className="dlist-align">
                          <dt>Tổng:</dt>
                          <dd className="text-right  h6"><strong>{numberWithCommas(total() - total() * 0.2 /100 + ' đ') }</strong></dd>
                        </dl>
                        <hr />
                        <p className="text-center mb-3">
                          <img src="/assets/images/misc/payments.png" height={26} />
                        </p>
                      </div> {/* card-body.// */}
                    </div>  {/* card .// */}
                  </aside> {/* col.// */}
                </div>
              </div> {/* container .//  */}
            </section>
            {/* ========================= SECTION CONTENT END// ========================= */}
            {/* ========================= SECTION  ========================= */}
            {/* <section className="section-name border-top padding-y">
              <div className="container">
                <h6>Payment and refund policy</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </section> */}
            {/* ========================= SECTION  END// ========================= */}
            {/* ========================= FOOTER ========================= */}
            <Footer />
            {/* ========================= FOOTER END // ========================= */}
          </div>

        </div>
    )
}



export default CartContainer