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
const express = require('express');
const cors = require('cors');
const customersRoute = require('./api/customers');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/customers', customersRoute);

app.listen(PORT, () => {
  console.log(`🚀 API server running at http://localhost:${PORT}`);
});
