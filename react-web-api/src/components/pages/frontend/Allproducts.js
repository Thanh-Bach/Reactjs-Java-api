import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CartProvider, useCart } from "react-use-cart";
import numberWithCommas from '../../../utils/numberWithCommas'
import Header from "./Header"
import Footer from "./Footer"
const IMG_URL = "http://localhost:8080/files/";
const Allproducts = () => {

    const CategoryApi = 'http://localhost:8080/api/prd/products'
    const [category, setCategory] = useState([])
    const { addItem } = useCart();
    useEffect(() => {
        fetch(CategoryApi)
            .then(res => res.json())
            .then(categories => {
                setCategory(categories)
            })
            .catch(err => {
                console.log(err)
              })
    }, [])
    console.log(category)
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
            <section className="section-content">
                    <div className="container">
                    {/* ============================  FILTER TOP  ================================= */}
                    <div className="mb-3">
                        <div className="card-body">
                    
                        <hr />
                        <div className="row">
                            <div className="col-md-2">Lọc theo</div> {/* col.// */}
                            <div className="col-md-10"> 
                            <ul className="list-inline">
                                <li className="list-inline-item mr-3 dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">   Loại nhà cung cấp </a>
                                <div className="dropdown-menu p-3" style={{maxWidth: '400px'}}>	
                                    <label className="form-check">
                                    <input type="radio" name="myfilter" className="form-check-input" /> Good supplier
                                    </label>
                                    <label className="form-check">	
                                    <input type="radio" name="myfilter" className="form-check-input" /> Best supplier
                                    </label>
                                    <label className="form-check">
                                    <input type="radio" name="myfilter" className="form-check-input" /> New supplier
                                    </label>
                                </div> {/* dropdown-menu.// */}
                                </li>
                                <li className="list-inline-item mr-3 dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">  Quốc gia </a>
                                <div className="dropdown-menu p-3">	
                                    <label className="form-check"> 	 <input type="checkbox" className="form-check-input" /> China  </label>
                                    <label className="form-check">   	 <input type="checkbox" className="form-check-input" /> Japan    </label>
                                    <label className="form-check">    <input type="checkbox" className="form-check-input" /> Uzbekistan</label>
                                    <label className="form-check">  <input type="checkbox" className="form-check-input" /> Russia   </label>
                                </div> {/* dropdown-menu.// */}
                                </li>
                                <li className="list-inline-item mr-3 dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Tính năng</a>
                                <div className="dropdown-menu">
                                    <a href className="dropdown-item">Anti backterial</a>
                                    <a href className="dropdown-item">With buttons</a>
                                    <a href className="dropdown-item">Extra safety</a>
                                </div>
                                </li>
                                <li className="list-inline-item mr-3"><a href="#">Màu</a></li>
                                <li className="list-inline-item mr-3"><a href="#">Kích thước</a></li>
                                <li className="list-inline-item mr-3">
                                <div className="form-inline">
                                    <label className="mr-2">Giá</label>
                                    <input className="form-control form-control-sm" placeholder="Thấp" type="number" />
                                    <span className="px-2"> - </span>
                                    <input className="form-control form-control-sm" placeholder="Cao" type="number" />
                                    <button type="submit" className="btn btn-sm btn-light ml-2">Ok</button>
                                </div>
                                </li>
                                <li className="list-inline-item mr-3">
                                <label className="custom-control mt-1 custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <div className="custom-control-label">Sẵn sàng vận chuyển
                                    </div>
                                </label>
                                </li>
                            </ul>
                            </div> {/* col.// */}
                        </div> {/* row.// */}
                        </div> {/* card-body .// */}
                    </div> {/* card.// */}
                    {/* ============================ FILTER TOP END.// ================================= */}
                    <header className="mb-3">
                        <div className="form-inline">
                       
                        <select className="mr-2 form-control">
                            <option>Các mặt hàng mới nhất</option>
                            <option>Xu hướng</option>
                            <option>Phổ biến nhất</option>
                            <option>Rẻ nhất</option>
                        </select>
                        <div className="btn-group">
                            <a href="page-listing-grid.html" className="btn btn-light active" data-toggle="tooltip" title="List view"> 
                            <i className="fa fa-bars" /></a>
                            <a href="page-listing-large.html" className="btn btn-light" data-toggle="tooltip" title="Grid view"> 
                            <i className="fa fa-th" /></a>
                        </div>
                        </div>
                    </header>{/* sect-heading */}
                    <div className="row">
                    {
                                category.map((item, index) => (
                        <div className="col-md-3">
                        <figure className="card card-product-grid">
                            <div className="img-wrap"> 
                            <span className="badge badge-danger"> NEW </span>
                           < img
                            src={IMG_URL + item.avatar}
                            alt=""
                            />{" "}
                            </div> {/* img-wrap.// */}
                            <figcaption className="info-wrap">
                            <a href={`/prddetail/${item.id}`} className="title mb-2">{item.productname}</a>
                            <div className="price-wrap">
                                <span className="price" style={{color: 'red' }}>{numberWithCommas(item.discount)} <small className="text-muted">/VNĐ</small></span> 
                               
                            </div> {/* price-wrap.// */}
                            <p style={{fontSize: '13px',textDecoration: 'line-through' }}> {numberWithCommas(item.price)}  <small className="text-muted">VNĐ</small></p>
                            <hr />
                            <p className="mb-3">
                                <span className="tag"> <i className="fa fa-check" /> Verified</span> 
                                <span className="tag"> 2 Years </span> 
                                <span className="tag"> 23 reviews </span>
                                <span className="tag"> Japan </span>
                            </p>
                            <a onClick={() => addItem(item)} className="btn btn-outline-primary"> <i className="fa fa-shopping-cart" /> Thêm vào giỏ hàng </a>	
                            </figcaption>
                        </figure>
                        </div> 
                         ))
                        }
                    </div> {/* row end.// */}
                    <nav className="mb-4" aria-label="Page navigation sample">
                        <ul className="pagination">
                        <li className="page-item disabled"><a className="page-link" href="#">Trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">Sau</a></li>
                        </ul>
                    </nav>
                    </div> {/* container .//  */}
                </section>
                <Footer/>
                </>
          );
        }
      
    
      export default Allproducts;