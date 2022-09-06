import React, { useState, useEffect } from 'react'
import { CartProvider, useCart } from "react-use-cart";
import { Link, useParams } from 'react-router-dom'
import numberWithCommas from '../../../utils/numberWithCommas'
import Header from "./Header"
import Footer from "./Footer"

const IMG_URL = "http://localhost:8080/files/";

    const PrdDetail = () => {

        const [prddetails, setPrddetail] = useState([])
        const { productId } = useParams();
        const productApi = `http://localhost:8080/api/prd/productdetail/${productId}`
        const { addItem } = useCart();
    
        useEffect(() => {
            fetch(productApi)
                .then(res => res.json())
                .then(productDetails => {
                    setPrddetail(productDetails)
    
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
    
        console.log(prddetails)
       
        const {
          isEmpty,
          totalUniqueItems,
          items,
          updateItemQuantity,
          removeItem,
      } = useCart();
        
       
        return ( 
            <>
  <Header cart={totalUniqueItems}/>
             {/* ========================= SECTION CONTENT ========================= */}
      <section className="section-content bg-white padding-y">
        <div className="container">
          
          <div className="row">
            <aside className="col-md-6">
              <div className="card">
                <article className="gallery-wrap"> 
                  <div className="img-big-wrap">
                    <div> <a href="#"><img src={IMG_URL + prddetails.avatar} /></a></div>
                  </div> {/* slider-product.// */}
                  <div className="thumbs-wrap">
                    <a href="#" className="item-thumb"> <img src="images/items/15.jpg" /></a>
                    <a href="#" className="item-thumb"> <img src="images/items/15-1.jpg" /></a>
                    <a href="#" className="item-thumb"> <img src="images/items/15-2.jpg" /></a>
                    <a href="#" className="item-thumb"> <img src="images/items/15-1.jpg" /></a>
                  </div> {/* slider-nav.// */}
                </article> {/* gallery-wrap .end// */}
              </div> {/* card.// */}
            </aside>
            <main className="col-md-6">
              <article className="product-info-aside">
                <h2 className="title mt-3">{prddetails.productname}</h2>
                <div className="rating-wrap my-3">
                  <ul className="rating-stars">
                    <li style={{width: '80%'}} className="stars-active"> 
                      <i className="fa fa-star" /> <i className="fa fa-star" /> 
                      <i className="fa fa-star" /> <i className="fa fa-star" /> 
                      <i className="fa fa-star" /> 
                    </li>
                    <li>
                      <i className="fa fa-star" /> <i className="fa fa-star" /> 
                      <i className="fa fa-star" /> <i className="fa fa-star" /> 
                      <i className="fa fa-star" /> 
                    </li>
                  </ul>
                  <small className="label-rating text-muted">132 đánh giá</small>
                  <small className="label-rating text-success"> <i className="fa fa-clipboard-check" /> 154 đặt hàng </small>
                </div> {/* rating-wrap.// */}
                <div className="mb-3"> 
                  <var className="price h4" style={{color: 'red'}}>{numberWithCommas(prddetails.discount + ' VNĐ')}</var> 
                  <span className="text-muted" style={{textDecoration: 'line-through'}}>{numberWithCommas(prddetails.price + ' đ')}</span> 
                </div> {/* price-detail-wrap .// */}
                <p>{prddetails.description}</p>
                <div className="form-row  mt-4">
                  <div className="form-group col-md flex-grow-0">
                    <div className="input-group mb-3 input-spinner">
                      <div className="input-group-prepend">
                        <button className="btn btn-light" type="button" id="button-plus"> + </button>
                      </div>
                      <input type="text" className="form-control" defaultValue={1} />
                      <div className="input-group-append">
                        <button className="btn btn-light" type="button" id="button-minus"> − </button>
                      </div>
                    </div>
                  </div> {/* col.// */}
                  <div className="form-group col-md">
                    <a href="javascript:void(0);" className="btn  btn-primary"  onClick={() => addItem(prddetails)}> 
                      <i className="fas fa-shopping-cart" /> <span className="text">Thêm vào giỏ hàng</span> 
                    </a>
                  
                  </div> {/* col.// */}
                </div> {/* row.// */}
              </article> {/* product-info-aside .// */}
            </main> {/* col.// */}
          </div>
                             
          {/* ================ ITEM DETAIL END .// ================= */}
        </div></section>
      <Footer/>
      </>
      );
    }
  export default PrdDetail