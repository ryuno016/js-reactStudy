import React, { useState } from "react";
import './App.css';
import useCategories from "./hooks/useCategories";
import Axios from 'axios';
import OrderForm from './OrderForm'; 

function App() {
    // ユーザー入力を管理するための状態を定義
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // カスタムフックからカテゴリーリストとリフレッシュ関数を取得
    const { categoryList, refreshCategories } = useCategories();

    // 新しいユーザーを追加する関数
    const addUser = () => {
        Axios.post("http://localhost:3001/api/insert/user", {
            name: name, // 入力された名前
            email: email // 入力されたメールアドレス
        }).then(() => {
            alert("User added successfully"); // 成功時のメッセージ
            refreshCategories();  // カテゴリーリストを更新
            setName(''); // フォームをリセット
            setEmail('');
        }).catch(err => {
            console.error("Error adding user: ", err); // エラーが発生した場合のコンソール出力
            alert("Failed to add user"); // エラーメッセージを表示
        });
    };

    return (
        <div className="App">
            {/* ユーザー入力用のテキストボックス */}
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
            {/* ユーザーリストを表示 */}
            <ul>
                {categoryList.map((val, index) => (
                    <li key={index}>
<<<<<<< HEAD
                        <span>名前:</span> {val.name}<br />
                        <span>email:</span> {val.email}
=======
                        <div class="user-info">
                            <span>名前:</span><span>{val.name}</span>
                        </div>
                        <div class="user-info">
                            <span>email:</span><span>{val.email}</span>
                        </div>
>>>>>>> 39a3d82c3e656033a80c0a413193b7154ecd2a9d
                    </li>
                ))}
            </ul>
            {/* 注文フォームを表示 */}
            <OrderForm />
        </div>
    );
}

export default App; // このコンポーネントをエクスポート
