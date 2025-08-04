const loadUsers = require('./loaders/loadUsers');
const loadOrders = require('./loaders/loadOrders');
const verifyData = require('./queries/verifyData');

// Load users first, then orders, then verify
loadUsers();

setTimeout(() => {
  loadOrders();
  setTimeout(() => {
    verifyData();
  }, 2000);
}, 2000);
