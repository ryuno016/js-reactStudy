import React, { useState } from "react";
import './App.css';
import Axios from 'axios';
import ProductList from './ProductList'; // ProductList コンポーネントをインポート

function App() {
  // ユーザー入力を管理するための状態を定義
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <div className="App">
      {/* ユーザー入力用のテキストボックス */}
      <div className="textBox">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <button onClick={addUser}>Add User</button> {/* ボタンクリックでユーザー追加 */}
      </div>

      {/* ProductList コンポーネントをレンダリング */}
      <ProductList /> 
    </div>
  );
}

export default App; // このコンポーネントをエクスポート
