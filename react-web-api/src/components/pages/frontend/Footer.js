import React, { Component } from 'react'


class Footer extends React.Component {
   
    render() {
        return ( 
            <>
<section className="section-subscribe padding-y-lg">
          <div className="container">
            <p className="pb-2 text-center text-white">Cung cấp các xu hướng sản phẩm mới nhất và tin tức ngành công nghiệp trực tiếp đến hộp thư đến của bạn</p>
            <div className="row justify-content-md-center">
              <div className="col-lg-5 col-md-6">
                <form className="form-row">
                  <div className="col-md-8 col-7">
                    <input className="form-control border-0" placeholder="Your Email" type="email" />
                  </div> 
                  <div className="col-md-4 col-5">
                    <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope" /> Đăng kí </button>
                  </div> 
                </form>
                <small className="form-text text-white-50">Chúng tôi sẽ không bao giờ chia sẻ địa chỉ email của bạn với bên thứ ba. </small>
              </div> 
            </div>
          </div>
        </section>
        <footer className="section-footer bg-secondary">
          <div className="container">
            <section className="footer-top padding-y-lg text-white">
              <div className="row">
                <aside className="col-md col-6">
                  <h6 className="title">Thương hiệu</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">GUCCI</a></li>
                    <li> <a href="#">HUBLOT</a></li>
                    <li> <a href="#">HERMER</a></li>
                    <li> <a href="#">VASACE</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Công ty</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">Về chúng tôi</a></li>
                    <li> <a href="#">Nghề nghiệp</a></li>
                    <li> <a href="#">Tìm một cửa hàng</a></li>
                    <li> <a href="#">Quy tắc và điều khoản</a></li>
                    <li> <a href="#">Bản đồ site</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Trợ giúp</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">Liên hệ với chúng tôi</a></li>
                    <li> <a href="#">Hoàn tiền</a></li>
                    <li> <a href="#">Trạng thái đơn hàng</a></li>
                    <li> <a href="#">Thông tin vận chuyển</a></li>
                    <li> <a href="#">Tranh chấp mở</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Account</h6>
                  <ul className="list-unstyled">
                    <li> <a href="#">Đăng nhập người dùng</a></li>
                    <li> <a href="#">Đăng ký người dùng</a></li>
                    <li> <a href="#">Thiết đặt Tài khoản </a></li>
                    <li> <a href="#"> Đơn hàng của tôi </a></li>
                  </ul>
                </aside>
                <aside className="col-md">
                  <h6 className="title">Xã hội</h6>
                  <ul className="list-unstyled">
                    <li><a href="#"> <i className="fab fa-facebook" /> Facebook </a></li>
                    <li><a href="#"> <i className="fab fa-twitter" /> Twitter </a></li>
                    <li><a href="#"> <i className="fab fa-instagram" /> Instagram </a></li>
                    <li><a href="#"> <i className="fab fa-youtube" /> Youtube </a></li>
                  </ul>
                </aside>
              </div>
            </section>	
            <section className="footer-bottom text-center">
              <p className="text-white">Chính sách bảo mật - Điều khoản sử dụng - Hướng dẫn yêu cầu pháp lý thông tin người dùng</p>
              <p className="text-muted"> © 2019 Tên công ty, Tất cả các quyền được bảo lưu</p>
            </section>
          </div>
        </footer>
</>
        )
    }
}
export default Footer