import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Header from "./Header";



const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  

  useEffect(() => {
    axios.get(`http://localhost:8001/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);
  
  const handleAddToCart = () => {
    axios.post('http://localhost:8003/cart', {
      id: product.id,
      quantity: 1
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  return (
    <div>
      <Header/>
    <Card>
      <Card.Body>
    <div className="g-3" style={{alignContent:"center",textAlign: "center"}}>
      <h1>{product.name}</h1>
      <img  src={`${product.image}`} alt={product.name}/>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
    </div>
    </Card.Body>
    </Card>
    </div>
  );
};

export default ProductDetail;
