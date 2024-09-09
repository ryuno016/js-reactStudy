import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axiosをインポート

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // axiosを使ってAPIリクエストを送信
    axios.get('http://localhost:3001/api/products') // プロトコルを追加
      .then(res => {
        setProducts(res.data); // レスポンスデータを設定
      })
      .catch(error => {
        console.error('Error fetching products:', error); // エラー処理
      });
  }, []); 

  return (
    <table>
      <thead>
        <tr>
          <th>顧客名</th>
          <th>住所</th>
          <th>注文ID</th>
          <th>数量</th>
          <th>商品名</th>
          <th>価格</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.order_id}>
            <td>{product.customer_name}</td>
            <td>{product.address}</td>
            <td>{product.order_id}</td>
            <td>{product.quantity}</td>
            <td>{product.product_name}</td>
            <td>{product.product_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
