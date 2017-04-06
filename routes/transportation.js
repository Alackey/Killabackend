const express = require('express');

const router = express.Router();

/* GET transportation. */
router.get('/', (req, res) => {
  res.json({hello: 'transportation'})
});

module.exports = router;