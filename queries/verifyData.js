const db = require('../db/database');

function verifyData() {
  console.log('🔎 Sample users:');
  db.each("SELECT id, first_name, email FROM users LIMIT 3", (err, row) => {
    if (err) throw err;
    console.log(row);
  });

  console.log('🔎 Sample orders:');
  db.each("SELECT order_id, user_id, status FROM orders LIMIT 3", (err, row) => {
    if (err) throw err;
    console.log(row);
  });
}

module.exports = verifyData;
