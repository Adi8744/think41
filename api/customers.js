const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /customers?limit=10&offset=0
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  db.all(`SELECT * FROM users LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch customers' });
    res.status(200).json({ customers: rows });
  });
});

// GET /customers/:id
router.get('/:id', (req, res) => {
  const customerId = req.params.id;

  db.get(`SELECT * FROM users WHERE id = ?`, [customerId], (err, user) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch user' });
    if (!user) return res.status(404).json({ error: 'Customer not found' });

    db.get(
      `SELECT COUNT(*) as order_count FROM orders WHERE user_id = ?`,
      [customerId],
      (err2, countResult) => {
        if (err2) return res.status(500).json({ error: 'Failed to fetch order count' });

        user.order_count = countResult.order_count;
        res.status(200).json(user);
      }
    );
  });
});

module.exports = router;
