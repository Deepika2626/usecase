import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
const [token,setToken]=useState(localStorage.getItem("token"))
  useEffect(() => {
    axios.get('http://localhost:8000/products',{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header/>
      
      <div className="g-3" style={{alignContent:"center",textAlign: "center", display : "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows:"2", gridGap:"5%", padding:"5%" }}>
        {products.map(product => (
           <div key={product.id}>
            <Link to={`/products/${product.id}`} >
            <img src={`${product.image}`} alt={product.name}/>
            <h3>{product.name}</h3>
            <p>${product.price}</p> 
            </Link> 
        </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
