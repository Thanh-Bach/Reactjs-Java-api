import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
const IMG_URL = "http://localhost:8080/files/";
const PopularCat = () => {
    const CategoryApi = 'http://localhost:8080/api/cat/category'
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
             getCategory(2, 5).map((item, index) => (
                <Link to={`/products/${item.categoryslug}`}>
                    <div className="card-banner border-bottom">
                      <div className="py-3" style={{width: '80%'}}>
                        <h6 className="card-title">{item.categoryname}</h6>
                        <a href="#" className="btn btn-secondary btn-sm"> Chi tiết </a>
                      </div> 
                      <img src={IMG_URL + item.categoryimage} height={80} className="img-bg" />
                    </div>
                   </Link>
     ) )}
     </>
       )
}
export default PopularCat;