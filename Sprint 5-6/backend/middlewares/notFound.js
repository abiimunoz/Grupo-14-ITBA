// Middleware para manejar rutas que no existen (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
};

module.exports = notFound;
