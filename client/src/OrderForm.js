import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = ({ productId, customerId }) => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // 顧客データを取得
        if (customerId) {
          const customerResponse = await axios.get(`http://localhost:3001/api/customers/${customerId}`);
          setCustomerName(customerResponse.data.name);
        }
        
        // 商品データを取得
        if (productId) {
          const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
          setProductName(productResponse.data.name);
          setQuantity(productResponse.data.quantity || 1); // 既存数量がない場合は1をデフォルトに
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setMessage('データの取得に失敗しました。');
      }
    };

    fetchOrderData();
  }, [customerId, productId]);

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
      
      setMessage('注文が正常に送信されました！');
      // フォームのリセット
      setCustomerName('');
      setProductName('');
      setQuantity('');
    } catch (error) {
      console.error('注文の送信に失敗しました:', error);
      setMessage('注文の送信に失敗しました。');
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
        <button type="submit">注文を送信</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
