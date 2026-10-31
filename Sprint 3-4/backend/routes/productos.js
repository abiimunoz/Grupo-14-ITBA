const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// GET /api/productos → Devuelve todos los productos desde la base de datos
router.get('/', async (req, res, next) => {
  try {
    const productos = await Product.find().sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

// GET /api/productos/:id → Devuelve un producto por su _id de MongoDB
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar que el parámetro recibido tenga formato válido de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'El ID proporcionado no es válido' });
    }

    const producto = await Product.findById(id);

    // Si no existe ningún producto con ese _id
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
});

// =========================================================================
// NOTA PARA DEV BACKEND 2:
// Aquí se implementarán las operaciones de escritura (C-U-D):
// - POST   /api/productos       → Crear producto (201)
// - PUT    /api/productos/:id   → Actualizar producto existente
// - DELETE /api/productos/:id   → Eliminar producto
// =========================================================================

module.exports = router;
