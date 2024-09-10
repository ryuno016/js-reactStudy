import React, { useState } from "react";
import './App.css';
import Axios from 'axios';
import ProductList from './ProductList'; // ProductList コンポーネントをインポート
import OrderForm from './OrderForm';     // OrderForm コンポーネントをインポート

function App() {
  // ユーザー入力を管理するための状態を定義
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState("");
  
  // 新しいユーザーを追加する関数
  const addUser = () => {
    Axios.post("http://localhost:3001/api/insert/user", {
      name: name, // 入力された名前
      email: email // 入力されたメールアドレス
    }).then(() => {
      alert("User added successfully"); // 成功時のメッセージ
    }).catch(err => {
      console.error("Error adding user: ", err); // エラーが発生した場合のコンソール出力
      alert("Failed to add user"); // エラーメッセージを表示
    });
  };

  // 商品を更新する関数
  const updateProduct = (id, updatedData) => {
    Axios.put(`http://localhost:3001/api/products/${id}`, { name: updatedData })
      .then(() => {
        alert("Product updated successfully");
      })
      .catch(err => {
        console.error("Error updating product: ", err);
        alert("Failed to update product");
      });
  };

  // 商品を削除する関数
  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/api/products/${id}`)
      .then(() => {
        alert("Product deleted successfully");
      })
      .catch(err => {
        console.error("Error deleting product: ", err);
        alert("Failed to delete product");
      });
  };

  return (
    <div className="App">
      <h1>商品管理システム。</h1>

      {/* ユーザー追加用の入力フォーム */}
      <div className="textBox">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <button onClick={addUser}>Add User</button> {/* ボタンクリックでユーザー追加 */}
      </div>

      {/* 商品更新用のフォーム */}
      <div className="textBox">
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Updated Product Name"
          value={updatedProduct}
          onChange={(e) => setUpdatedProduct(e.target.value)}
        /><br />
        <button onClick={() => updateProduct(productId, updatedProduct)}>Update Product</button> {/* ボタンクリックで商品更新 */}
      </div>

      {/* 商品削除用のフォーム */}
      <div className="textBox">
        <input
          type="text"
          placeholder="Product ID to Delete"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        /><br />
        <button onClick={() => deleteProduct(productId)}>Delete Product</button> {/* ボタンクリックで商品削除 */}
      </div>

      {/* ProductList コンポーネントをレンダリング */}
      <ProductList /> 

      {/* 新規注文を追加する OrderForm コンポーネント */}
      <OrderForm /> 

    </div>
  );
}

export default App; // このコンポーネントをエクスポート
