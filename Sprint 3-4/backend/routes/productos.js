const express = require('express');
const router = express.Router();

// Rutas de productos
router.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta base de productos lista' });
});

module.exports = router;
