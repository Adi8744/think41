// const loadUsers = require('./loaders/loadUsers');
// const loadOrders = require('./loaders/loadOrders');
// const verifyData = require('./queries/verifyData');

// // Load users first, then orders, then verify
// loadUsers();

// setTimeout(() => {
//   loadOrders();
//   setTimeout(() => {
//     verifyData();
//   }, 2000);
// }, 2000);




// const express = require('express');
// const cors = require('cors');
// const customersRoute = require('./api/customers');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());
// app.use('/customers', customersRoute);

// app.listen(PORT, () => {
//   console.log(`🚀 API server running at http://localhost:${PORT}`);
// });
// app.get('/customers/:id/orders', (req, res) => {
//   const customerId = req.params.id;

//   db.all('SELECT * FROM orders WHERE user_id = ?', [customerId], (err, rows) => {
//     if (err) return res.status(500).json({ error: "Server error" });
//     if (rows.length === 0) return res.status(404).json({ error: "No orders found for this customer" });

//     res.json({ customer_id: customerId, orders: rows });
//   });
// });

// app.get('/orders/:id', (req, res) => {
//   const orderId = req.params.id;

//   db.get('SELECT * FROM orders WHERE order_id = ?', [orderId], (err, row) => {
//     if (err) return res.status(500).json({ error: "Server error" });
//     if (!row) return res.status(404).json({ error: "Order not found" });

//     res.json(row);
//   });
// });

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./ecommerce.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error("DB Connection Error:", err.message);
  console.log("Connected to SQLite DB");
});

app.get('/customers/:id/orders', (req, res) => {
  const customerId = req.params.id;
  db.all('SELECT * FROM orders WHERE user_id = ?', [customerId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: "No orders found for this customer" });
    res.json({ customer_id: customerId, orders: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
