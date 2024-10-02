const express = require('express');
const router = express.Router();

// Define las rutas
router.get('/', (req, res) => {
  res.send('Lista de establecimientos');
});

module.exports = router;
