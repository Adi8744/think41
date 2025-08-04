const fs = require('fs');
const csv = require('csv-parser');
const db = require('../db/database');

function loadOrders() {
  const orders = [];
  fs.createReadStream('./data/orders.csv')
    .pipe(csv())
    .on('data', (row) => {
      orders.push(row);
    })
    .on('end', () => {
      const stmt = db.prepare(`
        INSERT INTO orders (
          order_id, user_id, status, gender, created_at,
          returned_at, shipped_at, delivered_at, num_of_item
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      orders.forEach(order => {
        stmt.run(
          order.order_id, order.user_id, order.status, order.gender, order.created_at,
          order.returned_at, order.shipped_at, order.delivered_at, order.num_of_item
        );
      });

      stmt.finalize();
      console.log('✅ Orders loaded successfully');
    });
}

module.exports = loadOrders;
