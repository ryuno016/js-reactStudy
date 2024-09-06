
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

// MySQLデータベースへの接続を設定
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "ordersdb"
});

// ミドルウェアを設定.
app.use(express.json());
app.use(cors()); 

// 全ての注文データを取得するためのGETリクエストハンドラー
app.get("/api/get/orders", (req, res) => {
  const sqlSelect = `
    SELECT 
      o.order_id, 
      c.name AS customer_name, 
      c.address AS customer_address, 
      c.phone AS customer_phone, 
      p.product_name, 
      p.product_price, 
      o.quantity, 
      (p.product_price * o.quantity) AS total_price
    FROM 
      orders o
    JOIN 
      customers c ON o.customer_id = c.customer_id
    JOIN 
      products p ON o.product_id = p.product_id
    ORDER BY 
      o.order_id`;
  
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to retrieve orders");
    } else {
      res.status(200).json(result);
    }
  });
});

// 新しい商品を追加するエンドポイント
app.post("/api/insert/product", (req, res) => {
  const { product_name, product_price } = req.body;

  if (!product_name || !product_price) {
    return res.status(400).json({ error: 'Product name and price are required' });
  }

  const sqlInsert = "INSERT INTO products (product_name, product_price) VALUES (?, ?)";
  db.query(sqlInsert, [product_name, product_price], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to add product");
    } else {
      res.status(201).send("Product added successfully");
    }
  });
});

// 特定の注文を取得するエンドポイント
app.get("/api/get/orders/:id", (req, res) => {
  const orderId = req.params.id;

  const sqlSelect = `
    SELECT 
      o.order_id, 
      c.name AS customer_name, 
      c.address AS customer_address, 
      c.phone AS customer_phone, 
      p.product_name, 
      p.product_price, 
      o.quantity, 
      (p.product_price * o.quantity) AS total_price
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN products p ON o.product_id = p.product_id
    WHERE o.order_id = ?`;
  
  db.query(sqlSelect, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to retrieve order");
    } else if (result.length === 0) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// 特定の注文を削除するエンドポイント
app.delete("/api/delete/orders/:id", (req, res) => {
  const orderId = req.params.id;

  const sqlDelete = "DELETE FROM orders WHERE order_id = ?";
  db.query(sqlDelete, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to delete order");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).send("Order deleted successfully");
    }
  });
});

// 新しい注文を追加するエンドポイント
app.post("/api/insert/order", (req, res) => {
  const { customer_id, product_id, quantity } = req.body;
  
  if (!customer_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Customer ID, Product ID, and Quantity are required' });
  }

  const sqlInsert = "INSERT INTO orders (customer_id, product_id, quantity) VALUES (?, ?, ?)";
  db.query(sqlInsert, [customer_id, product_id, quantity], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to create order");
    } else {
      res.status(200).send("Order created successfully");
    }
  });
});

// サーバーをポート3001で起動
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
