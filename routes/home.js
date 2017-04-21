const express = require('express');

const router = express.Router();

// GET home
router.get('/', (req, res) => {
  res.sendFile('index.html');
});

module.exports = router;
