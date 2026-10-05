const express = require("express");
const router = express.Router();
// Importo los productos
const productos = require("../data/productos");

// GET / → devuelve todos los productos
router.get("/", (req, res) => {
  res.json(productos);
});

// GET /:id → devuelve un producto
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  // Id no numérico o decimal → 400
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "El id debe ser un número entero" });
  }

  const producto = productos.find((p) => p.id === id);

  // No existe → 404
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

module.exports = router;