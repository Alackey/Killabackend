const express = require('express');

const router = express.Router();

/* GET weather. */
router.get('/', (req, res) => {
  res.json({ hello: 'weather' });
});

module.exports = router;
