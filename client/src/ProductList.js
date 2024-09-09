import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products') 
      .then(res => res.json())
      .then(data => setProducts(data));
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
