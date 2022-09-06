import React, { Component } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import CategoryServices from "../../../services/category.service.js"
const IMG_URL = "http://localhost:8080/files/";
class ListBrand extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            category:[]
        }
    }
        componentDidMount(){
          CategoryServices.getCat().then((Response)=>{
                this.setState({category:Response.data});
            })
        }
    render() {
        return ( 
            <>
  <Header/>
        <section className="section-content padding-y">
        <div className="container">
          <nav className="row">
          {
            this.state.category.map(
                category => 
            <div className="col-md-3" >
          
              <div className="card " style={{height: '300px'}}>                      
                <tr key = {category.id}>                                              
                    <div  style={{background: '#ffd7d7', height:'160px', width: '290px'}}>
                    <img
                      src={IMG_URL + category.categoryimage}
                      alt=""
                      width={300}
                    />{" "}
                    </div>
                    <div className="card-body">
                    <h4 className="card-title" style={{fontSize: '20px'}}><a href={`/products/${category.categoryslug}`}>{ category.categoryname}</a></h4>    
                    </div>
                </tr>

              </div>
             
            </div> 
             )
            }
          </nav> {/* row.// */}
        </div> {/* container .//  */}
      </section>
      <Footer/>
      </>
      );
    }
  };
  export default ListBrand