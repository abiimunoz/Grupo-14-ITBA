// Middleware centralizado para el manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('⚠️ Error capturado en middleware:', err.message);

  // Error de casteo de Mongoose (por ejemplo, ObjectId con formato inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: `Identificador inválido: valor '${err.value}' no corresponde a un ID válido`,
    });
  }

  // Error de validación de Mongoose (campos requeridos, validaciones de esquema)
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({
      error: 'Error de validación',
      detalles: mensajes,
    });
  }

  // Error general o definido por la aplicación
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor',
  });
};

module.exports = errorHandler;
