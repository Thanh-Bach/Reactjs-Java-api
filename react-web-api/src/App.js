import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { CartProvider } from "react-use-cart";

import Login from "./components/component/login.component";
import Register from "./components/component/register.component";
import Home from "./components/component/home.component";
import PrdDetail from "./components/pages/frontend/PrdDetail";
import ListBrand from "./components/pages/frontend/ListBrand";
import ListCatPrd from "./components/pages/frontend/ListCatProduct";
import Allproducts from "./components/pages/frontend/Allproducts";

//import ListCart from "./components/pages/frontend/orders/listorders";
import ListCart from "./components/pages/frontend/ListCart";
import Order from "./components/pages/frontend/orders";
import test from "./components/pages/frontend/test";
import success from "./components/pages/frontend/success";



import BoardAdmin from "./components/component/board-admin.component";

class App extends Component {
  render() {
    return (
      <div>
        <CartProvider>
        
          <Switch>
            <Route exact path={["/","/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/allproducts" component={Allproducts} />
            <Route exact path="/listbrand" component={ListBrand} />
            <Route exact path="/listcart" component={ListCart} />

            <Route exact path="/test" component={test} />
     
            <Route exact path="/checkout" component={Order} />
            <Route exact path="/success" component={success} />
           
            <Route exact path="/prddetail/:productId"  component={PrdDetail}/>
            <Route exact path="/products/:categoryslug" component={ListCatPrd}/>

            
            <Route path="/admin" component={BoardAdmin} />
            
          </Switch>
        </CartProvider>
      </div>
    );
  }
}

export default App;
