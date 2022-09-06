import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { CartProvider, useCart } from "react-use-cart";
import numberWithCommas from '../../../utils/numberWithCommas';
import OrderService from '../../../services/OrderService'
import OrderDetailsService from '../../../services/OrderDetailService'
import Header from '../frontend/Header'
import Footer from '../frontend/Footer'
const IMG_URL = "http://localhost:8080/files/";
const Orders = () => {

  const [tenkh, setTenkh] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [maorders, setMaOrder] = useState('')
  const history = useHistory();
  const { id } = useParams();

  const checkout = (e) => {
    e.preventDefault();
    const order = { tenkh, address, email, phone}
    console.log("checks",order)
    OrderService.createOrder(order).then((response) => {
      localStorage.setItem("maid",response.data.id)
      console.log(response.data)
      history.push('/');
    }).catch(error => {
      console.log(error)
    })
    postOrderdetails(order.id)
    //console.log("ádasd", order.id)
  }

  useEffect(() => {
    OrderService.getOrderById(id).then((response) => {
      setTenkh(response.data.tenkh)
      setAddress(response.data.address)
      setEmail(response.data.email)
      setPhone(response.data.phone)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  let cart=[]
  

   const postOrderdetails = async (Orderid) => {
    
    let storage = localStorage.getItem("cart")
    let storages = localStorage.getItem("react-use-cart")
    if(storage, storages){
      cart = JSON.parse(storage, storages)
    }
    
    let orderDetails = []
    for (let index = 0; index < cart.length; index++){
      const item = cart[index];
      let orderDetail = {
        maorder: localStorage.getItem("maid"),
        ten: item.productname,
        dongia: item.discount,
        soluong: item.quantity,
        image: item.avatar,
        thanhtien: item.discount * item.quantity,
      }
      //localStorage.removeItem("maid")
      orderDetails.push(orderDetail)
    }
    let promises = orderDetails.map(item =>{
      return pOrderdetail(item)
    })
    await Promise.all(promises)
    localStorage.removeItem("cart")
   
    localStorage.removeItem("react-use-cart")
    cart = []
   }

   const pOrderdetail = async (orderDetail) => {
    OrderDetailsService.createOrderDetail(orderDetail).then((response) => {
      console.log(response.data)
      history.push('/');
    }).catch(error => {
      console.log(error)
    })
  }
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  console.log(items)
  const sum = (price, discount, quantity) => {
    return (discount) * quantity
  }
  const total = () => {
    var result = 0
    var arrayLength = items.length
    const quantity = document.getElementsByClassName('quantity')
    // const getQuantity = quantity.innerText
    for (var i = 0; i < arrayLength; i++) {
      result = result + ((items[i].discount) * items[i].quantity)
    }
    return result
  }

  return (
    <div>
      <Header />

      
        <div className="card" style={{ width: '500px', marginLeft: '50px', float: 'left', marginTop: '50px'}}>
          <h2 className="title-page" style={{ textAlign: 'center' }}>Thanh Toán</h2>

          <form>
            <div className="form-group mb-2">
              <label className="form-label"> Tên :</label>
              <input
                type="text"
                placeholder="Nhập tên"
                name="tenkh"
                className="form-control"
                value={tenkh}
                onChange={(e) => setTenkh(e.target.value)}
              >
              </input>
            </div>

            <div className="form-group mb-2">
              <label className="form-label">Địa chỉ :</label>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                name="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              >
              </input>
            </div>

            <div className="form-group mb-2">
              <label className="form-label"> Email:</label>
              <input
                type="email"
                placeholder="Nhập email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
              </input>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Điện thoại :</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              >
              </input>
            </div>
            <button className="btn btn-success" onClick={(e) => checkout(e)} >Thanh toán </button>
            <Link to="/succcess" className="btn btn-danger"> Cancel </Link>
          </form>
       
        </div>
        <div className="card " style={{ width: '900px', marginLeft: '600px'}}>
          <div class="infoCart">
            <table class="cartList">
              <tr>
                <th>STT</th><th>Hình ảnh</th><th>Sản phẩm</th><th>Số lượng</th><th>Đơn giá</th>
              </tr>
              {items.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td><div className="aside"><img src={IMG_URL + item.avatar} width={50} /></div></td>
                  <td>{item.productname}</td>
                  <td>{item.quantity}</td>
                  <td>{numberWithCommas(item.price) + " đ"}</td>
                </tr>
              ))}
              <tr><td colspan="4">Tổng Cộng</td><td>{numberWithCommas(total() - total() * 0.2 / 100 + ' đ')}</td></tr>
            </table>
          </div>


       
        </div>
      <Footer />
    </div>
  )
}

export default Orders
