// src/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  // フォームの入力ハンドラー
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerName') {
      setCustomerName(value);
    } else if (name === 'productName') {
      setProductName(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
  };

  // フォームの送信ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customerName,
        productName,
        quantity
      };

      // サーバーへ注文データを送信
      const response = await axios.post('http://localhost:3001/api/orders', orderData);
      
      setMessage('Order placed successfully!');
      // フォームのリセット
      setCustomerName('');
      setProductName('');
      setQuantity('');
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to place order.');
    }
  };

  return (
    <div>
      <h2>新しい注文</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input 
            type="text" 
            name="customerName" 
            value={customerName} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input 
            type="text" 
            name="productName" 
            value={productName} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input 
            type="number" 
            name="quantity" 
            value={quantity} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
