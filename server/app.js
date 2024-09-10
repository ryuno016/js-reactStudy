// 必要なモジュールをインポート
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

// MySQLデータベースへの接続を設定
const db = mysql.createPool({
  host: "localhost", // データベースのホスト名
  user: "root", // データベースのユーザー名
  password: "rootroot", // データベースのパスワード
  database: "ordersdb" // 使用するデータベースの名前
});

// ミドルウェアを設定
app.use(express.json()); // JSONデータを解析するミドルウェア
app.use(cors()); // CORSを許可するミドルウェア

// ユーザーのデータを取得するためのGETリクエストハンドラー
app.get("/api/get/users", (req, res) => {
  const sqlSelect = "SELECT * FROM users ORDER BY id"; // SQLクエリで全ユーザーをID順に取得
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err); // エラーがあればコンソールに表示
      res.status(500).send("Error retrieving users from the database"); // エラーメッセージを返す
    } else {
      res.send(result); // 取得したユーザー情報を返す
    }
  });
});

// 新しいユーザーを追加するためのPOSTリクエストハンドラー
app.post("/api/insert/user", (req, res) => {
  const { name, email } = req.body; // リクエストボディからnameとemailを取得
  const sqlInsert = "INSERT INTO users (name, email) VALUES (?, ?)"; // SQLクエリで新しいユーザーを追加
  db.query(sqlInsert, [name, email], (err, result) => {
    if (err) {
      console.error(err); // エラーがあればコンソールに表示
      res.status(500).send("Failed to insert new user"); // エラーメッセージを返す
    } else {
      res.status(200).send("User added successfully"); // 成功メッセージを返す
    }
  });
});

// 商品データを取得するためのGETリクエストハンドラー
app.get("/api/products", (req, res) => {
  const sql = `
    SELECT 
      c.name AS customer_name,
      c.address,
      o.order_id,
      o.quantity,
      p.product_name,
      p.product_price
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN products p ON o.product_id = p.product_id;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results); 
  });
});

// 新しい商品を追加するためのPOSTリクエストハンドラー
app.post("/api/products", (req, res) => {
  const { product_name, product_price } = req.body; // リクエストボディから商品名と価格を取得
  const sqlInsert = "INSERT INTO products (product_name, product_price) VALUES (?, ?)"; // SQLクエリで新しい商品を追加
  db.query(sqlInsert, [product_name, product_price], (err, result) => {
    if (err) {
      console.error("Error inserting product:", err);
      res.status(500).send("Failed to add product");
    } else {
      res.status(201).send("Product added successfully");
    }
  });
});

// 特定の注文を取得するためのGETリクエストハンドラー
app.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id; // リクエストパラメータから注文IDを取得
  const sqlSelect = `
    SELECT 
      c.name AS customer_name,
      c.address,
      o.order_id,
      o.quantity,
      p.product_name,
      p.product_price
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    JOIN products p ON o.product_id = p.product_id
    WHERE o.order_id = ?;
  `; // 特定の注文IDに基づいてデータを取得
  db.query(sqlSelect, [orderId], (err, result) => {
    if (err) {
      console.error("Error retrieving order:", err);
      res.status(500).json({ error: "Failed to retrieve order" });
    } else {
      if (result.length === 0) {
        res.status(404).send("Order not found");
      } else {
        res.json(result);
      }
    }
  });
});

// 特定の注文を削除するためのDELETEリクエストハンドラー
app.delete("/api/orders/:id", (req, res) => {
  const orderId = req.params.id; // リクエストパラメータから注文IDを取得
  const sqlDelete = "DELETE FROM orders WHERE order_id = ?"; // SQLクエリで注文を削除
  db.query(sqlDelete, [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      res.status(500).json({ error: "Failed to delete order" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send("Order not found");
      } else {
        res.status(200).send("Order deleted successfully");
      }
    }
  });
});

// サーバーをポート3001で起動
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
