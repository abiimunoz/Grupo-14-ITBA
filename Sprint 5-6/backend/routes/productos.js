const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// =========================================================================
// OPERACIONES DE LECTURA (READ) — DEV BACKEND 1
// =========================================================================

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'El ID proporcionado no es válido' });
    }

    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
});

// =========================================================================
// OPERACIONES DE ESCRITURA (C-U-D) — DEV BACKEND 2
// =========================================================================

// POST /api/productos → Crear un nuevo producto
router.post('/', async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, imagenUrl, categoria, specs } = req.body;

    if (!nombre || nombre.toString().trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    if (precio === undefined || precio === null || precio === '' || Number.isNaN(Number(precio))) {
      return res.status(400).json({ error: 'El precio es obligatorio y debe ser un valor numérico' });
    }

    const nuevoProducto = await Product.create({
      nombre: nombre.toString().trim(),
      descripcion: descripcion ? descripcion.toString().trim() : '',
      precio: Number(precio),
      stock: stock !== undefined && stock !== null && stock !== '' ? Number(stock) : 0,
      imagenUrl: imagenUrl ? imagenUrl.toString().trim() : '',
      categoria: categoria ? categoria.toString().trim() : 'General',
      specs: Array.isArray(specs) ? specs : [],
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
});

// PUT /api/productos/:id → Actualizar un producto existente
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'El ID proporcionado no es válido' });
    }

    const productoActualizado = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true, // Devuelve el documento ya actualizado
        runValidators: true, // Ejecuta las validaciones del esquema de Mongoose
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/productos/:id → Eliminar un producto
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'El ID proporcionado no es válido' });
    }

    const productoEliminado = await Product.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente', id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
