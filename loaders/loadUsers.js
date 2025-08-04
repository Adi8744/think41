const fs = require('fs');
const csv = require('csv-parser');
const db = require('../db/database');

function loadUsers() {
  const users = [];
  fs.createReadStream('./data/users.csv')
    .pipe(csv())
    .on('data', (row) => {
      users.push(row);
    })
    .on('end', () => {
      const stmt = db.prepare(`
        INSERT INTO users (
          id, first_name, last_name, email, age, gender, state,
          street_address, postal_code, city, country,
          latitude, longitude, traffic_source, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      users.forEach(user => {
        stmt.run(
          user.id, user.first_name, user.last_name, user.email, user.age, user.gender,
          user.state, user.street_address, user.postal_code, user.city, user.country,
          user.latitude, user.longitude, user.traffic_source, user.created_at
        );
      });

      stmt.finalize();
      console.log('✅ Users loaded successfully');
    });
}

module.exports = loadUsers;
