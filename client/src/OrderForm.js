import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = ({ productId, customerId, orderId, onDeleteSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (customerId) {
          const customerResponse = await axios.get(`http://localhost:3001/api/customers/${customerId}`);
          setCustomerName(customerResponse.data.name);
        }
        
        if (productId) {
          const productResponse = await axios.get(`http://localhost:3001/api/products/${productId}`);
          setProductName(productResponse.data.name);
          setQuantity(productResponse.data.quantity || 1); // 既存の数量がない場合は1をデフォルトに
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setError('データの取得に失敗しました。');
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

  // フォーム送信（新規注文）ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
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
      setError('注文の送信に失敗しました。サーバーの状態を確認してください。');
    }
  };

  // 更新ハンドラー (注文データの更新)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const updatedData = {
        customerName,
        productName,
        quantity
      };

      // PUTリクエストで注文を更新
      const response = await axios.put(`http://localhost:3001/api/orders/${orderId}`, updatedData);
      
      setMessage('注文が正常に更新されました！');
    } catch (error) {
      console.error('注文の更新に失敗しました:', error);
      setError('注文の更新に失敗しました。再度お試しください。');
    }
  };

  // 削除ハンドラー (注文の削除)
  const handleDelete = async () => {
    setError('');
    setMessage('');
    try {
      // DELETEリクエストで削除
      const response = await axios.delete(`http://localhost:3001/api/orders/${orderId}`);
      
      setMessage('注文が正常に削除されました！');
      
      // 削除が成功したことを親コンポーネントに通知（もし必要なら）
      if (onDeleteSuccess) {
        onDeleteSuccess(orderId);
      }
    } catch (error) {
      console.error('注文の削除に失敗しました:', error);
      setError('注文の削除に失敗しました。再度お試しください。');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>顧客名:</label>
          <input
            type="text"
            name="customerName"
            value={customerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>商品名:</label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>数量:</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">注文を送信</button>
        <button type="button" onClick={handleUpdate}>注文を更新</button>
        <button type="button" onClick={handleDelete}>注文を削除</button>
      </form>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default OrderForm;
