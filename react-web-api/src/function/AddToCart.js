import { useEffect, useState } from "react"


const AddToCart = (e, id) => {
    
    // e.preventDefault()
    // const [id, setId] = useState(0)
    // const [cartt, setCartt] = useState(1)
    
    fetch(`http://localhost:8080/api/v1/products/cart/1`)
    .then(res => res.json())
    .then(cart => {
        var c = document.getElementById("cartCounter")
        if (c !== null) {
            c.innerText = cart
        }
        console.log(cart)
        
    })
    
    
    .catch(err => console.log(err))
    
}


export default AddToCart


   