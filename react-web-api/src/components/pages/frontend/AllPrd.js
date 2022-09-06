import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import numberWithCommas from '../../../utils/numberWithCommas'
const IMG_URL = "http://localhost:8080/files/";
const Watchfm = () => {
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
    const getRandomProducts = (count) => {
      const max = category.length - count
      // const min = 0
      const start = Math.floor(Math.random() * max)
      return category.slice(start, start + count)
    }
      const getCategory = (start, end) => {
        return category.slice(start, end)
      }
    return (
        <>
        {
             getRandomProducts(12).map((item, index) => (
              
                <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                <div className="card card-sm card-product-grid">
                  <a href={`/prddetail/${item.id}`} className="img-wrap"> <img src={IMG_URL + item.avatar} /> </a>
                  <figcaption className="info-wrap">
                    <a href={`/prddetail/${item.id}`} className="title">{item.productname}</a>
                    <div className="price mt-1">{numberWithCommas(item.price + ' đ')}</div> {/* price-wrap.// */}
                  </figcaption>
                </div>
              </div>
                   
     ) )}
     </>
       )
}
export default Watchfm;