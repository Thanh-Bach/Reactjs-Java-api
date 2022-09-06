import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import numberWithCommas from '../../../utils/numberWithCommas'
const IMG_URL = "http://localhost:8080/files/";
const Deal = () => {
    const CategoryApi = 'http://localhost:8080/api/prd/products'
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
      const getRandomProducts = (count) => {
        const max = category.length - count
        // const min = 0
        const start = Math.floor(Math.random() * max)
        return category.slice(start, start + count)
      }
    return (
        <>
        {
             getRandomProducts( 5).map((item, index) => (
              
                <div className="col-md col-6">
                <figure className="card-product-grid card-sm">
                  <a href={`/prddetail/${item.id}`} className="img-wrap"> 
                    <img src={IMG_URL + item.avatar} /> 
                  </a>
                  <div className="text-wrap p-3">
                    <a href={`/prddetail/${item.id}`} className="title">{item.productname}</a>
                    <span className="badge badge-danger"> {numberWithCommas(item.discount + ' đ')} </span>
                    <span className="badge text-muted" style={{textDecoration: 'line-through'}}>{numberWithCommas(item.price + ' đ')}</span> 
                  </div>
                </figure>
              </div>
                   
     ) )}
     </>
       )
}
export default Deal;