import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link } from "react-router-dom";
import { CartProvider, useCart } from "react-use-cart";


const ItemNumberCart = () => {
    const { totalUniqueItems } = useCart()
        return ( 
            <>
            <div className="widget-header">
                    <Link to="/listcart" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-shopping-cart" />
                        <span className="notify" id="cartCounter">{totalUniqueItems}</span>
                      </div>  
                      <small className="text" > Giỏ hàng </small>
                    </Link>
                  </div></>
        )
}
ItemNumberCart.propTypes = {
    cart: PropTypes.number
  }
  export default ItemNumberCart
  