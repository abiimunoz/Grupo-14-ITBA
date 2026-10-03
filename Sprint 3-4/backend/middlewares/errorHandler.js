// Middleware centralizado para el manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;
