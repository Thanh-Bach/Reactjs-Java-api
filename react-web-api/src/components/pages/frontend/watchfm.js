import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import numberWithCommas from '../../../utils/numberWithCommas'
const IMG_URL = "http://localhost:8080/files/";
const Watchfm = () => {
    const CategoryApi = 'http://localhost:8080/api/prd/products/franck-muller'
    const [category, setCategory] = useState([])
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
    
      const getCategory = (start, end) => {
        return category.slice(start, end)
      }
    return (
        <>
        {
             category.map((item, index) => (
              
                <li className="col-6 col-lg-3 col-md-4">
                <a href={`/prddetail/${item.id}`} className="item"> 
                  <div className="card-body">
                    <h6 className="title">{item.productname}</h6>
                    <img className="img-sm float-right" src={IMG_URL + item.avatar} /> 
                    <p className="text-muted"> {numberWithCommas(item.price + ' đ')}</p>
                  </div>
                </a>
              </li>
                   
     ) )}
     </>
       )
}
export default Watchfm;