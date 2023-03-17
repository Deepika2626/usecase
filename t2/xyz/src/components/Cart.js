import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';



const Cart = () => {
  const [cart, setCart] = useState(null);
  

  useEffect(() => {
    axios.get('http://localhost:8003/cart')
      .then(response => {
        setCart(response.data);
      })
    
  }, []);

  const handleRemoveFromCart = (id) => {
    axios.delete(`http://localhost:8003/cart/${id}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
    <Header/>
      {cart && cart.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(cart => (
                <tr key={cart.id}>
                  <td>{cart.name}</td>
                  <td>${cart.price.toFixed(2)}</td>
                  <td>{cart.quantity}</td>
                  <td><button onClick={() => handleRemoveFromCart(cart.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>{cart.items.reduce((total, item) => total + item.quantity, 0)}</td>
                <td>${cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <button>Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;

