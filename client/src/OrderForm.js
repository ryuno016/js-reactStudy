import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  // フォームの送信ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      customerName,
      product,
      quantity
    };

    try {
      const response = await axios.post('http://localhost:3001/api/insert/order', newOrder);
      if (response.status === 200) {
        setMessage('注文が正常に作成されました');
        // フォームをリセット
        setCustomerName('');
        setProduct('');
        setQuantity(1);
      }
    } catch (error) {
      setMessage('注文の作成に失敗しました');
      console.error(error);
    }
  };

  return (
    <div className="order-form">
      <h2>新規注文を作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>注文者名:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>商品名:</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div>
          <label>数量:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <button type="submit">注文を作成</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
