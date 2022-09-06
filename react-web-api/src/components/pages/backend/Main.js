import React, { Component } from 'react'

import ListOrder from "../../cpmOrders/ListCompoment";
import ListOrderDetail from "../../cpmOrders/ListOrderDetail";

import ListCategory from "../../cpmCategory/ListCategory";
import CreateCategory from "../../cpmCategory/CreateCategory";
import UpdateCategory from "../../cpmCategory/UpdateCategory";

import CreateBrand from "../../cpmBrand/CreateBrand";
import ListBrand from "../../cpmBrand/ListBrand";
import UpdateBrand from "../../cpmBrand/UpdateBrand";

import ListProducts from "../../cpmProduct/ListProductComponent";
import CreateProduct from "../../cpmProduct/CreateProductComponent";
import UpdateProduct from "../../cpmProduct/UpdateProductCompoment";

import UpdateUserComponent from "../../cpmUsers/UpdateUserComponent";
import ListUserComponent from "../../cpmUsers/ListUserComponent";
import CreateUserComponent from "../../cpmUsers/CreateUserComponent";
import ViewUserComponent from "../../cpmUsers/ViewUserComponent";

import Dashboard from "./dashboard";
import { Switch, Route } from "react-router-dom";
class HomeAdmin extends React.Component {

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
        <link rel="stylesheet" href="/admin/plugins/fontawesome-free/css/all.min.css" />
        <link rel="stylesheet" href="/admin/plugins/overlayScrollbars/css/OverlayScrollbars.min.css" />
        <link rel="stylesheet" href="/admin/dist/css/adminlte.min.css" />



        <div className="wrapper">
          {/* Preloader */}
          {/* <div className="preloader flex-column justify-content-center align-items-center">
            <img className="animation__wobble" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
          </div> */}
          {/* Navbar */}
          <nav className="main-header navbar navbar-expand navbar-dark">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="index3.html" className="nav-link">Trang chủ</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">Liên hệ</a>
              </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
              {/* Navbar Search */}
              <li className="nav-item">
                <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                  <i className="fas fa-search" />
                </a>
                <div className="navbar-search-block">
                  <form className="form-inline">
                    <div className="input-group input-group-sm">
                      <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                      <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                          <i className="fas fa-search" />
                        </button>
                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              {/* Messages Dropdown Menu */}
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-comments" />
                  <span className="badge badge-danger navbar-badge">3</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <a href="#" className="dropdown-item">
                    {/* Message Start */}
                    <div className="media">
                      <img src="/admin/dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          Brad Diesel
                          <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                        </h3>
                        <p className="text-sm">Call me whenever you can...</p>
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                      </div>
                    </div>
                    {/* Message End */}
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    {/* Message Start */}
                    <div className="media">
                      <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          John Pierce
                          <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                        </h3>
                        <p className="text-sm">I got your message bro</p>
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                      </div>
                    </div>
                    {/* Message End */}
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    {/* Message Start */}
                    <div className="media">
                      <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          Nora Silvester
                          <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                        </h3>
                        <p className="text-sm">The subject goes here</p>
                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                      </div>
                    </div>
                    {/* Message End */}
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                </div>
              </li>
              {/* Notifications Dropdown Menu */}
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                  <i className="far fa-bell" />
                  <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-item dropdown-header">15 Notifications</span>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2" /> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-users mr-2" /> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item">
                    <i className="fas fa-file mr-2" /> 3 new reports
                    <span className="float-right text-muted text-sm">2 days</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                  <i className="fas fa-expand-arrows-alt" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                  <i className="fas fa-th-large" />
                </a>
              </li>
            </ul>
          </nav>
          {/* /.navbar */}
          {/* Main Sidebar Container */}
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
              <img src="/admin/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
              <span className="brand-text font-weight-light">Trang Quản Trị</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
              {/* Sidebar user panel (optional) */}
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                  <img src="/admin/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                  <a href="#" className="d-block">Bạch Văn Thành</a>
                </div>
              </div>
              {/* SidebarSearch Form */}
              <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                  <input className="form-control form-control-sidebar" type="search" placeholder="Tìm kiếm" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-sidebar">
                      <i className="fas fa-search fa-fw" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Sidebar Menu */}
              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}

                  <li className="nav-item">
                    <a href="http://localhost:8081/admin/products" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Quản Lí Sản Phẩm

                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="http://localhost:8081/admin/brand" className="nav-link">
                      <i className="nav-icon fas fa-copy" />
                      <p>
                        Quản Lí Thương Hiệu

                      </p>
                    </a>

                  </li>
                  <li className="nav-item">
                    <a href="http://localhost:8081/admin/category" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie" />
                      <p>
                        Quản Lí Danh Mục
                      </p>
                    </a>

                  </li>
                  <li className="nav-item">
                    <a href="http://localhost:8081/admin/users" className="nav-link">
                      <i className="nav-icon fas fa-tree" />
                      <p>
                        Quản Lí Thành Viên

                      </p>
                    </a>

                  </li>
                  <li className="nav-item">
                    <a href="http://localhost:8081/admin/order" className="nav-link">
                      <i className="nav-icon fas fa-tree" />
                      <p>
                        Quản Lí Đơn Hàng

                      </p>
                    </a>

                  </li>
                </ul>
              </nav>
              {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
          </aside>
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">

            {/* Main content */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <Switch>
                          <Route path="/admin/order" component={ListOrder} />
                          <Route path="/admin/orderdetail/:maorder" component={ListOrderDetail} />

                          <Route path="/admin/products" component={ListProducts} />
                          <Route path="/admin/add-prd/:id" component={CreateProduct} />
                          <Route path="/admin/update-prd/:id" component={UpdateProduct} />

                          <Route path="/admin/brand" component={ListBrand} />
                          <Route path="/admin/add-brd/:id" component={CreateBrand} />
                          <Route path="/admin/update-brd/:id" component={UpdateBrand} />

                          <Route path="/admin/category" component={ListCategory} />
                          <Route path="/admin/add-cat/:id" component={CreateCategory} />
                          <Route path="/admin/update-cat/:id" component={UpdateCategory}></Route>

                          <Route path="/admin/users" component={ListUserComponent} />
                          <Route path="/admin/add-user/:id" component={CreateUserComponent} />
                          <Route path="/admin/view-user/:id" component={ViewUserComponent}></Route>
                          <Route path="/admin/update-user/:id" component={UpdateUserComponent}></Route>


                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
          </div>
          {/* /.content-wrapper */}
          {/* Control Sidebar */}
          <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
          </aside>
          {/* /.control-sidebar */}
          {/* Main Footer */}
          <footer className="main-footer">
            <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
              <b>Version</b> 3.1.0
            </div>
          </footer>
        </div>

      </>
    );
  }
}
export default HomeAdmin