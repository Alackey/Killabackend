const express = require('express');
const config = require('../settings/config');

const router = express.Router();

/* GET transportation. */
router.get('/', (req, res) => {
  res.json({ hello: config.google.API_KEY });
});

module.exports = router;
