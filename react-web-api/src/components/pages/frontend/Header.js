import React, { Component } from 'react'
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import EventBus from "../../../common/EventBus";
import ItemNumberCart from "./ItemNumberCart";
import BookData from "../../../Data.json";
import SearchBar from "./Search/SearchBar";
import AllPrd from "./AllPrd";
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);

		this.state = {
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		};
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
				showAdminBoard: user.roles.includes("ROLE_ADMIN"),
			});
		}

		EventBus.on("logout", () => {
			this.logOut();
		});
	}

	componentWillUnmount() {
		EventBus.remove("logout");
	}

	logOut() {
		AuthService.logout();
		this.setState({
			showModeratorBoard: false,
			showAdminBoard: false,
			currentUser: undefined,
		});
	}
	render() {
		const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
		return (

			<header className="section-header">
				<section className="header-main border-bottom">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-xl-2 col-lg-3 col-md-12">
							<a href="\">
									<img src="/assets/images/logo.png"  style={{ height: '80px', marginLeft: '45px' }} />
									</a>
							</div>
							
							<SearchBar placeholder="Tìm kiếm" />
							<div className="col-xl-4 col-lg-4 col-md-6">
								<div className="widgets-wrap float-md-right">
									{currentUser ? (

										<div className="widget-header mr-3">
											<a className="widget-view" onClick={this.logOut}>
												<div className="icon-area">
													<i className="fa fa-user" />
												</div>
												<small className="text">  Xin chào {currentUser.username} </small>
											</a>
											<a href="/login" className="widget-view" onClick={this.logOut}>
												<div className="icon-area">
													<i className="fa fa-user" />
												</div>
												<small className="text"> Đăng Xuất </small>
											</a>
										</div>
									) : (
										<div className="widget-header mr-3">

											<Link to={"/login"} className="widget-view">
												<div className="icon-area">
													<i className="fa fa-user" />
												</div>
												<small className="text"> Đăng Nhập </small>
											</Link>

											<Link to={"/register"} className="widget-view">
												<div className="icon-area">
													<i className="fa fa-user" />
												</div>
												<small className="text"> Đăng Kí </small>
											</Link>

										</div>
									)}


									<div className="widget-header mr-3">
										<a href="#" className="widget-view">
											<div className="icon-area">
												<i className="fa fa-comment-dots" />
												<span className="notify">1</span>
											</div>
											<small className="text"> Tin nhắn </small>
										</a>
									</div>
									<div className="widget-header mr-3">
										<a href="#" className="widget-view">
											<div className="icon-area">
												<i className="fa fa-store" />
											</div>
											<small className="text"> Đơn hàng </small>
										</a>
									</div>
									<ItemNumberCart />
								</div>
							</div>
						</div>
					</div>
				</section>
				<nav className="navbar navbar-main navbar-expand-lg border-bottom">
					<div className="container">
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="main_nav" style={{display: 'none'}}>
							<ul className="navbar-nav">
								<li className="nav-item dropdown">
									<a className="nav-link " href="/listbrand"> <i className="fa fa-bars text-muted mr-2" /> Thương hiệu </a>

								</li>
								<li className="nav-item">
									<a className="nav-link" href="/allproducts">Tất cả sản phẩm</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Chính sách giao hàng & Đổi trả</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Khuyến mãi</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Dịch vụ</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Liên hệ</a>
								</li>
							</ul>
							<ul className="navbar-nav ml-md-auto">
								<li className="nav-item">
									<a className="nav-link" href="#">Tải ứng dụng</a>
								</li>
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown">Ngôn ngữ</a>
									<div className="dropdown-menu dropdown-menu-right">
										<a className="dropdown-item" href="#">English</a>
										<a className="dropdown-item" href="#">Russian</a>
										<a className="dropdown-item" href="#">French</a>
										<a className="dropdown-item" href="#">Spanish</a>
										<a className="dropdown-item" href="#">Chinese</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
		)
	}
}
export default Header